/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Grade extends Model {
  static boot() {
    super.boot();
    this.addTrait('FindByHash');
  }

  static get hidden() {
    return ['created_at', 'updated_at'];
  }

  /**
   * Returns a BelongsTo relationship with Module
   *
   * @memberof Grade
   */
  module() {
    return this.belongsTo('App/Models/Module');
  }

  /**
   * Returns a BelongsTo relationship with User
   *
   * @memberof Grade
   */
  user() {
    return this.belongsTo('App/Models/User');
  }
}

module.exports = Grade;
