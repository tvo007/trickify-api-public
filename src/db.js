const knex = require ('knex');
require('dotenv').config()

const {Model} = require ('objection');

const knexConfig = require ('../knexfile');

const environment = process.env.NODE_ENV 

const connectionConfig = knexConfig[environment];

const connection = knex (connectionConfig);

Model.knex (connection);

module.exports = connection;
