"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.REDIRECT_URL = exports.CALLBACK_URL = exports.DATABASE_URL = exports.FALLBACK_LOCALE = exports.SUPPORTED_LOCALES = exports.DEFAULT_LOCALE = exports.SLUG_SEPARATOR = exports.UUID_REGEX = exports.PASSWORD_REGEX = exports.EMAIL_REGEX = exports.PHONE_REGEX = exports.API_PREFIX = exports.DEFAULT_SORT_BY = exports.MAX_PAGE_LIMIT = exports.DEFAULT_PAGE_LIMIT = exports.ROLES = exports.ROLES_ENUM = exports.JWT_REFRESH_EXPIRY_SECONDS = exports.JWT_EXPIRY_SECONDS = exports.JWT_SECRET = exports.config = exports.isDbLocal = exports.isDbDevelopment = exports.isDbProduction = exports.isLocal = exports.isDevelopment = exports.isProduction = void 0;
const dotenv = __importStar(require("dotenv"));
dotenv.config();
function validateEnvironment() {
    const required = [
        'JWT_SIGNATURE',
        'NODE_ENV',
        'DB_MODE',
    ];
    const missing = required.filter(key => !process.env[key]);
    const warnings = [];
    if (!process.env.DATABASE_URL_PROD && process.env.DB_MODE === 'prod') {
        warnings.push('DATABASE_URL_PROD not set but DB_MODE=prod');
    }
    if (!process.env.BASE_URL_PROD && process.env.NODE_ENV === 'prod') {
        warnings.push('BASE_URL_PROD not set but NODE_ENV=prod');
    }
    if (!process.env.SMTP_HOST && process.env.NODE_ENV === 'prod') {
        warnings.push('SMTP_HOST not set – email may fail');
    }
    return {
        isValid: missing.length === 0,
        missing,
        warnings,
        mode: process.env.NODE_ENV || 'local',
        dbMode: process.env.DB_MODE || 'local',
    };
}
const envValidation = validateEnvironment();
if (!envValidation.isValid) {
    console.error(`❌ Missing required environment variables: ${envValidation.missing.join(', ')}`);
    if (process.env.NODE_ENV === 'prod') {
        throw new Error('Missing required environment variables');
    }
}
if (envValidation.warnings.length) {
    console.warn(`⚠️ ${envValidation.warnings.join('; ')}`);
}
exports.isProduction = process.env.NODE_ENV === 'prod';
exports.isDevelopment = process.env.NODE_ENV === 'dev';
exports.isLocal = process.env.NODE_ENV === 'local' || !process.env.NODE_ENV;
exports.isDbProduction = process.env.DB_MODE === 'prod';
exports.isDbDevelopment = process.env.DB_MODE === 'dev';
exports.isDbLocal = process.env.DB_MODE === 'local' || !process.env.DB_MODE;
const nodeEnv = process.env.NODE_ENV || 'local';
const dbMode = process.env.DB_MODE || 'local';
const getCallbackUrl = () => {
    switch (nodeEnv) {
        case 'prod': return process.env.BASE_URL_PROD;
        case 'dev': return process.env.BASE_URL_DEV;
        case 'local': return process.env.BASE_URL_API_LOCAL;
        default: return process.env.BASE_URL_LOCAL || '';
    }
};
const getRedirectUrl = () => {
    switch (nodeEnv) {
        case 'prod': return process.env.BASE_URL_PROD;
        case 'dev': return process.env.BASE_URL_DEV;
        case 'local': return process.env.BASE_URL_LOCAL;
        default: return process.env.BASE_URL_LOCAL || '';
    }
};
const getDatabaseUrl = () => {
    switch (dbMode) {
        case 'prod': return process.env.DATABASE_URL_PROD;
        case 'dev': return process.env.DATABASE_URL_DEV;
        case 'local': return process.env.DATABASE_URL_LOCAL;
        default: return process.env.DATABASE_URL || '';
    }
};
exports.config = {
    env: {
        nodeEnv,
        dbMode,
        isProduction: exports.isProduction,
        isDevelopment: exports.isDevelopment,
        isLocal: exports.isLocal,
        isDbProduction: exports.isDbProduction,
        isDbDevelopment: exports.isDbDevelopment,
        isDbLocal: exports.isDbLocal,
        isValid: envValidation.isValid,
        missing: envValidation.missing,
        warnings: envValidation.warnings,
    },
    server: {
        port: parseInt(process.env.PORT || '3300', 10),
        host: process.env.HOST || '0.0.0.0',
        apiPrefix: '/api/v1',
        cors: {
            enabled: true,
            origins: (process.env.CORS_ORIGINS || 'http://localhost:5173,http://localhost:3000')
                .split(',')
                .map(o => o.trim()),
            credentials: true,
        },
        rateLimit: {
            enabled: process.env.RATE_LIMIT_ENABLED !== 'false',
            windowMs: 60 * 1000,
            max: parseInt(process.env.RATE_LIMIT_MAX || '100', 10),
        },
    },
    auth: {
        jwt: {
            secret: process.env.JWT_SIGNATURE || '',
            expiresInSeconds: 3600 * 1000 * 24,
            refreshExpiresInSeconds: 3600 * 1000 * 24 * 7,
        },
        bcrypt: {
            saltRounds: parseInt(process.env.BCRYPT_SALT_ROUNDS || '10', 10),
        },
    },
    roles: {
        ADMIN: 'admin',
        USER: 'user',
        enum: { ADMIN: 'admin', USER: 'user' },
    },
    pagination: {
        defaultLimit: 10,
        maxLimit: 100,
        defaultSortBy: 'id',
    },
    locale: {
        default: process.env.DEFAULT_LOCALE || 'en',
        supported: (process.env.SUPPORTED_LOCALES || 'en,es,fr').split(',').map(l => l.trim()),
        fallback: process.env.FALLBACK_LOCALE || 'en',
        detectFromHeader: true,
        headerName: 'x-lang',
        queryParam: 'lang',
        cookieName: 'lang',
        translationPath: process.env.TRANSLATION_PATH || 'src/i18n/index.js',
    },
    database: {
        url: getDatabaseUrl(),
        pool: {
            min: parseInt(process.env.DB_POOL_MIN || '2', 10),
            max: parseInt(process.env.DB_POOL_MAX || '10', 10),
            idleTimeoutMillis: parseInt(process.env.DB_IDLE_TIMEOUT || '30000', 10),
        },
        ssl: process.env.DB_SSL === 'true',
    },
    email: {
        host: process.env.SMTP_HOST || '',
        port: parseInt(process.env.SMTP_PORT || '587', 10),
        secure: process.env.SMTP_SECURE === 'true',
        user: process.env.SMTP_USER || '',
        pass: process.env.SMTP_PASS || '',
        from: process.env.SMTP_FROM || 'noreply@example.com',
    },
    upload: {
        maxFileSize: parseInt(process.env.MAX_FILE_SIZE || '5242880', 10),
        allowedMimeTypes: (process.env.ALLOWED_MIME_TYPES || 'image/jpeg,image/png,application/pdf')
            .split(',')
            .map(m => m.trim()),
        destination: process.env.UPLOAD_DESTINATION || './uploads',
    },
    logging: {
        level: process.env.LOG_LEVEL || (exports.isProduction ? 'info' : 'debug'),
        format: process.env.LOG_FORMAT || 'json',
    },
    cache: {
        ttl: parseInt(process.env.CACHE_TTL || '300', 10),
        redis: {
            url: process.env.REDIS_URL || '',
            host: process.env.REDIS_HOST || 'localhost',
            port: parseInt(process.env.REDIS_PORT || '6379', 10),
            password: process.env.REDIS_PASSWORD || '',
        },
    },
    queue: {
        bull: {
            redis: {
                host: process.env.REDIS_HOST || 'localhost',
                port: parseInt(process.env.REDIS_PORT || '6379', 10),
                password: process.env.REDIS_PASSWORD || '',
            },
            defaultJobOptions: {
                attempts: parseInt(process.env.QUEUE_ATTEMPTS || '3', 10),
                backoff: {
                    type: 'exponential',
                    delay: parseInt(process.env.QUEUE_BACKOFF_DELAY || '5000', 10),
                },
                removeOnComplete: true,
                removeOnFail: false,
            },
        },
    },
    services: {
        externalApi: {
            url: process.env.EXTERNAL_API_URL || '',
            apiKey: process.env.EXTERNAL_API_KEY || '',
        },
    },
    features: {
        enableRegistration: process.env.ENABLE_REGISTRATION !== 'false',
        enableEmailVerification: process.env.ENABLE_EMAIL_VERIFICATION !== 'false',
        enableTwoFactorAuth: process.env.ENABLE_2FA === 'true',
    },
    callbackUrl: getCallbackUrl(),
    redirectUrl: getRedirectUrl(),
    regex: {
        phone: /^[0-9\s+-.()]+$/,
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        password: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        uuid: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/,
    },
    slug: {
        separator: '-',
        maxLength: 255,
    },
    misc: {
        timezone: process.env.TIMEZONE || 'UTC',
        dateFormat: process.env.DATE_FORMAT || 'YYYY-MM-DD',
        datetimeFormat: process.env.DATETIME_FORMAT || 'YYYY-MM-DD HH:mm:ss',
    },
};
exports.JWT_SECRET = exports.config.auth.jwt.secret;
exports.JWT_EXPIRY_SECONDS = exports.config.auth.jwt.expiresInSeconds;
exports.JWT_REFRESH_EXPIRY_SECONDS = exports.config.auth.jwt.refreshExpiresInSeconds;
var ROLES_ENUM;
(function (ROLES_ENUM) {
    ROLES_ENUM["ADMIN"] = "admin";
    ROLES_ENUM["USER"] = "user";
})(ROLES_ENUM || (exports.ROLES_ENUM = ROLES_ENUM = {}));
exports.ROLES = exports.config.roles;
exports.DEFAULT_PAGE_LIMIT = exports.config.pagination.defaultLimit;
exports.MAX_PAGE_LIMIT = exports.config.pagination.maxLimit;
exports.DEFAULT_SORT_BY = exports.config.pagination.defaultSortBy;
exports.API_PREFIX = exports.config.server.apiPrefix;
exports.PHONE_REGEX = exports.config.regex.phone;
exports.EMAIL_REGEX = exports.config.regex.email;
exports.PASSWORD_REGEX = exports.config.regex.password;
exports.UUID_REGEX = exports.config.regex.uuid;
exports.SLUG_SEPARATOR = exports.config.slug.separator;
exports.DEFAULT_LOCALE = exports.config.locale.default;
exports.SUPPORTED_LOCALES = exports.config.locale.supported;
exports.FALLBACK_LOCALE = exports.config.locale.fallback;
exports.DATABASE_URL = exports.config.database.url;
exports.CALLBACK_URL = exports.config.callbackUrl;
exports.REDIRECT_URL = exports.config.redirectUrl;
exports.default = exports.config;
//# sourceMappingURL=global.constants.js.map