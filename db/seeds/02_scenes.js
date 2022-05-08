const Knex = require ('knex');

const tableNames = require ('../../src/constants/tableNames');

const scenes = require ('../../src/lib/csv/scenes');
/**
 * 
 * @param {Knex} knex 
 */

exports.seed = async knex => {
  const rowdyRef = await knex (tableNames.sampler)
    .where ({name: 'Rowdy'})
    .first ();

  await knex (tableNames.scene).insert (
    scenes.map (
      scene =>
        scene.timestamp
          ? {
              ...scene,
              timestamp: parseInt (scene.timestamp),
              sampler_id: rowdyRef.id,
            }
          : null
    ),
    '*'
  );

  // await knex (tableNames.scene).insert ({
  //   timestamp: 30,
  //   tricks: '540 tdraiz cork',
  //   sampler_id: rowdyRef.id,
  // });
};
