const Knex = require ('knex');

const tableNames = require ('../../src/constants/tableNames');

const {
  addDefaultColumns,
  createNameTable,
  url,
  email,
} = require ('../../src/lib/tableUtils');

/**
 * 
 * @param {Knex} knex 
 */
exports.up = async knex => {
  await knex.raw ('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');

  await knex.raw ('set timezone TO "America/Los_Angeles";');

  await knex.schema.createTable (tableNames.user, table => {
    // table.increments ().notNullable ();
    // table.uuid('id').defaultTo(knex.raw('UUID()'))
    table.uuid ('id').primary ().defaultTo (knex.raw ('uuid_generate_v4()'));
    email (table, 'email').notNullable ().unique ();
    table.string ('name', 254).notNullable ();
    table.string ('password', 254).notNullable ();
    addDefaultColumns (table);
  });
};

exports.down = async knex => {
  await Promise.all (
    [tableNames.user].map (tableName => knex.schema.dropTable (tableName))
  );

  await knex.raw ('set timezone TO "UTC";');

  await knex.raw ('DROP EXTENSION IF EXISTS "uuid-ossp"');
};
