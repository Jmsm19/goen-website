/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Role extends Model {
  static get hidden() {
    return ['created_at', 'updated_at'];
  }

  /**
   * Returns a BelongsToMany relationship wih User
   *
   * @memberof Role
   */
  users() {
    return this.belongsToMany('App/Models/User').withTimestamps();
  }
}

module.exports = Role;
