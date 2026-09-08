"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedRentals = seedRentals;
const client_1 = require("@prisma/client");
const faker_1 = require("@faker-js/faker");
const prisma = new client_1.PrismaClient();
async function seedRentals(users, bikes) {
    if (users.length === 0 || bikes.length === 0) {
        console.log('No users or bikes available for seeding rentals');
        return [];
    }
    const createdRentals = [];
    for (const user of users) {
        if (user.id === 1) {
            continue;
        }
        const numRentals = faker_1.faker.number.int({ min: 10, max: 30 });
        for (let i = 0; i < numRentals; i++) {
            const rental = createRandomRental(user, bikes);
            if (!rental) {
                console.log('Skipping undefined rental');
                continue;
            }
            const createdRental = await prisma.rental.create({
                data: rental,
            });
            createdRentals.push(createdRental);
            console.log(`Created rental with ID: ${createdRental.id}`);
        }
    }
    return createdRentals;
}
function createRandomRental(user, bikes) {
    const bike = faker_1.faker.helpers.arrayElement(bikes);
    if (!bike) {
        console.log('Undefined bike:', { bike });
        return null;
    }
    return {
        user_id: user.id,
        bike_id: bike.id,
        start_time: faker_1.faker.date.past(),
        end_time: faker_1.faker.date.future(),
        status: faker_1.faker.helpers.arrayElement(['ongoing', 'completed', 'lost']),
        price: faker_1.faker.number.int({ min: 5, max: 500 }),
    };
}
//# sourceMappingURL=rentals.seed.js.map