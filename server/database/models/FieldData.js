const {Model} = require('objection');
const Field = require('./Field')
const knex = require('../config/database')

Model.knex(knex);

module.exports = class FieldData extends Model {
    static get tableName() {
        return 'field_data';
    }

    static relationMappings = {
        field: {
          relation: Model.HasOneRelation,
          modelClass: Field,
          join: {
            from: 'field_data.field_id',
            to: 'fields.id'
          }
        }
      };
};
