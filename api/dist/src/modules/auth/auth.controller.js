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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const global_constants_1 = require("../../shared/constants/global.constants");
const auth_service_1 = require("./auth.service");
const auth_dto_1 = require("./auth.dto");
const passport_1 = require("@nestjs/passport");
const auth_jwt_guard_1 = require("../auth/auth.jwt.guard");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async checkUser(req) {
        const token = req.cookies.accessToken;
        const user = this.authService.validateToken(token);
        return {
            user: user,
            accessToken: token,
        };
    }
    async login(user, res) {
        const loginData = await this.authService.login(user);
        res.cookie('accessToken', loginData.accessToken, {
            expires: new Date(new Date().getTime() + global_constants_1.JWT_EXPIRY_SECONDS),
            sameSite: 'strict',
            secure: false,
            httpOnly: true,
        });
        return res.status(200).send(loginData);
    }
    async register(user) {
        return this.authService.register(user);
    }
    logout(res) {
        res.clearCookie('accessToken');
        res.status(200).send({ success: true });
    }
    async googleAuth() {
    }
    async googleAuthCallback(req, res) {
        res.cookie('accessToken', req.user.accessToken, {
            expires: new Date(new Date().getTime() + global_constants_1.JWT_EXPIRY_SECONDS),
            sameSite: 'strict',
            secure: false,
            httpOnly: true,
        });
        console.log("redirecting to: ", process.env.REDIRECT_URL);
        return res.redirect(process.env.REDIRECT_URL);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Get)('check'),
    (0, common_1.UseGuards)(auth_jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "checkUser", null);
__decorate([
    (0, common_1.Post)('login'),
    (0, swagger_1.ApiOperation)({ description: 'Login user' }),
    (0, swagger_1.ApiBody)({ type: auth_dto_1.LoginUserDTO }),
    (0, swagger_1.ApiResponse)({ type: auth_dto_1.AuthResponseDTO }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.LoginUserDTO, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.RegisterUserDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('logout'),
    __param(0, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "logout", null);
__decorate([
    (0, common_1.Get)('google'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('google')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleAuth", null);
__decorate([
    (0, common_1.Get)('google/callback'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('google')),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleAuthCallback", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('auth'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map