/* eslint-disable class-methods-use-this */
/* eslint-disable no-param-reassign */

class RoleUserRelationship {
  register(Model) {
    function roles() {
      return this.belongsToMany('App/Models/Role', 'user_id', 'role_id')
        .withTimestamps()
        .pivotTable('role_user');
    }

    Model.prototype.roles = roles;
  }
}

module.exports = RoleUserRelationship;
