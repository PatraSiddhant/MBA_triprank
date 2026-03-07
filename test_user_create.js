const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function test() {
    try {
        const userId = "test-user-id";

        await prisma.user.upsert({
            where: { id: userId },
            update: { email: 'test@example.com' },
            create: { id: userId, email: 'test@example.com', name: 'Test' }
        });

        const trip = await prisma.tripCandidate.create({
            data: {
                name: "New Adventure",
                primaryDestinationCity: "TBD",
                primaryDestinationCountry: "TBD",
                durationDays: 1,
                roughBudgetUsd: 0,
                theme: "Custom",
                tags: "[]",
                status: "planning",
                userId: userId,
                itinerary: {
                    create: {
                        days: {
                            create: [{ dayIndex: 1, title: "Day 1", items: { create: [] } }]
                        }
                    }
                }
            }
        });
        console.log("Success:", trip.id);
    } catch (e) {
        console.error("Prisma Error:", e);
    } finally {
        await prisma.$disconnect();
    }
}
test();
