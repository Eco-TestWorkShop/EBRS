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
exports.LocaleMiddleware = void 0;
const common_1 = require("@nestjs/common");
const localization_service_1 = require("./localization.service");
let LocaleMiddleware = class LocaleMiddleware {
    constructor(localeService) {
        this.localeService = localeService;
    }
    use(req, res, next) {
        const headerLang = req.headers['x-lang'];
        const acceptLang = req.headers['accept-language'];
        let locale = this.localeService.getCurrentLocale() || 'en';
        if (headerLang && this.localeService.isLocaleSupported(headerLang)) {
            locale = headerLang;
        }
        else if (acceptLang) {
            const [preferred] = acceptLang.split(',');
            const lang = preferred.split('-')[0];
            if (this.localeService.isLocaleSupported(lang)) {
                locale = lang;
            }
        }
        this.localeService.setCurrentLocale(locale);
        req.locale = locale;
        next();
    }
};
exports.LocaleMiddleware = LocaleMiddleware;
exports.LocaleMiddleware = LocaleMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [localization_service_1.LocalizationService])
], LocaleMiddleware);
//# sourceMappingURL=locale.middleware.js.map