/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Schedule extends Model {
  static boot() {
    super.boot();
    this.addTrait('FindByHash');
  }

  static get hidden() {
    return ['created_at', 'updated_at'];
  }

  /**
   * Returns a HasMany relationship with Module
   *
   * @memberof Schedule
   */
  modules() {
    return this.hasMany('App/Models/Module');
  }
}

module.exports = Schedule;
