/** @type {typeof import('./User')} */
const User = use('App/Models/User');

class Instructor extends User {
  static _bootIfNotBooted() {
    if (this.name !== 'Instructor') {
      // eslint-disable-next-line no-underscore-dangle
      super._bootIfNotBooted();
    }

    this.addTrait('FindByHash');

    /**
     * Add roles() belongsToMany relationship
     */
    this.addTrait('RoleUserRelationship');

    /**
     * A hook that attaches the Instructor role
     * to the created User/Instructor
     */
    this.addHook('afterCreate', 'UserHook.attachInstructorRole');
  }

  static get table() {
    return 'users';
  }
}

module.exports = Instructor;
