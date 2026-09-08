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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const user_service_1 = require("../user/user.service");
const prisma_service_1 = require("../prisma/prisma.service");
const auth_helpers_1 = require("../../shared/helpers/auth.helpers");
const global_config_1 = require("../../configs/global.config");
const global_constants_1 = require("../../shared/constants/global.constants");
const email_service_1 = require("../email/email.service");
let AuthService = class AuthService {
    constructor(userService, prisma, jwtService, emailService) {
        this.userService = userService;
        this.prisma = prisma;
        this.jwtService = jwtService;
        this.emailService = emailService;
    }
    async login(loginUserDTO) {
        const userData = await this.userService.findUser({
            email: loginUserDTO.email,
        });
        if (!userData) {
            throw new common_1.UnauthorizedException("This email doesn't exist");
        }
        const isMatch = await auth_helpers_1.AuthHelpers.verify(loginUserDTO.password, userData.password);
        if (!isMatch) {
            throw new common_1.UnauthorizedException("Password doesn't match");
        }
        const payload = {
            id: userData.id,
            name: userData.name,
            email: userData.email,
            password: null,
            role: userData.role,
            created_at: new Date(),
            updated_at: new Date(),
            birthdate: userData.birthdate,
            phone: userData.phone,
            image: userData.image,
        };
        const accessToken = this.jwtService.sign(payload, {
            expiresIn: global_config_1.GLOBAL_CONFIG.security.expiresIn,
        });
        return {
            user: payload,
            accessToken: accessToken,
        };
    }
    async register(user) {
        const object = 'Welcome to EcoWheel! - Enjoy your bike!';
        const content = `
    Hello ${user.name},

    Welcome to EcoWheel!

    You can update your profile information from profile settings.

    Link: ${process.env.REDIRECT_URL}/setting-profile/

    Thank you,
    Enjoy your Bike :)
    `;
        const userData = await this.userService.findUser({
            email: user.email,
        });
        if (userData) {
            throw new common_1.UnauthorizedException("This email already exists");
        }
        const newUser = Object.assign(Object.assign({}, user), { role: global_constants_1.ROLES_ENUM.USER });
        const Res = await this.userService.createUser(newUser);
        await this.emailService.sendEmail(user.email, object, content);
        delete Res.password;
        return Res;
    }
    validateToken(token) {
        try {
            return this.jwtService.verify(token);
        }
        catch (error) {
            return null;
        }
    }
    async validateUser(details) {
        let data = null;
        let newUser = null;
        const object = 'Welcome to EcoWheel! - Your Password!';
        const content = `
    Hello ${details.name},

    Welcome to EcoWheel!

    Your password is: ${details.password}

    You can change your password from profile settings.

    Link: ${process.env.REDIRECT_URL}/setting-profile/updatePassword


    Enjoy your Bike :)
    `;
        const user = await this.prisma.user.findUnique({
            where: { email: details.email },
        });
        if (!user) {
            console.log("new user");
            console.log(details);
            newUser = await this.prisma.user.create({ data: details });
            await this.emailService.sendEmail(details.email, object, content);
            newUser.password = null;
        }
        data = newUser || user;
        if (data) {
            data.password = null;
            const accessToken = this.jwtService.sign(data, {
                expiresIn: global_config_1.GLOBAL_CONFIG.security.expiresIn,
            });
            return {
                user: data,
                accessToken: accessToken,
            };
        }
        else {
            throw new common_1.UnauthorizedException();
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        prisma_service_1.PrismaService,
        jwt_1.JwtService,
        email_service_1.EmailService])
], AuthService);
//# sourceMappingURL=auth.service.js.map