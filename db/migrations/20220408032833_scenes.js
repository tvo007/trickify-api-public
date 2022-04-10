const {
  addDefaultColumns,
  createNameTable,
  url,
  email,
  referencesUuid,
} = require ('../../src/lib/tableUtils');

const Knex = require ('knex');

const tableNames = require ('../../src/constants/tableNames');

/**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */

exports.up = async knex => {


  await knex.schema.createTable (tableNames.scene, table => {
    // table.increments ().notNullable ();
    // table.uuid('id').defaultTo(knex.raw('UUID()'))
    table.uuid ('id').primary ().defaultTo (knex.raw ('uuid_generate_v4()'));
    table.integer ('timestamp', 254).notNullable ();
    table.string ('tricks', 2000);
    referencesUuid(table, tableNames.sampler, false)
    addDefaultColumns (table);
  });
};

exports.down = async knex => {
  await Promise.all (
    [tableNames.scene].map (tableName => knex.schema.dropTable (tableName))
  );
};
