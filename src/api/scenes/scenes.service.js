 const scenes = require ('../../lib/csv/scenes');
const Scene = require('./scenes.model');

const getCsvScenes = async () => {
    return scenes;
  };

const addScene = async (data) => {
  const { timestamp, ...rest} = data
      const body = {
        ...rest, timestamp: parseInt(timestamp)
      } //convert timestamp to int
      const scene = await Scene.query ().insert (body);
      return scene
}

  module.exports = {
    getCsvScenes,
    addScene
  };
  