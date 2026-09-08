"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setStoredLocale = exports.getStoredLocale = exports.detectLocale = exports.pluralize = exports.t = exports.getLocaleList = exports.isLocaleSupported = exports.getNumberFormat = exports.getTimeFormat = exports.getDateFormat = exports.getLocaleDirection = exports.getLocaleFlag = exports.getLocaleName = exports.getSupportedLocales = exports.getMessages = exports.localeFlags = exports.localeNames = exports.supportedLocales = exports.fallbackLocale = exports.defaultLocale = exports.locales = void 0;
const common_js_1 = __importDefault(require("./locales/en/common.js"));
const common_js_2 = __importDefault(require("./locales/es/common.js"));
const common_js_3 = __importDefault(require("./locales/fr/common.js"));
exports.locales = {
    en: {
        name: 'English',
        flag: '🇬🇧',
        messages: common_js_1.default,
        direction: 'ltr',
        dateFormat: 'MM/DD/YYYY',
        timeFormat: 'HH:mm',
        numberFormat: {
            decimal: '.',
            thousands: ',',
            currency: 'USD',
            currencySymbol: '$',
        },
    },
    es: {
        name: 'Español',
        flag: '🇪🇸',
        messages: common_js_2.default,
        direction: 'ltr',
        dateFormat: 'DD/MM/YYYY',
        timeFormat: 'HH:mm',
        numberFormat: {
            decimal: ',',
            thousands: '.',
            currency: 'EUR',
            currencySymbol: '€',
        },
    },
    fr: {
        name: 'Français',
        flag: '🇫🇷',
        messages: common_js_3.default,
        direction: 'ltr',
        dateFormat: 'DD/MM/YYYY',
        timeFormat: 'HH:mm',
        numberFormat: {
            decimal: ',',
            thousands: ' ',
            currency: 'EUR',
            currencySymbol: '€',
        },
    },
};
exports.defaultLocale = 'en';
exports.fallbackLocale = 'en';
exports.supportedLocales = Object.keys(exports.locales);
exports.localeNames = exports.supportedLocales.reduce((acc, key) => {
    acc[key] = exports.locales[key].name;
    return acc;
}, {});
exports.localeFlags = exports.supportedLocales.reduce((acc, key) => {
    acc[key] = exports.locales[key].flag;
    return acc;
}, {});
const getMessages = (locale = exports.defaultLocale) => {
    var _a;
    const target = exports.locales[locale];
    if (!target) {
        console.warn(`Locale "${locale}" not found, falling back to "${exports.fallbackLocale}"`);
        return ((_a = exports.locales[exports.fallbackLocale]) === null || _a === void 0 ? void 0 : _a.messages) || {};
    }
    return target.messages || {};
};
exports.getMessages = getMessages;
const getSupportedLocales = () => exports.supportedLocales;
exports.getSupportedLocales = getSupportedLocales;
const getLocaleName = (locale) => { var _a; return ((_a = exports.locales[locale]) === null || _a === void 0 ? void 0 : _a.name) || locale; };
exports.getLocaleName = getLocaleName;
const getLocaleFlag = (locale) => { var _a; return ((_a = exports.locales[locale]) === null || _a === void 0 ? void 0 : _a.flag) || ''; };
exports.getLocaleFlag = getLocaleFlag;
const getLocaleDirection = (locale) => { var _a; return ((_a = exports.locales[locale]) === null || _a === void 0 ? void 0 : _a.direction) || 'ltr'; };
exports.getLocaleDirection = getLocaleDirection;
const getDateFormat = (locale) => { var _a; return ((_a = exports.locales[locale]) === null || _a === void 0 ? void 0 : _a.dateFormat) || 'MM/DD/YYYY'; };
exports.getDateFormat = getDateFormat;
const getTimeFormat = (locale) => { var _a; return ((_a = exports.locales[locale]) === null || _a === void 0 ? void 0 : _a.timeFormat) || 'HH:mm'; };
exports.getTimeFormat = getTimeFormat;
const getNumberFormat = (locale) => {
    var _a;
    return ((_a = exports.locales[locale]) === null || _a === void 0 ? void 0 : _a.numberFormat) || {
        decimal: '.',
        thousands: ',',
        currency: 'USD',
        currencySymbol: '$',
    };
};
exports.getNumberFormat = getNumberFormat;
const isLocaleSupported = (locale) => exports.supportedLocales.includes(locale);
exports.isLocaleSupported = isLocaleSupported;
const getLocaleList = () => exports.supportedLocales.map((code) => ({
    code,
    name: (0, exports.getLocaleName)(code),
    flag: (0, exports.getLocaleFlag)(code),
    direction: (0, exports.getLocaleDirection)(code),
}));
exports.getLocaleList = getLocaleList;
const t = (key, params = {}, locale = exports.defaultLocale) => {
    const messages = (0, exports.getMessages)(locale);
    const keys = key.split('.');
    let value = messages;
    for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
            value = value[k];
        }
        else {
            if (process.env.NODE_ENV === 'development') {
                console.warn(`Translation key not found: "${key}" for locale "${locale}"`);
            }
            return key;
        }
    }
    if (typeof value === 'string' && Object.keys(params).length > 0) {
        return value.replace(/\{(\w+)\}/g, (_, name) => params[name] !== undefined ? params[name] : `{${name}}`);
    }
    return value || key;
};
exports.t = t;
const pluralize = (key, count, params = {}, locale = exports.defaultLocale) => {
    const messages = (0, exports.getMessages)(locale);
    const keys = key.split('.');
    let value = messages;
    for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
            value = value[k];
        }
        else {
            return key;
        }
    }
    if (value && typeof value === 'object') {
        const pluralKey = count === 1 ? 'singular' : 'plural';
        const pluralValue = value[pluralKey] || value.other || JSON.stringify(value);
        if (typeof pluralValue === 'string') {
            const allParams = Object.assign(Object.assign({}, params), { count });
            return pluralValue.replace(/\{(\w+)\}/g, (_, name) => allParams[name] !== undefined ? allParams[name] : `{${name}}`);
        }
        return key;
    }
    return value || key;
};
exports.pluralize = pluralize;
const detectLocale = () => exports.defaultLocale;
exports.detectLocale = detectLocale;
const getStoredLocale = () => null;
exports.getStoredLocale = getStoredLocale;
const setStoredLocale = () => { };
exports.setStoredLocale = setStoredLocale;
exports.default = {
    locales: exports.locales,
    defaultLocale: exports.defaultLocale,
    fallbackLocale: exports.fallbackLocale,
    supportedLocales: exports.supportedLocales,
    localeNames: exports.localeNames,
    localeFlags: exports.localeFlags,
    getMessages: exports.getMessages,
    getSupportedLocales: exports.getSupportedLocales,
    getLocaleName: exports.getLocaleName,
    getLocaleFlag: exports.getLocaleFlag,
    getLocaleDirection: exports.getLocaleDirection,
    getDateFormat: exports.getDateFormat,
    getTimeFormat: exports.getTimeFormat,
    getNumberFormat: exports.getNumberFormat,
    t: exports.t,
    pluralize: exports.pluralize,
    isLocaleSupported: exports.isLocaleSupported,
    getLocaleList: exports.getLocaleList,
    detectLocale: exports.detectLocale,
    getStoredLocale: exports.getStoredLocale,
    setStoredLocale: exports.setStoredLocale,
};
//# sourceMappingURL=index.js.map