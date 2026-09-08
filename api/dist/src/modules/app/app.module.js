"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const auth_module_1 = require("../auth/auth.module");
const user_module_1 = require("../user/user.module");
const bike_module_1 = require("../bike/bike.module");
const park_module_1 = require("../park/park.module");
const rental_module_1 = require("../rental/rental.module");
const prisma_module_1 = require("../prisma/prisma.module");
const paypal_module_1 = require("../payment/paypal.module");
const global_config_1 = require("../../configs/global.config");
const localization_module_1 = require("../localization/localization.module");
const app_service_1 = require("./app.service");
const app_controller_1 = require("./app.controller");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            localization_module_1.LocalizationModule,
            prisma_module_1.PrismaModule,
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            park_module_1.ParkModule,
            bike_module_1.BikeModule,
            rental_module_1.RentalModule,
            config_1.ConfigModule.forRoot({ isGlobal: true, load: [() => global_config_1.GLOBAL_CONFIG] }),
            paypal_module_1.PaypalModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
        exports: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map