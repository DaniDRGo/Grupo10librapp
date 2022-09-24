// Created by M.C. Antonio González.

const { Sequelize } = require( 'sequelize' );

const mySqlConnection = new Sequelize( 'librapp', 'root', '', {
    
    host: 'localhost',
    dialect: 'mysql'

});

module.exports = mySqlConnection;