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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const global_constants_1 = require("../../shared/constants/global.constants");
const auth_jwt_guard_1 = require("../auth/auth.jwt.guard");
const auth_roles_decorator_1 = require("../auth/auth.roles.decorator");
const user_service_1 = require("./user.service");
const auth_dto_1 = require("../auth/auth.dto");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async getAll() {
        return this.userService.users({});
    }
    async getFirstUser() {
        return this.userService.findFirst();
    }
    async register(user) {
        return this.userService.createUser(user);
    }
    async getUserById(id) {
        return this.userService.findUser({ id: Number(id) });
    }
    async updateUser(id, userData) {
        return this.userService.updateUser({
            where: { id: Number(id) },
            data: userData,
        });
    }
    async deleteUser(id, password) {
        const deletedUser = await this.userService.deleteUser({ id: Number(id) }, password);
        return { message: 'User deleted' };
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Get)(),
    (0, auth_roles_decorator_1.Roles)(global_constants_1.ROLES_ENUM.ADMIN),
    (0, common_1.UseGuards)(auth_jwt_guard_1.JwtAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)('check'),
    (0, auth_roles_decorator_1.Roles)(global_constants_1.ROLES_ENUM.ADMIN),
    (0, common_1.UseGuards)(auth_jwt_guard_1.JwtAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getFirstUser", null);
__decorate([
    (0, common_1.Post)('user'),
    (0, auth_roles_decorator_1.Roles)(global_constants_1.ROLES_ENUM.ADMIN),
    (0, common_1.UseGuards)(auth_jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.RegisterUserDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "register", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, auth_roles_decorator_1.Roles)(global_constants_1.ROLES_ENUM.ADMIN),
    (0, common_1.UseGuards)(auth_jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserById", null);
__decorate([
    (0, common_1.Put)('user/:id'),
    (0, auth_roles_decorator_1.Roles)(global_constants_1.ROLES_ENUM.ADMIN),
    (0, common_1.UseGuards)(auth_jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Delete)('delete/:id'),
    (0, auth_roles_decorator_1.Roles)(global_constants_1.ROLES_ENUM.ADMIN),
    (0, common_1.UseGuards)(auth_jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('password')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
exports.UserController = UserController = __decorate([
    (0, swagger_1.ApiTags)('users'),
    (0, common_1.Controller)('/users'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map