// src/localization/index.ts

import en from './locales/en/common.js';
import es from './locales/es/common.js';
import fr from './locales/fr/common.js';

// ---------- Type Definitions ----------
export interface NumberFormat {
  decimal: string;
  thousands: string;
  currency: string;
  currencySymbol: string;
}

export interface LocaleConfig {
  name: string;
  flag: string;
  messages: Record<string, any>;
  direction: 'ltr' | 'rtl';
  dateFormat: string;
  timeFormat: string;
  numberFormat: NumberFormat;
}

export type LocalesMap = Record<string, LocaleConfig>;

// ---------- Data ----------
export const locales: LocalesMap = {
  en: {
    name: 'English',
    flag: '🇬🇧',
    messages: en,
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
    messages: es,
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
    messages: fr,
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

export const defaultLocale: string = 'en';
export const fallbackLocale: string = 'en';
export const supportedLocales: string[] = Object.keys(locales);

export const localeNames: Record<string, string> = supportedLocales.reduce(
  (acc, key) => {
    acc[key] = locales[key].name;
    return acc;
  },
  {} as Record<string, string>,
);

export const localeFlags: Record<string, string> = supportedLocales.reduce(
  (acc, key) => {
    acc[key] = locales[key].flag;
    return acc;
  },
  {} as Record<string, string>,
);

// ---------- Core Functions ----------
export const getMessages = (locale: string = defaultLocale): Record<string, any> => {
  const target = locales[locale];
  if (!target) {
    console.warn(`Locale "${locale}" not found, falling back to "${fallbackLocale}"`);
    return locales[fallbackLocale]?.messages || {};
  }
  return target.messages || {};
};

export const getSupportedLocales = (): string[] => supportedLocales;

export const getLocaleName = (locale: string): string => locales[locale]?.name || locale;
export const getLocaleFlag = (locale: string): string => locales[locale]?.flag || '';
export const getLocaleDirection = (locale: string): 'ltr' | 'rtl' =>
  locales[locale]?.direction || 'ltr';
export const getDateFormat = (locale: string): string =>
  locales[locale]?.dateFormat || 'MM/DD/YYYY';
export const getTimeFormat = (locale: string): string =>
  locales[locale]?.timeFormat || 'HH:mm';
export const getNumberFormat = (locale: string): NumberFormat =>
  locales[locale]?.numberFormat || {
    decimal: '.',
    thousands: ',',
    currency: 'USD',
    currencySymbol: '$',
  };

export const isLocaleSupported = (locale: string): boolean =>
  supportedLocales.includes(locale);

export const getLocaleList = (): { code: string; name: string; flag: string; direction: string }[] =>
  supportedLocales.map((code) => ({
    code,
    name: getLocaleName(code),
    flag: getLocaleFlag(code),
    direction: getLocaleDirection(code),
  }));

// ---------- Translation ----------
export const t = (
  key: string,
  params: Record<string, any> = {},
  locale: string = defaultLocale,
): string => {
  const messages = getMessages(locale);
  const keys = key.split('.');
  let value: any = messages;

  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      if (process.env.NODE_ENV === 'development') {
        console.warn(`Translation key not found: "${key}" for locale "${locale}"`);
      }
      return key;
    }
  }

  if (typeof value === 'string' && Object.keys(params).length > 0) {
    return value.replace(/\{(\w+)\}/g, (_, name) =>
      params[name] !== undefined ? params[name] : `{${name}}`,
    );
  }
  return value || key;
};

export const pluralize = (
  key: string,
  count: number,
  params: Record<string, any> = {},
  locale: string = defaultLocale,
): string => {
  const messages = getMessages(locale);
  const keys = key.split('.');
  let value: any = messages;

  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      return key;
    }
  }

  if (value && typeof value === 'object') {
    const pluralKey = count === 1 ? 'singular' : 'plural';
    const pluralValue = value[pluralKey] || value.other || JSON.stringify(value);
    if (typeof pluralValue === 'string') {
      const allParams = { ...params, count };
      return pluralValue.replace(/\{(\w+)\}/g, (_, name) =>
        allParams[name] !== undefined ? allParams[name] : `{${name}}`,
      );
    }
    return key;
  }
  return value || key;
};

// ---------- Detection (backend stubs) ----------
export const detectLocale = (): string => defaultLocale; // override with middleware if needed
export const getStoredLocale = (): null => null;
export const setStoredLocale = (): void => {};

// ---------- Default Export ----------
export default {
  locales,
  defaultLocale,
  fallbackLocale,
  supportedLocales,
  localeNames,
  localeFlags,
  getMessages,
  getSupportedLocales,
  getLocaleName,
  getLocaleFlag,
  getLocaleDirection,
  getDateFormat,
  getTimeFormat,
  getNumberFormat,
  t,
  pluralize,
  isLocaleSupported,
  getLocaleList,
  detectLocale,
  getStoredLocale,
  setStoredLocale,
};