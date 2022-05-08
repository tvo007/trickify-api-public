const Knex = require ('knex');

const tableNames = require ('../../src/constants/tableNames');

/**
 * 
 * @param {Knex} knex 
 */

exports.seed = async knex => {

  await knex(tableNames.sampler).insert({
    name: "Rowdy",
    created_by: "BAHT, Ethan Turner",
    url: "https://youtu.be/PWe823hbXDw",
    runtime: 620,
    upload_date: "November 8th, 2021",

  }) 
};

// [

// ]
