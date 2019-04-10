/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Grade extends Model {
  module() {
    return this.belongsTo('App/Models/Module');
  }

  user() {
    return this.belongsTo('App/Models/User');
  }
}

module.exports = Grade;
