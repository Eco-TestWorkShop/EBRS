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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RentalController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_jwt_guard_1 = require("../auth/auth.jwt.guard");
const auth_roles_decorator_1 = require("../auth/auth.roles.decorator");
const global_constants_1 = require("../../shared/constants/global.constants");
const rental_service_1 = require("./rental.service");
const rental_dto_1 = require("./rental.dto");
let RentalController = class RentalController {
    constructor(rentalService) {
        this.rentalService = rentalService;
    }
    async getAllRentals() {
        return this.rentalService.findAll({});
    }
    async getFirstUser() {
        console.log("----- check");
        return this.rentalService.findFirst();
    }
    async getRentalById(id) {
        console.log("----- check12");
        return this.rentalService.findOne({ id: Number(id) });
    }
    async getRentalsByUser(id) {
        return this.rentalService.findAll({
            where: { user_id: Number(id) },
            orderBy: { created_at: 'desc' }
        });
    }
    async createRental(createRentalDto) {
        const { user_id, bike_id } = createRentalDto, rest = __rest(createRentalDto, ["user_id", "bike_id"]);
        return this.rentalService.create(Object.assign(Object.assign({}, rest), { User: {
                connect: { id: user_id },
            }, Bike: {
                connect: { id: bike_id },
            } }));
    }
    async updateRental(id, updateRentalDto) {
        const { user_id, bike_id } = updateRentalDto, rest = __rest(updateRentalDto, ["user_id", "bike_id"]);
        return this.rentalService.update({
            where: { id: Number(id) },
            data: Object.assign(Object.assign(Object.assign({}, rest), (user_id ? { User: { connect: { id: user_id } } } : {})), (bike_id ? { Bike: { connect: { id: bike_id } } } : {})),
        });
    }
    async deleteRental(id) {
        return this.rentalService.delete({ id: Number(id) });
    }
};
exports.RentalController = RentalController;
__decorate([
    (0, common_1.Get)('/'),
    (0, auth_roles_decorator_1.Roles)(global_constants_1.ROLES_ENUM.ADMIN),
    (0, common_1.UseGuards)(auth_jwt_guard_1.JwtAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RentalController.prototype, "getAllRentals", null);
__decorate([
    (0, common_1.Get)('rental/check'),
    (0, auth_roles_decorator_1.Roles)(global_constants_1.ROLES_ENUM.ADMIN),
    (0, common_1.UseGuards)(auth_jwt_guard_1.JwtAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RentalController.prototype, "getFirstUser", null);
__decorate([
    (0, common_1.Get)('rental/:id'),
    (0, auth_roles_decorator_1.Roles)(global_constants_1.ROLES_ENUM.ADMIN),
    (0, common_1.UseGuards)(auth_jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RentalController.prototype, "getRentalById", null);
__decorate([
    (0, common_1.Get)('user/:id'),
    (0, auth_roles_decorator_1.Roles)(global_constants_1.ROLES_ENUM.ADMIN),
    (0, common_1.UseGuards)(auth_jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RentalController.prototype, "getRentalsByUser", null);
__decorate([
    (0, common_1.Post)('rental'),
    (0, auth_roles_decorator_1.Roles)(global_constants_1.ROLES_ENUM.ADMIN),
    (0, common_1.UseGuards)(auth_jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [rental_dto_1.CreateRentalDto]),
    __metadata("design:returntype", Promise)
], RentalController.prototype, "createRental", null);
__decorate([
    (0, common_1.Put)('rental/:id'),
    (0, auth_roles_decorator_1.Roles)(global_constants_1.ROLES_ENUM.ADMIN),
    (0, common_1.UseGuards)(auth_jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, rental_dto_1.UpdateRentalDto]),
    __metadata("design:returntype", Promise)
], RentalController.prototype, "updateRental", null);
__decorate([
    (0, common_1.Delete)('rental/:id'),
    (0, auth_roles_decorator_1.Roles)(global_constants_1.ROLES_ENUM.ADMIN),
    (0, common_1.UseGuards)(auth_jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RentalController.prototype, "deleteRental", null);
exports.RentalController = RentalController = __decorate([
    (0, swagger_1.ApiTags)('rentals'),
    (0, common_1.Controller)('/rentals'),
    __metadata("design:paramtypes", [rental_service_1.RentalService])
], RentalController);
//# sourceMappingURL=rental.controller.js.map