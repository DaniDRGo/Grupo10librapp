const { Sequelize } = require(".");

module.exports = (sequelize, dataTypes) => {

    let alias = 'Categoria';

    let cols = {
        id_categoria_libro: {
            type: dataTypes.INTEGER(11),
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        nombre_categoria_libro: {
            type: dataTypes.STRING,
            allowNull: false
        }
    }

    let config = {
        timestamps: false,
    }

    const Categoria = sequelize.define(alias, cols, config)

    
    return Categoria
}

