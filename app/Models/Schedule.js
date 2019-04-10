/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Schedule extends Model {
  modules() {
    return this.hasMany('App/Models/Module');
  }
}

module.exports = Schedule;
