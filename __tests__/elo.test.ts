const K_FACTOR = 32;

function calculateElo(winnerScore: number, loserScore: number) {
    const expectedWinner = 1 / (1 + Math.pow(10, (loserScore - winnerScore) / 400));
    const expectedLoser = 1 / (1 + Math.pow(10, (winnerScore - loserScore) / 400));
    return {
        newWinnerScore: Math.round(winnerScore + K_FACTOR * (1 - expectedWinner)),
        newLoserScore: Math.round(loserScore + K_FACTOR * (0 - expectedLoser)),
    };
}

describe("Elo ranking algorithm", () => {
    it("winner always gains points, loser always loses points", () => {
        const { newWinnerScore, newLoserScore } = calculateElo(1200, 1200);
        expect(newWinnerScore).toBeGreaterThan(1200);
        expect(newLoserScore).toBeLessThan(1200);
    });

    it("total score is conserved (zero-sum)", () => {
        const winner = 1200;
        const loser = 1200;
        const { newWinnerScore, newLoserScore } = calculateElo(winner, loser);
        // Allow ±1 for rounding
        expect(Math.abs((newWinnerScore + newLoserScore) - (winner + loser))).toBeLessThanOrEqual(1);
    });

    it("upset win (low score beats high score) gives larger gain", () => {
        const { newWinnerScore: upsetGain } = calculateElo(1000, 1400);
        const { newWinnerScore: expectedGain } = calculateElo(1400, 1000);
        const upsetDelta = upsetGain - 1000;
        const expectedDelta = expectedGain - 1400;
        expect(upsetDelta).toBeGreaterThan(expectedDelta);
    });

    it("equal-score match changes score by K/2 (~16 points)", () => {
        const { newWinnerScore } = calculateElo(1200, 1200);
        expect(newWinnerScore - 1200).toBe(16);
    });

    it("heavily favoured winner gains very few points", () => {
        const { newWinnerScore } = calculateElo(2000, 800);
        expect(newWinnerScore - 2000).toBeLessThanOrEqual(2);
    });

    it("heavily favoured loser loses many points", () => {
        const { newLoserScore } = calculateElo(800, 2000);
        expect(2000 - newLoserScore).toBeGreaterThanOrEqual(30);
    });

    it("initial score of 1200 is preserved across many zero-sum exchanges", () => {
        let a = 1200;
        let b = 1200;
        for (let i = 0; i < 100; i++) {
            const winner = i % 2 === 0 ? a : b;
            const loser = i % 2 === 0 ? b : a;
            const { newWinnerScore, newLoserScore } = calculateElo(winner, loser);
            if (i % 2 === 0) { a = newWinnerScore; b = newLoserScore; }
            else { b = newWinnerScore; a = newLoserScore; }
        }
        // After 50 wins each, scores should roughly return to 1200
        expect(Math.abs(a - 1200)).toBeLessThanOrEqual(10);
        expect(Math.abs(b - 1200)).toBeLessThanOrEqual(10);
    });
});

describe("guest-auth HMAC signing", () => {
    // Inline the logic to test without hitting server-only modules
    const SECRET = "test-secret";
    const { createHmac } = require("crypto");

    function sign(id: string) {
        const mac = createHmac("sha256", SECRET).update(id).digest("hex").slice(0, 16);
        return `${id}.${mac}`;
    }

    function verify(signed: string): string | null {
        const lastDot = signed.lastIndexOf(".");
        if (lastDot === -1) return null;
        const id = signed.slice(0, lastDot);
        const mac = signed.slice(lastDot + 1);
        const expected = createHmac("sha256", SECRET).update(id).digest("hex").slice(0, 16);
        return mac === expected ? id : null;
    }

    it("verify returns the original id for a valid signed token", () => {
        const id = "clxyz1234";
        expect(verify(sign(id))).toBe(id);
    });

    it("verify returns null for a tampered token", () => {
        const signed = sign("clxyz1234");
        const tampered = signed.replace("1", "2");
        expect(verify(tampered)).toBeNull();
    });

    it("verify returns null for an unsigned plain id", () => {
        expect(verify("clxyz1234")).toBeNull();
    });

    it("different ids produce different tokens", () => {
        expect(sign("id-one")).not.toBe(sign("id-two"));
    });
});
