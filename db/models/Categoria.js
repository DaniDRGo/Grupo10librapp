

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
        // createdAt: 'created_at',
        // updatedAt: 'updated_at',
        // deletedAt: false
    }

    const Categoria = sequelize.define(alias, cols, config)

    // Categoria.associate = function( model ){
    //     Categoria.belongsTo( model.Libro, {
    //         as: 'libros',
    //         foreingKey: "id_categoria_libro"
    //     } )
    // }

    return Categoria
}