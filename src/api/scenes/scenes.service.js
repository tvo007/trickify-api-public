const scenes = require ('../../lib/csv/scenes');
const Scene = require ('./scenes.model');

const getCsvScenes = async () => {
  return scenes;
};

const addScene = async data => {
  const {timestamp, ...rest} = data;
  const body = {
    ...rest,
    timestamp: parseInt (timestamp),
  }; //convert timestamp to int
  const scene = await Scene.query ().insert (body);
  return scene;
};

const searchScenes = async data => {
  const scenes = await Scene.query ()
    .where ({
      deleted_at: null,
    })
    .andWhere ('tricks', 'like', `%${data.tricks}%`);

  if (scenes) return scenes;
  else return {message: 'No tricks match the scene.'};
};

module.exports = {
  getCsvScenes,
  addScene,
  searchScenes,
};
