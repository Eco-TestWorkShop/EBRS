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
exports.LocalizationController = void 0;
const common_1 = require("@nestjs/common");
const localization_service_1 = require("./localization.service");
let LocalizationController = class LocalizationController {
    constructor(localeService) {
        this.localeService = localeService;
    }
    getSupportedLocales() {
        return this.localeService.getSupportedLocales();
    }
    getLocaleList() {
        return this.localeService.getLocaleList();
    }
    getCurrentLocale(req) {
        return {
            locale: this.localeService.getCurrentLocale(),
        };
    }
    getMessages(lang) {
        const locale = lang || this.localeService.getCurrentLocale();
        return this.localeService.getMessages(locale);
    }
    translate(key, params, lang) {
        const { key: _, lang: __ } = params, args = __rest(params, ["key", "lang"]);
        const translated = this.localeService.translate(key, args, lang);
        return {
            key,
            translated,
            lang: lang || this.localeService.getCurrentLocale(),
        };
    }
    getLocaleInfo(code) {
        if (!this.localeService.isLocaleSupported(code)) {
            return { error: `Locale "${code}" not supported` };
        }
        return {
            code,
            name: this.localeService.getLocaleName(code),
            flag: this.localeService.getLocaleFlag(code),
            direction: this.localeService.getLocaleDirection(code),
            dateFormat: this.localeService.getDateFormat(code),
            timeFormat: this.localeService.getTimeFormat(code),
            numberFormat: this.localeService.getNumberFormat(code),
        };
    }
};
exports.LocalizationController = LocalizationController;
__decorate([
    (0, common_1.Get)('supported'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LocalizationController.prototype, "getSupportedLocales", null);
__decorate([
    (0, common_1.Get)('list'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LocalizationController.prototype, "getLocaleList", null);
__decorate([
    (0, common_1.Get)('current'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], LocalizationController.prototype, "getCurrentLocale", null);
__decorate([
    (0, common_1.Get)('messages'),
    __param(0, (0, common_1.Query)('lang')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LocalizationController.prototype, "getMessages", null);
__decorate([
    (0, common_1.Get)('translate'),
    __param(0, (0, common_1.Query)('key')),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Query)('lang')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, String]),
    __metadata("design:returntype", void 0)
], LocalizationController.prototype, "translate", null);
__decorate([
    (0, common_1.Get)(':code'),
    __param(0, (0, common_1.Param)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LocalizationController.prototype, "getLocaleInfo", null);
exports.LocalizationController = LocalizationController = __decorate([
    (0, common_1.Controller)('api/v1/locale'),
    __metadata("design:paramtypes", [localization_service_1.LocalizationService])
], LocalizationController);
//# sourceMappingURL=localization.controller.js.map