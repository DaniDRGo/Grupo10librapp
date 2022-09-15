
module.exports = (sequelize, dataTypes) => {

    let alias = 'Libro';

    let cols = {
        id_libro: {
            type: dataTypes.INTEGER(11),
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        titulo: {
            type: dataTypes.STRING,
            allowNull: false
        },
        autor: {
            type: dataTypes.STRING,
            allowNull: false
        },
        portada: {
            type: dataTypes.STRING,
            allowNull: false
        },
        descripcion: {
            type: dataTypes.STRING,
            allowNull: false
        },
        isbn: {
            type: dataTypes.STRING,
            allowNull: false
        },
        num_paginas: {
            type: dataTypes.INTEGER(11),
            allowNull: false
        },
        precio: {
            type: dataTypes.DECIMAL,
            allowNull: false
        },
        peso: {
            type: dataTypes.DECIMAL,
            allowNull: false
        },
        idioma: {
            type: dataTypes.STRING,
            allowNull: false
        },
        id_categoria_libro: {
            type: dataTypes.INTEGER(11),
            allowNull: false
        }
    }

    let config = {
        timestamps: false,
        // createdAt: 'created_at',
        // updatedAt: 'updated_at',
        // deletedAt: false
    }

    const Libro = sequelize.define(alias, cols, config);


    return Libro
}