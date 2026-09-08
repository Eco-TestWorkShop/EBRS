
import { defineConfig } from 'vite'
import path from 'path'
import react from "@vitejs/plugin-react-swc"

const __dirname = path.resolve();

// ------------------------------------------------------------
// Environment validation
// ------------------------------------------------------------
function validateEnvironment() {
  const required = ['VITE_BACK_END_LOCAL', 'VITE_MODE']

  const missing = required.filter(key => !process.env[key])

  return {
    isValid: missing.length === 0,
    missing,
    mode: process.env.VITE_MODE || 'local',
    apiUrl: process.env.VITE_BACK_END_LOCAL || 'http://localhost:3300/api/v1/',
    databaseUrl: process.env.DATABASE_URL || '',
  }
}

const env = validateEnvironment();

// ------------------------------------------------------------
// Server config
// ------------------------------------------------------------
const SERVER_CONFIG = {
  port: parseInt(process.env.VITE_DEV_PORT || '3000', 10),
  host: process.env.VITE_DEV_HOST || 'localhost',
  https: process.env.VITE_DEV_HTTPS === 'true',
  open: process.env.VITE_DEV_OPEN === 'true',

  cors: true,

  hmr: {
    overlay: true,
    timeout: 3000,
  },

  proxy: {
    '/api': {
      target: env.apiUrl,
      changeOrigin: true,
      secure: false,

      rewrite: (path) =>
        path.replace(/^\/api/, ''),
    },
  },
}

// ------------------------------------------------------------
// Build, CSS, optimization configs
// ------------------------------------------------------------
const BUILD_ANALYTICS = {
  enabled: process.env.VITE_ANALYZE_BUNDLE === 'true',

  thresholds: {
    warning: 500 * 1024,
    error: 1024 * 1024,
  },

  exclude: [
    'react',
    'react-dom',
    'react-router-dom',
  ],
}

const PERFORMANCE = {
  preload: true,
  prefetch: true,

  dnsPrefetch: [
    'https://fonts.googleapis.com',
    'https://cdn.jsdelivr.net',
  ],

  preconnect: [
    'https://fonts.gstatic.com',
    'https://cdn.jsdelivr.net',
  ],
}

const DEPENDENCY_OPTIMIZATION = {
  include: [
    'react',
    'react-dom',
    'react-router-dom',
    'framer-motion',
  ],

  exclude: [
    'data:text/javascript',
  ],
}

const COMPRESSION = {
  gzip: true,
  brotli: true,

  minify: process.env.VITE_MINIFY !== 'false',

  target: 'es2015',
}

const CSS_CONFIG = {
  preprocessorOptions: {
    scss: {
      additionalData: `@import "@/styles/variables.scss";`,
    },
  },

  modules: {
    localsConvention: 'camelCase',

    generateScopedName:
      '[name]__[local]___[hash:base64:5]',
  },
}

const BUILD_OPTIMIZATION = {
  outDir: 'dist',

  assetsDir: 'assets',

  assetsInlineLimit: 4096,

  sourcemap:
    process.env.NODE_ENV === 'development',

  minify: COMPRESSION.minify,

  target: COMPRESSION.target,

  chunkSizeWarningLimit: 500,

  rollupOptions: {
    output: {
      manualChunks: {
        'vendor-react': [
          'react',
          'react-dom',
          'react-router-dom',
        ],

        'vendor-motion': [
          'framer-motion',
        ],

        'vendor-ui': [
          'lucide-react',
          '@radix-ui/react-dialog',
          '@radix-ui/react-slider',
        ],
      },
    },
  },

  commonjsOptions: {
    include: [
      /node_modules/,
    ],

    extensions: [
      '.js',
      '.cjs',
    ],
  },
}

// ------------------------------------------------------------
// Localization Plugin
// ------------------------------------------------------------
function localizationPlugin() {
  let translations = null;
  let loaded = false;

  // IMPORTANT:
  // Import locales/index.js.
  //
  // index.js imports the individual locale modules,
  // including:
  //
  // src/assets/locales/fr/common.js
  //
  // This makes sure common.js is executed when Vite starts.
  const loadPromise = import('./src/assets/locales/index.js')
    .then(module => {
      const {
        getSupportedLocales,
        getMessages,
      } = module;

      const locales = getSupportedLocales();

      const cache = {};

      for (const loc of locales) {
        cache[loc] = getMessages(loc);
      }

      translations = cache;
      loaded = true;


      return cache;
    })
    .catch(err => {
     

      translations = {};
      loaded = true;

      return {};
    });

  return {
    name: 'vite-plugin-localization',

    configureServer(server) {
      // --------------------------------------------------------
      // DO NOT create /api/translations here.
      //
      // The translation process is handled by common.js.
      // We only make sure index.js and common.js are loaded.
      // --------------------------------------------------------

      loadPromise.catch(() => {});

      server.config.define = {
        ...(server.config.define || {}),

        __MESSAGE_CACHE__: JSON.stringify({}),

        __LOCALE_CONFIG__: JSON.stringify({
          defaultLocale: 'en',
          supportedLocales: [
            'en',
            'es',
            'fr',
          ],
        }),
      };
    },
  };
}

// ------------------------------------------------------------
// Export config
// ------------------------------------------------------------
export default defineConfig({
  plugins: [
    react(),
    localizationPlugin(),
  ],

  resolve: {
    alias: {
      '@': path.resolve(
        __dirname,
        './src'
      ),

      '@components': path.resolve(
        __dirname,
        './src/components'
      ),

      '@pages': path.resolve(
        __dirname,
        './src/pages'
      ),

      '@hooks': path.resolve(
        __dirname,
        './src/hooks'
      ),

      '@utils': path.resolve(
        __dirname,
        './src/utils'
      ),

      '@services': path.resolve(
        __dirname,
        './src/services'
      ),

      '@styles': path.resolve(
        __dirname,
        './src/styles'
      ),

      '@assets': path.resolve(
        __dirname,
        './src/assets'
      ),

      '@config': path.resolve(
        __dirname,
        './src/config'
      ),
    },
  },

  server: SERVER_CONFIG,

  build: BUILD_OPTIMIZATION,

  css: CSS_CONFIG,

  optimizeDeps: DEPENDENCY_OPTIMIZATION,

  esbuild: {
    target: 'es2015',
  },

  assetsInclude: [
    '**/*.svg',
    '**/*.csv',
  ],
})

// ------------------------------------------------------------
// Exports
// ------------------------------------------------------------
export {
  env,
  BUILD_ANALYTICS,
  PERFORMANCE,
  DEPENDENCY_OPTIMIZATION,
  COMPRESSION,
  CSS_CONFIG,
  SERVER_CONFIG,
  BUILD_OPTIMIZATION,
}
