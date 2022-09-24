const { DataTypes } = require('sequelize');

module.exports = (mySqlConnection) => {

    let alias = 'Libro';

    let cols = {
        id_libro: {
            type: DataTypes.INTEGER(11),
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        titulo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        autor: {
            type: DataTypes.STRING,
            allowNull: false
        },
        portada: {
            type: DataTypes.STRING,
            allowNull: false
        },
        descripcion: {
            type: DataTypes.STRING,
            allowNull: false
        },
        isbn: {
            type: DataTypes.STRING,
            allowNull: false
        },
        num_paginas: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        precio: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        peso: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        idioma: {
            type: DataTypes.STRING,
            allowNull: false
        },
        id_categoria_libro: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        }
    }

    let config = {
        timestamps: false,
    }

    const Libro = mySqlConnection.define(alias, cols, config);


    return Libro
}