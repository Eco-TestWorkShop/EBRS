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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BikeController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
const auth_jwt_guard_1 = require("../auth/auth.jwt.guard");
const auth_roles_decorator_1 = require("../auth/auth.roles.decorator");
const global_constants_1 = require("../../shared/constants/global.constants");
const bike_service_1 = require("./bike.service");
let BikeController = class BikeController {
    constructor(bikeService) {
        this.bikeService = bikeService;
    }
    async getAllBikes() {
        return this.bikeService.findAll({});
    }
    async getFirstUser() {
        return this.bikeService.findFirst();
    }
    async getBikesByParkAndStatusWithLimit(parkId, status, limit) {
        console.log('parkId', parkId);
        console.log('status', status);
        console.log('limit', limit);
        return this.bikeService.findByParkAndStatus(Number(parkId), status, Number(limit));
    }
    async getBikesByStatus(status, limit) {
        return this.bikeService.findByStatus(status, Number(limit));
    }
    async getBikeById(id) {
        return this.bikeService.findOne({ id: Number(id) });
    }
    async createBike(bikeData) {
        const { model, status, lock, location, price, park_id, image } = bikeData;
        return this.bikeService.create({
            model,
            status,
            lock,
            location,
            price,
            image,
            Park: {
                connect: { id: park_id },
            },
        });
    }
    async updateBike(id, bikeData) {
        return this.bikeService.update({
            where: { id: Number(id) },
            data: bikeData,
        });
    }
    async deleteBike(id) {
        return this.bikeService.delete({ id: Number(id) });
    }
};
exports.BikeController = BikeController;
__decorate([
    (0, common_1.Get)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BikeController.prototype, "getAllBikes", null);
__decorate([
    (0, common_1.Get)('bike/check'),
    (0, auth_roles_decorator_1.Roles)(global_constants_1.ROLES_ENUM.ADMIN),
    (0, common_1.UseGuards)(auth_jwt_guard_1.JwtAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BikeController.prototype, "getFirstUser", null);
__decorate([
    (0, common_1.Get)('park/:parkId?/:status?/:limit?'),
    __param(0, (0, common_1.Param)('parkId')),
    __param(1, (0, common_1.Param)('status')),
    __param(2, (0, common_1.Param)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], BikeController.prototype, "getBikesByParkAndStatusWithLimit", null);
__decorate([
    (0, common_1.Get)('status/:status/:limit?'),
    __param(0, (0, common_1.Param)('status')),
    __param(1, (0, common_1.Param)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], BikeController.prototype, "getBikesByStatus", null);
__decorate([
    (0, common_1.Get)('bike/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BikeController.prototype, "getBikeById", null);
__decorate([
    (0, common_1.Post)('bike'),
    (0, auth_roles_decorator_1.Roles)(global_constants_1.ROLES_ENUM.ADMIN),
    (0, common_1.UseGuards)(auth_jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BikeController.prototype, "createBike", null);
__decorate([
    (0, common_1.Put)('bike/:id'),
    (0, auth_roles_decorator_1.Roles)(global_constants_1.ROLES_ENUM.ADMIN),
    (0, common_1.UseGuards)(auth_jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], BikeController.prototype, "updateBike", null);
__decorate([
    (0, common_1.Delete)('bike/:id'),
    (0, auth_roles_decorator_1.Roles)(global_constants_1.ROLES_ENUM.ADMIN),
    (0, common_1.UseGuards)(auth_jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BikeController.prototype, "deleteBike", null);
exports.BikeController = BikeController = __decorate([
    (0, swagger_1.ApiTags)('bikes'),
    (0, common_1.Controller)('/bikes'),
    __metadata("design:paramtypes", [bike_service_1.BikeService])
], BikeController);
//# sourceMappingURL=bike.controller.js.map