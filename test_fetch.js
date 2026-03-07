const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function test() {
    try {
        const trips = await prisma.tripCandidate.findMany({
            orderBy: { createdAt: 'desc' },
            take: 10,
            select: {
                id: true,
                name: true,
                userId: true,
                createdAt: true
            }
        });
        console.log("Recent trips:", trips);

        const users = await prisma.user.findMany({
            take: 5
        });
        console.log("Recent users:", users);

    } catch (e) {
        console.error("Prisma Error:", e);
    } finally {
        await prisma.$disconnect();
    }
}
test();
