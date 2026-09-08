
// ============================================================
// LOCALE CONFIGURATION - EcoWheel Localization System
// ============================================================

// ------------------------------------------------------------
// LOCALE REGISTRY
// ------------------------------------------------------------

const locales = {
  en: {
    name: 'English',
    flag: '🇬🇧',
    direction: 'ltr',
    dateFormat: 'MM/DD/YYYY',
    timeFormat: 'HH:mm',
    numberFormat: {
      decimal: '.',
      thousands: ',',
      currency: 'USD',
      currencySymbol: '$',
    },

    // Lazy load English messages
    loader: () => import('./en/common.js'),
  },

  es: {
    name: 'Español',
    flag: '🇪🇸',
    direction: 'ltr',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: 'HH:mm',
    numberFormat: {
      decimal: ',',
      thousands: '.',
      currency: 'EUR',
      currencySymbol: '€',
    },

    // Lazy load Spanish messages
    loader: () => import('./es/common.js'),
  },

  fr: {
    name: 'Français',
    flag: '🇫🇷',
    direction: 'ltr',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: 'HH:mm',
    numberFormat: {
      decimal: ',',
      thousands: ' ',
      currency: 'EUR',
      currencySymbol: '€',
    },

    // Lazy load French messages
    loader: () => import('./fr/common.js'),
  },
}


// ------------------------------------------------------------
// CONSTANTS
// ------------------------------------------------------------

export const defaultLocale = 'en'
export const fallbackLocale = 'en'

export const supportedLocales = Object.keys(locales)


// ------------------------------------------------------------
// LOCALE NAMES
// ------------------------------------------------------------

export const localeNames = supportedLocales.reduce(
  (acc, key) => {
    acc[key] = locales[key].name
    return acc
  },
  {}
)


// ------------------------------------------------------------
// LOCALE FLAGS
// ------------------------------------------------------------

export const localeFlags = supportedLocales.reduce(
  (acc, key) => {
    acc[key] = locales[key].flag
    return acc
  },
  {}
)


// ------------------------------------------------------------
// MESSAGE CACHE
// ------------------------------------------------------------

const messageCache = {}

const loadingPromises = {}


// ------------------------------------------------------------
// LOAD MESSAGES
// ------------------------------------------------------------

export const getMessages = async (
  locale = defaultLocale
) => {

  // ----------------------------------------------------------
  // Return cached messages
  // ----------------------------------------------------------

  if (messageCache[locale]) {
    return messageCache[locale]
  }


  // ----------------------------------------------------------
  // Validate locale
  // ----------------------------------------------------------

  const target =
    locales[locale] ||
    locales[fallbackLocale]

  if (!target) {
    return {}
  }


  // ----------------------------------------------------------
  // Prevent duplicate loading
  // ----------------------------------------------------------

  if (loadingPromises[locale]) {
    return loadingPromises[locale]
  }


  // ----------------------------------------------------------
  // Load language module
  // ----------------------------------------------------------

  loadingPromises[locale] = target
    .loader()
    .then(module => {

      const messages =
        module.default || module

      messageCache[locale] = messages

      return messages
    })
    .catch(error => {


      messageCache[locale] = {}

      return {}
    })


  return loadingPromises[locale]
}


// ------------------------------------------------------------
// LOAD ALL MESSAGES
// ------------------------------------------------------------

export const loadAllMessages = async () => {

  const result = {}

  await Promise.all(
    supportedLocales.map(async locale => {

      result[locale] =
        await getMessages(locale)

    })
  )

  return result
}


// ------------------------------------------------------------
// GET SUPPORTED LOCALES
// ------------------------------------------------------------

export const getSupportedLocales = () => {
  return supportedLocales
}


// ------------------------------------------------------------
// GET LOCALE NAME
// ------------------------------------------------------------

export const getLocaleName = (
  locale
) => {

  return locales[locale]?.name || locale
}


// ------------------------------------------------------------
// GET LOCALE FLAG
// ------------------------------------------------------------

export const getLocaleFlag = (
  locale
) => {

  return locales[locale]?.flag || ''
}


// ------------------------------------------------------------
// GET LOCALE DIRECTION
// ------------------------------------------------------------

export const getLocaleDirection = (
  locale
) => {

  return locales[locale]?.direction || 'ltr'
}


// ------------------------------------------------------------
// GET DATE FORMAT
// ------------------------------------------------------------

export const getDateFormat = (
  locale
) => {

  return (
    locales[locale]?.dateFormat ||
    'MM/DD/YYYY'
  )
}


// ------------------------------------------------------------
// GET TIME FORMAT
// ------------------------------------------------------------

export const getTimeFormat = (
  locale
) => {

  return (
    locales[locale]?.timeFormat ||
    'HH:mm'
  )
}


// ------------------------------------------------------------
// GET NUMBER FORMAT
// ------------------------------------------------------------

export const getNumberFormat = (
  locale
) => {

  return (
    locales[locale]?.numberFormat || {
      decimal: '.',
      thousands: ',',
      currency: 'USD',
      currencySymbol: '$',
    }
  )
}


// ------------------------------------------------------------
// TRANSLATE
// ------------------------------------------------------------

export const t = async (
  key,
  params = {},
  locale = defaultLocale
) => {

  const messages =
    await getMessages(locale)

  const keys =
    key.split('.')

  let value = messages


  for (const k of keys) {

    if (
      value &&
      typeof value === 'object' &&
      k in value
    ) {

      value = value[k]

    } else {

      if (
        typeof process !== 'undefined' &&
        process.env?.NODE_ENV === 'development'
      ) {

      }

      return key
    }
  }


  // ----------------------------------------------------------
  // Interpolation
  // ----------------------------------------------------------

  if (
    typeof value === 'string' &&
    Object.keys(params).length > 0
  ) {

    return value.replace(
      /\{(\w+)\}/g,
      (_, name) => {

        return params[name] !== undefined
          ? params[name]
          : `{${name}}`
      }
    )
  }


  return value || key
}


// ------------------------------------------------------------
// PLURALIZE
// ------------------------------------------------------------

export const pluralize = async (
  key,
  count,
  params = {},
  locale = defaultLocale
) => {

  const messages =
    await getMessages(locale)

  const keys =
    key.split('.')

  let value = messages


  for (const k of keys) {

    if (
      value &&
      typeof value === 'object' &&
      k in value
    ) {

      value = value[k]

    } else {

      return key
    }
  }


  // ----------------------------------------------------------
  // Plural object
  // ----------------------------------------------------------

  if (
    value &&
    typeof value === 'object'
  ) {

    const pluralKey =
      count === 1
        ? 'singular'
        : 'plural'

    const pluralValue =
      value[pluralKey] ||
      value.other ||
      JSON.stringify(value)


    if (
      typeof pluralValue === 'string'
    ) {

      const allParams = {
        ...params,
        count,
      }

      return pluralValue.replace(
        /\{(\w+)\}/g,
        (_, name) => {

          return allParams[name] !== undefined
            ? allParams[name]
            : `{${name}}`
        }
      )
    }

    return key
  }


  return value || key
}


// ------------------------------------------------------------
// CHECK LOCALE
// ------------------------------------------------------------

export const isLocaleSupported = (
  locale
) => {

  return supportedLocales.includes(locale)
}


// ------------------------------------------------------------
// LOCALE LIST
// ------------------------------------------------------------

export const getLocaleList = () => {

  return supportedLocales.map(code => ({
    code,
    name: getLocaleName(code),
    flag: getLocaleFlag(code),
    direction: getLocaleDirection(code),
  }))
}


// ------------------------------------------------------------
// DETECT BROWSER LOCALE
// ------------------------------------------------------------

export const detectLocale = () => {

  if (
    typeof window === 'undefined'
  ) {

    return defaultLocale
  }


  // ----------------------------------------------------------
  // navigator.languages
  // ----------------------------------------------------------

  if (
    navigator.languages
  ) {

    for (
      const lang of navigator.languages
    ) {

      const normalized =
        lang.split('-')[0]

      if (
        isLocaleSupported(normalized)
      ) {

        return normalized
      }
    }
  }


  // ----------------------------------------------------------
  // navigator.language
  // ----------------------------------------------------------

  if (
    navigator.language
  ) {

    const normalized =
      navigator.language.split('-')[0]

    if (
      isLocaleSupported(normalized)
    ) {

      return normalized
    }
  }


  return defaultLocale
}


// ------------------------------------------------------------
// GET STORED LOCALE
// ------------------------------------------------------------

export const getStoredLocale = (
  storageKey = 'preferred_locale'
) => {

  if (
    typeof window === 'undefined'
  ) {

    return null
  }


  try {

    return localStorage.getItem(
      storageKey
    )

  } catch {

    return null
  }
}


// ------------------------------------------------------------
// SAVE LOCALE
// ------------------------------------------------------------

export const setStoredLocale = (
  locale,
  storageKey = 'preferred_locale'
) => {

  if (
    typeof window === 'undefined'
  ) {

    return
  }


  if (
    !isLocaleSupported(locale)
  ) {



    return
  }


  try {

    localStorage.setItem(
      storageKey,
      locale
    )

  } catch {

    // Ignore storage errors
  }
}


// ------------------------------------------------------------
// CREATE TRANSLATION HOOK
// ------------------------------------------------------------

export const createTranslationHook = (
  useState,
  useEffect,
  initialLocale = defaultLocale
) => {

  const [
    locale,
    setLocale
  ] = useState(initialLocale)

  const [
    messages,
    setMessages
  ] = useState({})

  const [
    isLoading,
    setIsLoading
  ] = useState(true)


  // ----------------------------------------------------------
  // Load messages asynchronously
  // ----------------------------------------------------------

  useEffect(() => {

    let cancelled = false

    setIsLoading(true)

    getMessages(locale)
      .then(newMessages => {

        if (!cancelled) {

          setMessages(
            newMessages
          )

          setIsLoading(false)
        }
      })

    return () => {
      cancelled = true
    }

  }, [locale])


  // ----------------------------------------------------------
  // Change locale
  // ----------------------------------------------------------

  const changeLocale = (
    newLocale
  ) => {

    if (
      !isLocaleSupported(newLocale)
    ) {

    

      return
    }


    setLocale(newLocale)

    setStoredLocale(
      newLocale
    )
  }


  // ----------------------------------------------------------
  // Translate
  // ----------------------------------------------------------

  const translate = async (
    key,
    params = {}
  ) => {

    return await t(
      key,
      params,
      locale
    )
  }


  // ----------------------------------------------------------
  // Plural
  // ----------------------------------------------------------

  const plural = async (
    key,
    count,
    params = {}
  ) => {

    return await pluralize(
      key,
      count,
      params,
      locale
    )
  }


  return {
    locale,
    messages,
    isLoading,

    setLocale: changeLocale,

    t: translate,

    pluralize: plural,

    changeLocale,

    isSupported:
      isLocaleSupported(locale),
  }
}


// ------------------------------------------------------------
// DEFAULT EXPORT
// ------------------------------------------------------------

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

  createTranslationHook,

  loadAllMessages,
}
