"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParkService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ParkService = class ParkService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findOne(parkWhereUniqueInput) {
        return this.prisma.park.findUnique({
            where: parkWhereUniqueInput,
            include: {
                Bike: true,
            },
        });
    }
    async findFirst() {
        return this.prisma.park.findFirst();
    }
    async findOpenParks() {
        return this.prisma.park.findMany({
            where: {
                Bike: {
                    some: {
                        status: 'available',
                    },
                },
            }
        });
    }
    async findClosedParks() {
        return this.prisma.park.findMany({
            where: {
                OR: [
                    {
                        Bike: {
                            none: {},
                        },
                    },
                    {
                        Bike: {
                            none: {
                                status: 'available',
                            },
                        },
                    },
                ],
            }
        });
    }
    async findAll(params) {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prisma.park.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
            include: {
                Bike: true,
            },
        });
    }
    async create(data) {
        return this.prisma.park.create({
            data,
        });
    }
    async update(params) {
        const { data, where } = params;
        return this.prisma.park.update({
            data,
            where,
        });
    }
    async delete(where) {
        return this.prisma.park.delete({
            where,
        });
    }
};
exports.ParkService = ParkService;
exports.ParkService = ParkService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ParkService);
//# sourceMappingURL=park.service.js.map