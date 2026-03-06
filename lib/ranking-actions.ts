"use server";

import prisma from "./prisma";
import { revalidatePath } from "next/cache";

const K_FACTOR = 32;

export async function updateRankingAction(winnerSlug: string, loserSlug: string) {
    // 1. Get current rankings or create if not exist
    const [winner, loser] = await Promise.all([
        getOrCreateRanking(winnerSlug),
        getOrCreateRanking(loserSlug)
    ]);

    // 2. Elo Calculation
    const expectedWinner = 1 / (1 + Math.pow(10, (loser.score - winner.score) / 400));
    const expectedLoser = 1 / (1 + Math.pow(10, (winner.score - loser.score) / 400));

    const newWinnerScore = Math.round(winner.score + K_FACTOR * (1 - expectedWinner));
    const newLoserScore = Math.round(loser.score + K_FACTOR * (0 - expectedLoser));

    // 3. Update scores
    await Promise.all([
        prisma.tripRanking.update({
            where: { templateSlug: winnerSlug },
            data: {
                score: newWinnerScore,
                wins: { increment: 1 }
            }
        }),
        prisma.tripRanking.update({
            where: { templateSlug: loserSlug },
            data: {
                score: newLoserScore,
                losses: { increment: 1 }
            }
        })
    ]);

    revalidatePath("/rank");
}

async function getOrCreateRanking(slug: string) {
    const ranking = await prisma.tripRanking.findUnique({
        where: { templateSlug: slug }
    });

    if (ranking) return ranking;

    return await prisma.tripRanking.create({
        data: {
            templateSlug: slug,
            score: 1200
        }
    });
}

export async function getLeaderboardAction() {
    return await prisma.tripRanking.findMany({
        orderBy: { score: 'desc' }
    });
}
