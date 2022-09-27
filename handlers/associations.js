// Created by M.C. Antonio González.

module.exports = function( models ) {

    models[ 'Categoria' ].hasMany( models[ 'Libro' ], {
        foreignKey: 'id_categoria_libro',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    });
    models[ 'Libro' ].belongsTo( models[ 'Categoria' ],{
        foreignKey: 'id_categoria_libro'
    });

    return models;

}