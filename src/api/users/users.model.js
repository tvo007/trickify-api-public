const {Model} = require('objection');
const tableNames = require('../../constants/tableNames');
const schema = require('./users.schema.json')
const { table } = require('../../db');

// User model.
class User extends Model {
    static get tableName() {
      return tableNames.user;
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

  module.exports = User;
