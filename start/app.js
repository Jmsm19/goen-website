/*
|--------------------------------------------------------------------------
| Providers
|--------------------------------------------------------------------------
|
| Providers are building blocks for your Adonis app. Anytime you install
| a new Adonis specific package, chances are you will register the
| provider here.
|
*/
const providers = [
  '@adonisjs/framework/providers/AppProvider',
  '@adonisjs/framework/providers/ViewProvider',
  '@adonisjs/lucid/providers/LucidProvider',
  '@adonisjs/bodyparser/providers/BodyParserProvider',
  '@adonisjs/cors/providers/CorsProvider',
  '@adonisjs/auth/providers/AuthProvider',
  '@adonisjs/antl/providers/AntlProvider',
  '@adonisjs/validator/providers/ValidatorProvider',
  '@adonisjs/mail/providers/MailProvider',
  'adonis-cache/providers/CacheProvider',
  'adonis-throttle-requests/providers/ThrottleRequestsProvider',
  'adonis-hashids/providers/HashidsProvider',
  'adonis-bumblebee/providers/BumblebeeProvider',
  '@verdigris/adonis-compression/providers/CompressionProvider',
];

/*
|--------------------------------------------------------------------------
| Ace Providers
|--------------------------------------------------------------------------
|
| Ace providers are required only when running ace commands. For example
| Providers for migrations, tests etc.
|
*/
const aceProviders = [
  '@adonisjs/lucid/providers/MigrationsProvider',
  '@adonisjs/vow/providers/VowProvider',
  'adonis-cache/providers/CommandsProvider',
  'adonis-bumblebee/providers/CommandsProvider',
];

/*
|--------------------------------------------------------------------------
| Aliases
|--------------------------------------------------------------------------
|
| Aliases are short unique names for IoC container bindings. You are free
| to create your own aliases.
|
| For example:
|   { Route: 'Adonis/Src/Route' }
|
*/
const aliases = {
  Cache: 'Adonis/Addons/Cache',
};

/*
|--------------------------------------------------------------------------
| Commands
|--------------------------------------------------------------------------
|
| Here you store ace commands for your package
|
*/
const commands = [];

module.exports = { providers, aceProviders, aliases, commands };
