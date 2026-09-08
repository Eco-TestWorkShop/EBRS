"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users_seed_1 = require("./users.seed");
const bikes_seed_1 = require("./bikes.seed");
const parks_seed_1 = require("./parks.seed");
const rentals_seed_1 = require("./rentals.seed");
async function main() {
    const parks = await (0, parks_seed_1.seedParks)();
    const bikes = await (0, bikes_seed_1.seedBikes)(parks);
    const users = await (0, users_seed_1.seedUsers)();
    await (0, rentals_seed_1.seedRentals)(users, bikes);
}
main()
    .catch((e) => {
    throw e;
})
    .finally(async () => {
});
//# sourceMappingURL=index.js.map