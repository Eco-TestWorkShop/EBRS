"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalizationModule = void 0;
const common_1 = require("@nestjs/common");
const localization_service_1 = require("./localization.service");
const localization_controller_1 = require("./localization.controller");
const locale_middleware_1 = require("./locale.middleware");
let LocalizationModule = class LocalizationModule {
    configure(consumer) {
        consumer.apply(locale_middleware_1.LocaleMiddleware).forRoutes('*');
    }
};
exports.LocalizationModule = LocalizationModule;
exports.LocalizationModule = LocalizationModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        controllers: [localization_controller_1.LocalizationController],
        providers: [localization_service_1.LocalizationService],
        exports: [localization_service_1.LocalizationService],
    })
], LocalizationModule);
//# sourceMappingURL=localization.module.js.map