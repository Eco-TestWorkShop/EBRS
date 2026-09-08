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
exports.JwtAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const core_1 = require("@nestjs/core");
const rental_service_1 = require("../rental/rental.service");
let JwtAuthGuard = class JwtAuthGuard extends (0, passport_1.AuthGuard)('jwt') {
    constructor(reflector, rentalService) {
        super(reflector);
        this.reflector = reflector;
        this.rentalService = rentalService;
    }
    canActivate(context) {
        console.log("--- canactivate");
        this.roles = this.reflector.get('roles', context.getHandler());
        const request = context.switchToHttp().getRequest();
        if (request.headers['user-id'] && request.route.path === '/api/v1/rentals/rental/:id' && request.method === 'GET') {
            return this.validateRental(request);
        }
        return super.canActivate(context);
    }
    async validateRental(request) {
        console.log("--- validateRental");
        const { params } = request;
        const rental = await this.rentalService.findOne({ id: Number(params.id) });
        console.log("rental", rental);
        if (rental == null) {
            throw new common_1.ForbiddenException();
        }
        const user_id = request.headers['user-id'];
        console.log("request.headers['user-id']", user_id);
        console.log("rentalService.findOne user_id", rental === null || rental === void 0 ? void 0 : rental.user_id);
        const isSelfUser = (user_id == rental.user_id);
        if (!isSelfUser) {
            if (!rental) {
                console.log("rental not exist");
            }
            else {
                console.log("rental not valid");
            }
            throw new common_1.ForbiddenException();
        }
        console.log("rental valid");
        return true;
    }
    handleRequest(err, user, info, context) {
        console.log("user", user);
        console.log("--- handleRequest");
        const request = context.switchToHttp().getRequest();
        console.log("xxxx");
        console.log("request.body", request.body);
        console.log("------");
        console.log("request.headers", request.headers);
        console.log("+++++");
        console.log("request.params", request.params);
        console.log("+++++");
        console.log("request.route.path", request.route.path, request.method);
        console.log("+++++");
        const { params } = request;
        if (err || !user) {
            throw err || new common_1.UnauthorizedException();
        }
        if (!this.roles) {
            return user;
        }
        console.log("pass");
        const hasRole = () => this.roles.includes(user.role);
        console.log("hasRole", hasRole());
        const isSelfUser = () => user.id === Number(params.id) || user.id === Number(request.body.user_id);
        const hasPermission = hasRole() || isSelfUser();
        if (!hasPermission) {
            console.log("no perm");
            throw new common_1.ForbiddenException();
        }
        return user;
    }
};
exports.JwtAuthGuard = JwtAuthGuard;
exports.JwtAuthGuard = JwtAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector, rental_service_1.RentalService])
], JwtAuthGuard);
//# sourceMappingURL=auth.jwt.guard.js.map