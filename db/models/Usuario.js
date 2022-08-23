module.exports = (sequelize, dataTypes) => {

    let alias = 'Usuario';

    let cols = {
        id_usuario: {
            type: dataTypes.INTEGER(11),
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        nombre: {
            type: dataTypes.STRING,
            allowNull: false
        },
        apellido: {
            type: dataTypes.STRING,
            allowNull: false
        },
        avatar: {
            type: dataTypes.STRING,
            allowNull: false
        },
        fecha_nacimiento: {
            type: dataTypes.DATE,
            allowNull: false
        },
        email: {
            type: dataTypes.STRING,
            allowNull: false
        },
        telefono: {
            type: dataTypes.STRING,
            allowNull: false
        },
        pais: {
            type: dataTypes.STRING,
            allowNull: false
        },
        provincia: {
            type: dataTypes.STRING,
            allowNull: false
        },
        localidad: {
            type: dataTypes.STRING,
            allowNull: false
        },
        direccion: {
            type: dataTypes.STRING,
            allowNull: false
        },
        piso: {
            type: dataTypes.STRING,
            allowNull: false
        },
        cod_postal: {
            type: dataTypes.STRING,
            allowNull: false
        },
        password: {
            type: dataTypes.STRING,
            allowNull: false
        },
        tyc: {
            type: dataTypes.BOOLEAN,
            allowNull: false
        },
        id_rol: {
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

    const Usuario = sequelize.define(alias, cols, config)

    return Usuario
}