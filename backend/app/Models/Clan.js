/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Clan extends Model {
  static boot() {
    super.boot();
    this.addTrait('FindByHash');
  }

  static get hidden() {
    return ['created_at', 'updated_at'];
  }

  /**
   * Returns a HasMany relationship with User Model
   *
   * @method User
   */
  users() {
    return this.hasMany('App/Models/User');
  }
}

module.exports = Clan;
