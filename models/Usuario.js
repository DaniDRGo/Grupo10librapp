const { DataTypes } = require('sequelize');

module.exports = (mySqlConnection) => {

    let alias = 'Usuario';

    let cols = {
        id_usuario: {
            type: DataTypes.INTEGER(11),
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        apellido: {
            type: DataTypes.STRING,
            allowNull: false
        },
        avatar: {
            type: DataTypes.STRING,
            allowNull: false
        },
        fecha_nacimiento: {
            type: DataTypes.DATE,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        telefono: {
            type: DataTypes.STRING,
            allowNull: false
        },
        pais: {
            type: DataTypes.STRING,
            allowNull: false
        },
        provincia: {
            type: DataTypes.STRING,
            allowNull: false
        },
        localidad: {
            type: DataTypes.STRING,
            allowNull: false
        },
        direccion: {
            type: DataTypes.STRING,
            allowNull: false
        },
        piso: {
            type: DataTypes.STRING,
            allowNull: false
        },
        cod_postal: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        tyc: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        id_rol: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        }
    }

    let config = {
        timestamps: false
    }

    const Usuario = mySqlConnection.define(alias, cols, config)

    return Usuario
}