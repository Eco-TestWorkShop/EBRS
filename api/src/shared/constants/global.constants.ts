// eslint-disable-next-line
import * as dotenv from 'dotenv';
dotenv.config();

// ------------------------------------------------------------------
// 1. Environment validation
// ------------------------------------------------------------------
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
  console.error(
    `❌ Missing required environment variables: ${envValidation.missing.join(', ')}`
  );
  if (process.env.NODE_ENV === 'prod') {
    throw new Error('Missing required environment variables');
  }
}
if (envValidation.warnings.length) {
  console.warn(`⚠️ ${envValidation.warnings.join('; ')}`);
}

// ------------------------------------------------------------------
// 2. Environment detection helpers
// ------------------------------------------------------------------
export const isProduction = process.env.NODE_ENV === 'prod';
export const isDevelopment = process.env.NODE_ENV === 'dev';
export const isLocal = process.env.NODE_ENV === 'local' || !process.env.NODE_ENV;

export const isDbProduction = process.env.DB_MODE === 'prod';
export const isDbDevelopment = process.env.DB_MODE === 'dev';
export const isDbLocal = process.env.DB_MODE === 'local' || !process.env.DB_MODE;

// ------------------------------------------------------------------
// 3. Environment‑specific overrides (URLs, Database)
// ------------------------------------------------------------------
const nodeEnv = process.env.NODE_ENV || 'local';
const dbMode = process.env.DB_MODE || 'local';

const getCallbackUrl = () => {
  switch (nodeEnv) {
    case 'prod': return process.env.BASE_URL_PROD;
    case 'dev':  return process.env.BASE_URL_DEV;
    case 'local': return process.env.BASE_URL_API_LOCAL;
    default: return process.env.BASE_URL_LOCAL || '';
  }
};

const getRedirectUrl = () => {
  switch (nodeEnv) {
    case 'prod': return process.env.BASE_URL_PROD;
    case 'dev':  return process.env.BASE_URL_DEV;
    case 'local': return process.env.BASE_URL_LOCAL;
    default: return process.env.BASE_URL_LOCAL || '';
  }
};

const getDatabaseUrl = () => {
  switch (dbMode) {
    case 'prod': return process.env.DATABASE_URL_PROD;
    case 'dev':  return process.env.DATABASE_URL_DEV;
    case 'local': return process.env.DATABASE_URL_LOCAL;
    default: return process.env.DATABASE_URL || '';
  }
};

// ------------------------------------------------------------------
// 4. Main configuration object (single source of truth)
// ------------------------------------------------------------------
export const config = {
  // ----- Environment metadata -----
  env: {
    nodeEnv,
    dbMode,
    isProduction,
    isDevelopment,
    isLocal,
    isDbProduction,
    isDbDevelopment,
    isDbLocal,
    isValid: envValidation.isValid,
    missing: envValidation.missing,
    warnings: envValidation.warnings,
  },

  // ----- Server -----
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
      windowMs: 60 * 1000,          // 1 minute
      max: parseInt(process.env.RATE_LIMIT_MAX || '100', 10),
    },
  },

  // ----- Security & Authentication -----
  auth: {
    jwt: {
      secret: process.env.JWT_SIGNATURE || '',
      expiresInSeconds: 3600 * 1000 * 24, // 24 hours
      refreshExpiresInSeconds: 3600 * 1000 * 24 * 7, // 7 days
    },
    bcrypt: {
      saltRounds: parseInt(process.env.BCRYPT_SALT_ROUNDS || '10', 10),
    },
  },

  // ----- Roles -----
  roles: {
    ADMIN: 'admin',
    USER: 'user',
    enum: { ADMIN: 'admin', USER: 'user' },
  },

  // ----- Pagination & Sorting -----
  pagination: {
    defaultLimit: 10,
    maxLimit: 100,
    defaultSortBy: 'id',
  },

  // ----- Localization / i18n -----
  locale: {
    default: process.env.DEFAULT_LOCALE || 'en',
    supported: (process.env.SUPPORTED_LOCALES || 'en,es,fr').split(',').map(l => l.trim()),
    fallback: process.env.FALLBACK_LOCALE || 'en',
    detectFromHeader: true,
    headerName: 'x-lang',  // or 'accept-language'
    queryParam: 'lang',
    cookieName: 'lang',
    // Directory where translation JSON files are stored
    translationPath: process.env.TRANSLATION_PATH || 'src/i18n/index.js',
  },

  // ----- Database -----
  database: {
    url: getDatabaseUrl(),
    pool: {
      min: parseInt(process.env.DB_POOL_MIN || '2', 10),
      max: parseInt(process.env.DB_POOL_MAX || '10', 10),
      idleTimeoutMillis: parseInt(process.env.DB_IDLE_TIMEOUT || '30000', 10),
    },
    ssl: process.env.DB_SSL === 'true',
  },

  // ----- Email (SMTP) -----
  email: {
    host: process.env.SMTP_HOST || '',
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    secure: process.env.SMTP_SECURE === 'true',
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
    from: process.env.SMTP_FROM || 'noreply@example.com',
  },

  // ----- File Upload -----
  upload: {
    maxFileSize: parseInt(process.env.MAX_FILE_SIZE || '5242880', 10), // 5 MB
    allowedMimeTypes: (process.env.ALLOWED_MIME_TYPES || 'image/jpeg,image/png,application/pdf')
      .split(',')
      .map(m => m.trim()),
    destination: process.env.UPLOAD_DESTINATION || './uploads',
  },

  // ----- Logging -----
  logging: {
    level: process.env.LOG_LEVEL || (isProduction ? 'info' : 'debug'),
    format: process.env.LOG_FORMAT || 'json', // 'json' or 'simple'
  },

  // ----- Caching -----
  cache: {
    ttl: parseInt(process.env.CACHE_TTL || '300', 10), // seconds
    redis: {
      url: process.env.REDIS_URL || '',
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT || '6379', 10),
      password: process.env.REDIS_PASSWORD || '',
    },
  },

  // ----- Queue / Jobs -----
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

  // ----- External Services (example) -----
  services: {
    externalApi: {
      url: process.env.EXTERNAL_API_URL || '',
      apiKey: process.env.EXTERNAL_API_KEY || '',
    },
  },

  // ----- Feature Toggles -----
  features: {
    enableRegistration: process.env.ENABLE_REGISTRATION !== 'false',
    enableEmailVerification: process.env.ENABLE_EMAIL_VERIFICATION !== 'false',
    enableTwoFactorAuth: process.env.ENABLE_2FA === 'true',
  },

  // ----- URLs (computed) -----
  callbackUrl: getCallbackUrl(),
  redirectUrl: getRedirectUrl(),

  // ----- Regex Patterns -----
  regex: {
    phone: /^[0-9\s+-.()]+$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    password: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    uuid: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/,
  },

  // ----- Slug -----
  slug: {
    separator: '-',
    maxLength: 255,
  },

  // ----- Misc -----
  misc: {
    timezone: process.env.TIMEZONE || 'UTC',
    dateFormat: process.env.DATE_FORMAT || 'YYYY-MM-DD',
    datetimeFormat: process.env.DATETIME_FORMAT || 'YYYY-MM-DD HH:mm:ss',
  },
};

// ------------------------------------------------------------------
// 5. Backward‑compatible exports (preserve existing)
// ------------------------------------------------------------------
export const JWT_SECRET = config.auth.jwt.secret;
export const JWT_EXPIRY_SECONDS = config.auth.jwt.expiresInSeconds;
export const JWT_REFRESH_EXPIRY_SECONDS = config.auth.jwt.refreshExpiresInSeconds;

export enum ROLES_ENUM {
  ADMIN = 'admin',
  USER = 'user',
}
export const ROLES = config.roles;

export const DEFAULT_PAGE_LIMIT = config.pagination.defaultLimit;
export const MAX_PAGE_LIMIT = config.pagination.maxLimit;
export const DEFAULT_SORT_BY = config.pagination.defaultSortBy;

export const API_PREFIX = config.server.apiPrefix;

export const PHONE_REGEX = config.regex.phone;
export const EMAIL_REGEX = config.regex.email;
export const PASSWORD_REGEX = config.regex.password;
export const UUID_REGEX = config.regex.uuid;

export const SLUG_SEPARATOR = config.slug.separator;

// Locale exports
export const DEFAULT_LOCALE = config.locale.default;
export const SUPPORTED_LOCALES = config.locale.supported;
export const FALLBACK_LOCALE = config.locale.fallback;

// Database
export const DATABASE_URL = config.database.url;

// URLs
export const CALLBACK_URL = config.callbackUrl;
export const REDIRECT_URL = config.redirectUrl;

// Optional: export the whole config as default if needed
export default config;