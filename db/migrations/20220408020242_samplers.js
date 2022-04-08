const {
  addDefaultColumns,
  createNameTable,
  url,
  email,
} = require ('../../src/lib/tableUtils');

const Knex = require ('knex');

const tableNames = require ('../../src/constants/tableNames');


/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */


 exports.up = async knex => {
  
    await knex.schema.createTable (tableNames.sampler, table => {
      // table.increments ().notNullable ();
      // table.uuid('id').defaultTo(knex.raw('UUID()'))
      table.uuid ('id').primary ().defaultTo (knex.raw ('uuid_generate_v4()'));
      table.string ('name', 254).notNullable ();
      table.string ('created_by', 254).notNullable ();
      table.string ('url', '2000').notNullable ().unique()
      table.integer ('runtime', 254).notNullable ();
      table.string ('upload_date', 254).notNullable ();

      addDefaultColumns (table);
    });
  };
  
  exports.down = async knex => {
    await Promise.all (
      [tableNames.sampler].map (tableName => knex.schema.dropTable (tableName))
    );
  };
  