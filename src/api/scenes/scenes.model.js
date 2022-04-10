const {Model} = require ('objection');
const tableNames = require ('../../constants/tableNames');
const schema = require ('./scenes.schema.json');
const {table} = require ('../../db');

// User model.
class Scene extends Model {
  static get tableName () {
    return tableNames.scene;
  }
  static get jsonSchema () {
    return schema;
  }

  $beforeInsert () {
    this.created_at = new Date ().toISOString ();
  }

  $beforeUpdate () {
    this.updated_at = new Date ().toISOString ();
  }

  static get relationMappings () {
    const Sampler = require ('../samplers/samplers.model');

    return {
      //product<- product info
      //one way, product does not show product info
      sampler: {
        relation: Model.HasOneRelation,
        modelClass: Sampler,
        join: {
          from: `${tableNames.sampler}.id`,
          to: `${tableNames.scene}.sampler_id`,
        },
      },
    };
  }

  
}

module.exports = Scene;
