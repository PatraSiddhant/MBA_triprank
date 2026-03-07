const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function test() {
    try {
        const trip = await prisma.tripCandidate.create({
            data: {
                name: "Test",
                primaryDestinationCity: "City",
                primaryDestinationCountry: "Country",
                durationDays: 1,
                roughBudgetUsd: 1,
                theme: "Adventure",
                tags: "[]",
                status: "planning",
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
