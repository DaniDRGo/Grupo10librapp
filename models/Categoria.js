const { DataTypes } = require('sequelize');


module.exports = (mySqlConnection) => {

    let alias = 'Categoria';

    let cols = {
        id_categoria_libro: {
            type: DataTypes.INTEGER(11),
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        nombre_categoria_libro: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }

    let config = {
        timestamps: false,
    }

    const Categoria = mySqlConnection.define(alias, cols, config)

    
    return Categoria
}

