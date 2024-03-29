'use strict'

const Env = use('Env')
const Helpers = use('Helpers')

module.exports = {
  /*
  |--------------------------------------------------------------------------
  | Default Connection
  |--------------------------------------------------------------------------
  |
  | Connection defines the default connection settings to be used while
  | interacting with SQL databases.
  |
  */
  connection: Env.get('DB_CONNECTION', 'local'),

  /*
  |--------------------------------------------------------------------------
  | Sqlite
  |--------------------------------------------------------------------------
  |
  | Sqlite is a flat file database and can be good choice under development
  | environment.
  |
  | npm i --save sqlite3
  |
  */
  sqlite: {
    client: 'sqlite3',
    connection: {
      filename: Helpers.databasePath('development.sqlite')
    },
    useNullAsDefault: true,
    debug: Env.get('DB_DEBUG', false)
  },
  

  /*
  |--------------------------------------------------------------------------
  | MSSQL
  |--------------------------------------------------------------------------
  |
  | Here we define connection settings for MSSQL database.
  |
  | npm i --save mssql
  |
  */
 msprod: {
  client: 'mssql',
  connection: {
    host: Env.get('DB_HOST_MS', '192.168.3.25'),
    port: Env.get('DB_PORT_MS', '1433'),
    user: Env.get('DB_USER_MS', 'sa'),
    password: Env.get('DB_PASSWORD_MS', 'GGB4mNuB65YagJvS'),
    database: Env.get('DB_DATABASE_MS', 'bci')
  }
},
  /*
  |--------------------------------------------------------------------------
  | MySQL
  |--------------------------------------------------------------------------
  |
  | Here we define connection settings for MySQL database.
  |
  | npm i --save mysql
  |
  */
  local: {
    client: 'mysql',
    connection: {
      host: Env.get('DB_HOST', '192.168.3.18'),
      port: Env.get('DB_PORT', ''),
      user: Env.get('DB_USER', 'root'),
      password: Env.get('DB_PASSWORD', 'Qwerty123'),
      database: Env.get('DB_DATABASE', 'KH')
    },
    debug: Env.get('DB_DEBUG', false)
  },
  dev: {
    client: 'mysql',
    connection: {
      host: Env.get('DB_HOST', '192.168.3.18'),
      port: Env.get('DB_PORT', '3306'),
      user: Env.get('DB_USER', 'root'),
      password: Env.get('DB_PASSWORD', 'Qwerty123'),
      database: Env.get('DB_DATABASE', 'KH')
    },
    debug: Env.get('DB_DEBUG', false)
  },
  prod: {
    client: 'mysql',
    connection: {
      host: Env.get('DB_HOST', '192.168.3.13'),
      port: Env.get('DB_PORT', '3306'),
      user: Env.get('DB_USER', 'root'),
      password: Env.get('DB_PASSWORD', 'Qwerty123'),
      database: Env.get('DB_DATABASE', 'KH')
    },
    debug: Env.get('DB_DEBUG', false)
  },
  app: {
    client: 'mysql',
    connection: {
      host: Env.get('DB_HOST', '192.168.3.18'),
      port: Env.get('DB_PORT', '3306'),
      user: Env.get('DB_USER', 'root'),
      password: Env.get('DB_PASSWORD', 'Qwerty123'),
      database: Env.get('DB_DATABASE', 'hrmapp')
    },
    debug: Env.get('DB_DEBUG', false)
  },
  default: {
    client: 'mysql',
    connection: {
      host: Env.get('DB_HOST', '192.168.3.18'),
      port: Env.get('DB_PORT', '3306'),
      user: Env.get('DB_USER', 'root'),
      password: Env.get('DB_PASSWORD', 'Qwerty123'),
      database: Env.get('DB_DATABASE', 'KH')
    },
    debug: Env.get('DB_DEBUG', false)
  }
  /*
  |--------------------------------------------------------------------------
  | PostgreSQL
  |--------------------------------------------------------------------------
  |
  | Here we define connection settings for PostgreSQL database.
  |
  | npm i --save pg
  |
  
  pg: {
    client: 'pg',
    connection: {
      host: Env.get('DB_HOST', 'localhost'),
      port: Env.get('DB_PORT', ''),
      user: Env.get('DB_USER', 'root'),
      password: Env.get('DB_PASSWORD', ''),
      database: Env.get('DB_DATABASE', 'adonis')
    },
    debug: Env.get('DB_DEBUG', false)
  }
  */
}
