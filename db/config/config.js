module.exports = {
  "development": {
    "username": "root",
    "password": null,
    "database": "librapp",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "port": 8889 // Se debe cambiar según la necesidad al puerto 3306
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
