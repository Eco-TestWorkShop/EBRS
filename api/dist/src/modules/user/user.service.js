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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const auth_helpers_1 = require("../../shared/helpers/auth.helpers");
const prisma_service_1 = require("../prisma/prisma.service");
let UserService = class UserService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findUser(userWhereUniqueInput) {
        return this.prisma.user.findUnique({
            where: userWhereUniqueInput,
        });
    }
    async findFirst() {
        return this.prisma.user.findFirst();
    }
    async users(params) {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prisma.user.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
        });
    }
    async createUser(data) {
        return this.prisma.user.create({
            data,
        });
    }
    async updateUser(params) {
        let { where, data } = params;
        console.log("data recieved:", data);
        const user = await this.prisma.user.findUnique({
            where: where,
        });
        console.log("user found:", user);
        if (data.hasOwnProperty('newPassword')) {
            const isMatch = await auth_helpers_1.AuthHelpers.verify(data.oldPassword, user.password);
            if (!isMatch) {
                console.log("old password doesn't match");
                throw new common_1.BadRequestException("Old password doesn't match");
            }
            data.password = data.newPassword;
            delete data.oldPassword;
            delete data.newPassword;
        }
        else {
            delete data.password;
        }
        console.log("data updated:", data);
        const updatedUser = await this.prisma.user.update({
            data,
            where,
        });
        console.log("user updated:", updatedUser);
        delete updatedUser.password;
        return updatedUser;
    }
    async deleteUser(where, password) {
        const user = await this.prisma.user.findUnique({
            where,
        });
        console.log("user found:", user);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const isMatch = await auth_helpers_1.AuthHelpers.verify(password, user.password);
        if (!isMatch) {
            throw new common_1.UnauthorizedException('Incorrect password');
        }
        const deleteduser = await this.prisma.user.delete({
            where,
        });
        delete deleteduser.password;
        console.log("user deleted:", deleteduser);
        return deleteduser;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
//# sourceMappingURL=user.service.js.map