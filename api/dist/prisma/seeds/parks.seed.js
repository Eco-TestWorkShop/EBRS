"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedParks = seedParks;
const client_1 = require("@prisma/client");
const faker_1 = require("@faker-js/faker");
const prisma = new client_1.PrismaClient();
async function seedParks() {
    const createdParks = [];
    const moroccanCities = [
        'Casablanca',
        'Rabat',
        'Fes',
        'Marrakech',
        'Tangier',
        'Agadir',
        'Meknes',
        'Oujda',
        'Kenitra',
        'Tetouan',
        'Safi',
        'El Jadida',
        'Taza',
        'Nador',
        'Settat',
        'Khouribga',
        'Beni Mellal',
        'Errachidia',
        'Tiznit',
        'Larache',
        'Ksar El Kebir',
        'Guelmim',
        'Essaouira',
        'Al Hoceima',
        'Lagouira',
        'Tan-Tan',
        'Sidi Ifni',
        'Tata',
        'Dakhla',
    ];
    const shuffledCities = faker_1.faker.helpers.shuffle(moroccanCities);
    for (let i = 0; i < shuffledCities.length; i++) {
        const park = createRandomPark(shuffledCities[i]);
        if (!park) {
            console.log('Skipping undefined park');
            continue;
        }
        const createdPark = await prisma.park.create({
            data: park,
        });
        createdParks.push(createdPark);
        console.log(`Created park with ID: ${createdPark.id}`);
    }
    return createdParks;
}
function createRandomPark(city) {
    const name = `${city} Park`;
    const location = faker_1.faker.address.streetAddress();
    if (!name || !location) {
        console.log('Undefined name or location:', { name, location });
        return null;
    }
    return {
        name,
        location,
        image: faker_1.faker.image.city(),
    };
}
//# sourceMappingURL=parks.seed.js.map