"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedUsers = seedUsers;
const client_1 = require("@prisma/client");
const faker_1 = require("@faker-js/faker");
const prisma = new client_1.PrismaClient();
async function seedUsers() {
    const users = faker_1.faker.helpers.multiple(createRandomUser, { count: 15 });
    const createdUsers = [];
    for (const user of users) {
        const createdUser = await prisma.user.create({
            data: user,
        });
        createdUsers.push(createdUser);
        console.log(`Created user with ID: ${createdUser.id}`);
    }
    return createdUsers;
}
function createRandomUser() {
    return {
        name: faker_1.faker.internet.userName(),
        email: faker_1.faker.internet.email(),
        password: faker_1.faker.internet.password(),
        birthdate: faker_1.faker.date.past(),
        phone: faker_1.faker.phone.number(),
        image: faker_1.faker.image.avatar(),
    };
}
//# sourceMappingURL=users.seed.js.map