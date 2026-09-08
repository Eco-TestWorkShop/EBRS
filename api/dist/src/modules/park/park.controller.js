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
exports.ParkController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_jwt_guard_1 = require("../auth/auth.jwt.guard");
const auth_roles_decorator_1 = require("../auth/auth.roles.decorator");
const global_constants_1 = require("../../shared/constants/global.constants");
const park_service_1 = require("./park.service");
const park_dto_1 = require("./park.dto");
let ParkController = class ParkController {
    constructor(parkService) {
        this.parkService = parkService;
    }
    async getAllParks() {
        return this.parkService.findAll({});
    }
    async getFirstUser() {
        return this.parkService.findFirst();
    }
    async getParkById(id) {
        return this.parkService.findOne({ id: Number(id) });
    }
    async getOpenParks() {
        return this.parkService.findOpenParks();
    }
    async getClosedParks() {
        return this.parkService.findClosedParks();
    }
    async createPark(createParkDto) {
        return this.parkService.create(createParkDto);
    }
    async updatePark(id, updateParkDto) {
        return this.parkService.update({
            where: { id: Number(id) },
            data: updateParkDto,
        });
    }
    async deletePark(id) {
        return this.parkService.delete({ id: Number(id) });
    }
};
exports.ParkController = ParkController;
__decorate([
    (0, common_1.Get)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ParkController.prototype, "getAllParks", null);
__decorate([
    (0, common_1.Get)('park/check'),
    (0, auth_roles_decorator_1.Roles)(global_constants_1.ROLES_ENUM.ADMIN),
    (0, common_1.UseGuards)(auth_jwt_guard_1.JwtAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ParkController.prototype, "getFirstUser", null);
__decorate([
    (0, common_1.Get)('park/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ParkController.prototype, "getParkById", null);
__decorate([
    (0, common_1.Get)('/open'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ParkController.prototype, "getOpenParks", null);
__decorate([
    (0, common_1.Get)('/closed'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ParkController.prototype, "getClosedParks", null);
__decorate([
    (0, common_1.Post)('park'),
    (0, auth_roles_decorator_1.Roles)(global_constants_1.ROLES_ENUM.ADMIN),
    (0, common_1.UseGuards)(auth_jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [park_dto_1.CreateParkDto]),
    __metadata("design:returntype", Promise)
], ParkController.prototype, "createPark", null);
__decorate([
    (0, common_1.Put)('park/:id'),
    (0, auth_roles_decorator_1.Roles)(global_constants_1.ROLES_ENUM.ADMIN),
    (0, common_1.UseGuards)(auth_jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, park_dto_1.UpdateParkDto]),
    __metadata("design:returntype", Promise)
], ParkController.prototype, "updatePark", null);
__decorate([
    (0, common_1.Delete)('park/:id'),
    (0, auth_roles_decorator_1.Roles)(global_constants_1.ROLES_ENUM.ADMIN),
    (0, common_1.UseGuards)(auth_jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ParkController.prototype, "deletePark", null);
exports.ParkController = ParkController = __decorate([
    (0, swagger_1.ApiTags)('parks'),
    (0, common_1.Controller)('/parks'),
    __metadata("design:paramtypes", [park_service_1.ParkService])
], ParkController);
//# sourceMappingURL=park.controller.js.map