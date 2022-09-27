// Created by M.C. Antonio González.
const path            = require( "path" );
const { readdirSync } = require( "fs" );
const mySqlConnection = require( './database' );

const modelsFolderPath = "../models";
let models             = {};

const openedFolder = readdirSync( path.join( __dirname, modelsFolderPath ) );

openedFolder.forEach( fileName => {

    // Quita los ultimos 3 caracteres
    let modelName = fileName.slice( 0, -3 );

    models[ modelName ] = require( '../models/'+modelName )( mySqlConnection );

});

// NOTE ABOUT ASSOCIATIONS
const associatedModels = require( './associations' )( models );

module.exports = associatedModels;