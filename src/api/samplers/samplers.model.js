const {Model} = require('objection');
const tableNames = require('../../constants/tableNames');
const schema = require('./samplers.schema.json')
const { table } = require('../../db');

// User model.
class Sampler extends Model {
    static get tableName() {
      return tableNames.sampler;
    }
    static get jsonSchema() {
      return schema
    }

    $beforeInsert () {
      this.created_at = new Date ().toISOString ();
    }
  
    $beforeUpdate () {
      this.updated_at = new Date ().toISOString ();
    }
  }

  module.exports = Sampler;
