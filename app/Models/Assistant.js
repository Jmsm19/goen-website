/** @type {typeof import('./User')} */
const User = use('App/Models/User');

class Assistant extends User {
  static _bootIfNotBooted() {
    if (this.name !== 'Assistant') {
      // eslint-disable-next-line no-underscore-dangle
      super._bootIfNotBooted();
    }

    this.addTrait('FindByHash');

    /**
     * Add roles() belongsToMany relationship
     */
    this.addTrait('RoleUserRelationship');

    /**
     * A hook that attaches the Assistant role
     * to the created User/Assistant
     */
    this.addHook('afterCreate', 'UserHook.attachAssistantRole');
  }

  static get table() {
    return 'users';
  }
}

module.exports = Assistant;
