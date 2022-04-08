const {Model} = require('objection');
const tableNames = require('../../constants/tableNames');
const schema = require('./scenes.schema.json')
const { table } = require('../../db');

// User model.
class Scene extends Model {
    static get tableName() {
      return tableNames.scene;
    }
    static get jsonSchema() {
      return schema
    }
  }

  module.exports = Scene;
