const bcrypt = require ('bcrypt');
const crypto = require ('crypto');
const Knex = require ('knex');
const tableNames = require ('../../src/constants/tableNames');

/**
 * 
 * @param {Knex} knex 
 */

exports.seed = async knex => {
  // await Promise.all(
  //   orderedTableNames.map(table_name => knex(table_name).del()),
  // )
  // await orderedTableNames.reduce (async (promise, table_name) => {
  //   await promise;
  //   console.log ('Clearing', table_name);
  //   return knex (table_name).del ();
  // }, Promise.resolve ());

  //runs one action at a time and waits for the previous action to finish running before  running the next one

  await Promise.all (Object.keys (tableNames).map (name => knex (name).del ()));

  // const password = 'Raizcheat12!'

  const password = crypto.randomBytes (15).toString ('hex') + 'Snapu12!';
  // const hashedPassword = await bcrypt.hash (password, 12);


  const user = {
    email: 'tivotrix@gmail.com',
    name: 'TiVo',
    password: await bcrypt.hash (password, 12),
  };

  const [createdUser] = await knex (tableNames.user)
    .insert (user)
    .returning ('*');

  console.log (
    'User created:',
    {
      password,
    },
    createdUser
  );
};
