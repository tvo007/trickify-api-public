
function addDefaultColumns (table) {
  table.timestamps (false, true);
  table.datetime ('deleted_at');
  // table.datetime ('deleted_at').notNullable ().default (Knex.now);
  // table.datetime ('created_at').notNullable()
  // table.datetime ('updated_at').notNullable()

}

const createNameTable = (knex, table_name) => {
  return knex.schema.createTable (table_name, table => {
    table.increments ().notNullable ();
    table.string ('name').notNullable ().unique ();
    addDefaultColumns (table);
  });
};

const referencesUuid = (table, tableName, notNullable = true) => {
  const definition = table
    .uuid (`${tableName}_id`)
    .unsigned ()
    .references ('id')
    .inTable (tableName)
    .onDelete ('cascade'); //on delete in any FK, deletes all refs in other tables
  //todo: should this be nnot null??

  if (notNullable) {
    definition.notNullable ();
  }
};

const referencesIncrementId = (table, tableName, notNullable = true) => {
  const definition = table
    .integer (`${tableName}_id`)
    .unsigned ()
    .references ('id')
    .inTable (tableName)
    .onDelete ('cascade'); //on delete in any FK, deletes all refs in other tables
  //todo: should this be nnot null??

  if (notNullable) {
    definition.notNullable ();
  }
};
//creates table with FK ref

//helpers
const url = (table, columnName) => {
  table.string (columnName, 2000);
};

const email = (table, columnName) => {
  return table.string (columnName, 254);
};

module.exports = {
  addDefaultColumns,
  createNameTable,
  url,
  referencesUuid,
  referencesIncrementId,
  email,
};
