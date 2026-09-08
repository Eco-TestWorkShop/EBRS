"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BikeModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bike_service_1 = require("./bike.service");
const bike_controller_1 = require("./bike.controller");
let BikeModule = class BikeModule {
};
exports.BikeModule = BikeModule;
exports.BikeModule = BikeModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [bike_controller_1.BikeController],
        providers: [bike_service_1.BikeService, prisma_service_1.PrismaService],
        exports: [bike_service_1.BikeService],
    })
], BikeModule);
//# sourceMappingURL=bike.module.js.map