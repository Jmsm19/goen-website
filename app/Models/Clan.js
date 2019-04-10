/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Clan extends Model {
  /**
   * Returns a hasMany relationship with User Model
   *
   * @method users
   *
   * @return {Object}
   */
  users() {
    return this.hasMany('App/Models/User');
  }
}

module.exports = Clan;
