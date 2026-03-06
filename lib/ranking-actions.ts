"use server";

import prisma from "./prisma";
import { revalidatePath } from "next/cache";
import { tripTemplates } from "@/data/trip-templates";

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

    revalidatePath("/recommend");
}

async function getOrCreateRanking(slug: string) {
    return await prisma.tripRanking.upsert({
        where: { templateSlug: slug },
        update: {},
        create: {
            templateSlug: slug,
            score: 1200
        }
    });
}

export async function getLeaderboardAction() {
    const knownSlugs = new Set(tripTemplates.map(t => t.slug));
    const all = await prisma.tripRanking.findMany({
        orderBy: { score: 'desc' }
    });
    // Filter out slugs that no longer match a template
    return all.filter(r => knownSlugs.has(r.templateSlug));
}
