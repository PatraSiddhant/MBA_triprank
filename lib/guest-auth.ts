import { createHmac, timingSafeEqual } from "crypto";

const SECRET = process.env.GUEST_TRIP_SECRET || "trekrank-dev-secret-change-in-production";

export function signTripId(tripId: string): string {
    const mac = createHmac("sha256", SECRET).update(tripId).digest("hex").slice(0, 16);
    return `${tripId}.${mac}`;
}

export function verifySignedTripId(signed: string): string | null {
    const lastDot = signed.lastIndexOf(".");
    if (lastDot === -1) return null;
    const tripId = signed.slice(0, lastDot);
    const mac = signed.slice(lastDot + 1);
    const expected = createHmac("sha256", SECRET).update(tripId).digest("hex").slice(0, 16);
    try {
        const macBuf = Buffer.from(mac, "hex");
        const expectedBuf = Buffer.from(expected, "hex");
        if (macBuf.length !== expectedBuf.length) return null;
        return timingSafeEqual(macBuf, expectedBuf) ? tripId : null;
    } catch {
        return null;
    }
}
