import { defineConfig } from "@adonisjs/core/app";

export default defineConfig({
  /*
  |--------------------------------------------------------------------------
  | Commands
  |--------------------------------------------------------------------------
  |
  | List of ace commands to register from packages. The application commands
  | will be scanned automatically from the "./commands" directory.
  |
  */
  commands: [() => import('@adonisjs/core/commands'), () => import('@adonisjs/lucid/commands')],
  /*
  |--------------------------------------------------------------------------
  | Preloads
  |--------------------------------------------------------------------------
  |
  | List of modules to import before starting the application.
  |
  */
  preloads: [
    () => import('./start/routes.js'),
    () => import('./start/kernel.js')
  ],
  /*
  |--------------------------------------------------------------------------
  | Service providers
  |--------------------------------------------------------------------------
  |
  | List of service providers to import and register when booting the
  | application
  |
  */
  providers: [
    () => import('./providers/AppProvider.js'),
    () => import('./providers/Up/Provider.js'),
    () => import('@adonisjs/core/providers/app_provider'),
    () => import('@adonisjs/core/providers/hash_provider'),
    { "file": () => import('@adonisjs/core/providers/repl_provider'), "environment": ["repl", "test"] },
    () => import('@adonisjs/session/session_provider'),
    () => import('@adonisjs/core/providers/edge_provider'),
    () => import('@adonisjs/shield/shield_provider'),
    () => import('@adonisjs/lucid/database_provider'),
    () => import('@adonisjs/auth/auth_provider'),
    () => import('@adonisjs/lucid-slugify'),
    () => import('@adonisjs/drive-s3'),
    () => import('@adonisjs/attachment-lite')
  ],
  metaFiles: [
    {
      "pattern": "public/**",
      "reloadServer": false
    },
    {
      "pattern": "resources/views/**/*.edge",
      "reloadServer": false
    }
  ],
  /*
  |--------------------------------------------------------------------------
  | Tests
  |--------------------------------------------------------------------------
  |
  | List of test suites to organize tests by their type. Feel free to remove
  | and add additional suites.
  |
  */
  tests: {
    "suites": [
      {
        "name": "browser",
        "files": [
          "tests/browser/**/*.spec(.ts|.js)"
        ],
        "timeout": 60000
      }
    ]
  }
});
