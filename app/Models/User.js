/* eslint-disable class-methods-use-this */
/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class User extends Model {
  static boot() {
    super.boot();
    this.addTrait('FindByHash');

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook('beforeSave', async userInstance => {
      if (userInstance.dirty.password) {
        // eslint-disable-next-line no-param-reassign
        userInstance.password = await Hash.make(userInstance.password);
      }
    });
  }

  static get hidden() {
    return ['password', 'remember_token', 'activation_token', 'created_at', 'updated_at'];
  }

  static get dates() {
    return super.dates.concat(['birth_date', 'email_verified_at']);
  }

  static scopeHasStudentRole(query) {
    return query()
      .whereHas('role', builder => {
        builder.where('name', 'student');
      })
      .fetch();
  }

  static scopeHasInstructorRole(query) {
    return query()
      .whereHas('role', builder => {
        builder.where('name', 'instructor');
      })
      .fetch();
  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens() {
    return this.hasMany('App/Models/Token');
  }

  /**
   * Returns a BelongsToMany relationship with the Role model
   *
   * @memberof User
   * @method roles
   */
  roles() {
    return this.belongsToMany('App/Models/Role').withTimestamps();
  }

  /**
   * Checks if the User has certain Role from an array of roles
   *
   * @param {Array} roleNames
   * @returns {Boolean}
   * @memberof User
   * @method hasAnyRole
   */
  async hasAnyRole(roleNames) {
    for (let i = 0; i < roleNames.length; i += 1) {
      const roleName = roleNames[i];
      // eslint-disable-next-line no-await-in-loop
      const hasRole = await this.hasRole(roleName);
      if (hasRole) {
        return true;
      }
    }

    return false;
  }

  /**
   * Checks if the User has a given Role
   *
   * @param {String} roleName
   * @returns {Boolean}
   * @memberof User
   * @method hasRole
   */
  async hasRole(roleName) {
    const role = await this.roles()
      .where('name', roleName)
      .first();

    if (role) {
      return true;
    }
    return false;
  }

  /**
   * Checks if the User has the Admin role
   *
   * @returns {Boolean}
   * @memberof User
   * @method isAdmin
   */
  async isAdmin() {
    return await this.hasRole('admin');
  }

  /**
   * Checks if the User has the Instructor role
   *
   * @returns {Boolean}
   * @memberof User
   * @method isInstructor
   */
  async isInstructor() {
    return await this.hasRole('instructor');
  }

  /**
   * Checks if the User has the Assistant role
   *
   * @returns {Boolean}
   * @memberof User
   * @method isAssistant
   */
  async isAssistant() {
    return await this.hasRole('assistant');
  }

  /**
   * Checks if the User has the Student role
   *
   * @returns {Boolean}
   * @memberof User
   * @method isStudent
   */
  async isStudent() {
    return await this.hasRole('student');
  }

  /**
   * Returns a BelongsTo relationship with the Clan model
   *
   * @memberof User
   * @method clan
   */
  clan() {
    return this.belongsTo('App/Clan');
  }

  /**
   * Checks if the User belongs to a Clan
   *
   * @returns {Boolean}
   * @memberof User
   * @method hasClan
   */
  hasClan() {
    return !!this.clan_id;
  }

  /**
   * Returns a HasMany relationship with the Grade model
   *
   * @memberof User
   * @method grades
   */
  grades() {
    return this.hasMany('App/Models/Grade');
  }

  // ==========================================================
  // AS STUDENT MODEL
  // ===========================================================

  /**
   * Returns a BelongsToMany relationship with the Module model
   *
   * @memberof User
   * @method modulesAsStudent
   */
  modulesAsStudent() {
    return this.belongsToMany('App/Models/Module', 'student_id', 'module_id')
      .pivotModel('App/Models/ModuleStudent')
      .withPivot(['status']);
  }

  async isStudentIn(moduleId) {
    const module = await this.modulesAsStudent()
      .where({ module_id: moduleId })
      .first();

    if (module) {
      return true;
    }

    return false;
  }

  async isNotStudentIn(moduleId) {
    return await !this.isStudentIn(moduleId);
  }

  async removeFrom(moduleId) {
    this.setRegistrationStatus('idle');
    return await this.modulesAsStudent().detach([moduleId]);
  }

  async updateModuleStudentStatus(moduleId, status) {
    await this.modulesAsStudent()
      .pivotQuery()
      .where({ module_id: moduleId })
      .update({ status });
  }

  // ==========================================================
  // AS INSTRUCTOR MODEL
  // ===========================================================

  /**
   * Returns a HasMany relationship with the Module model
   *
   * @memberof User
   * @method modulesAsInstructor
   */
  modulesAsInstructor() {
    return this.hasMany('App/Models/Module', 'id', 'instructor_id');
  }
}

module.exports = User;
