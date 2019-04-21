/** @type {typeof import('./User')} */
const User = use('App/Models/User');

class Admin extends User {
  static _bootIfNotBooted() {
    if (this.name !== 'Admin') {
      // eslint-disable-next-line no-underscore-dangle
      super._bootIfNotBooted();
    }

    this.addTrait('FindByHash');

    /**
     * Add roles() belongsToMany relationship
     */
    this.addTrait('RoleUserRelationship');

    /**
     * A hook that attaches the Admin role
     * to the created User/Admin
     */
    this.addHook('afterCreate', 'UserHook.attachAdminRole');
  }

  static get table() {
    return 'users';
  }
}

module.exports = Admin;
