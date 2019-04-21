/** @type {typeof import('./User')} */
const User = use('App/Models/User');

class Student extends User {
  static _bootIfNotBooted() {
    if (this.name !== 'Student') {
      // eslint-disable-next-line no-underscore-dangle
      super._bootIfNotBooted();
    }

    this.addTrait('FindByHash');

    /**
     * Add roles() belongsToMany relationship
     */
    this.addTrait('RoleUserRelationship');

    /**
     * A hook that attaches the Student role
     * to the created User/Student
     */
    this.addHook('afterCreate', 'UserHook.attachStudentRole');
  }

  static get table() {
    return 'users';
  }
}

module.exports = Student;
