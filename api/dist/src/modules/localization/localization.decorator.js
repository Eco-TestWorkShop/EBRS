"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentLocale = void 0;
const common_1 = require("@nestjs/common");
const nestjs_i18n_1 = require("nestjs-i18n");
exports.CurrentLocale = (0, common_1.createParamDecorator)((data, ctx) => {
    var _a;
    return ((_a = nestjs_i18n_1.I18nContext.current()) === null || _a === void 0 ? void 0 : _a.lang) || 'en';
});
//# sourceMappingURL=localization.decorator.js.map