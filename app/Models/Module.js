/* eslint-disable class-methods-use-this */
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

const Config = use('Config');

class Module extends Model {
  static boot() {
    super.boot();
    this.addTrait('FindByHash');
  }

  static get hidden() {
    return ['created_at', 'updated_at'];
  }

  /**
   * Returns a BelongsTo relationship with Period
   *
   * @memberof Module
   */
  period() {
    return this.belongsTo('App/Models/Period');
  }

  /**
   * Returns a HasMany relationship with Grade
   *
   * @memberof Module
   */
  grades() {
    return this.hasMany('App/Models/Grade');
  }

  /**
   * Returns a BelongsTo relationship with Schedule
   *
   * @memberof Module
   */
  schedule() {
    return this.belongsTo('App/Models/Schedule');
  }

  /**
   * Returns a BelongsTo relationship with Price
   *
   * @memberof Module
   */
  price() {
    return this.belongsTo('App/Models/Price');
  }

  /**
   * Returns a BelongsTo relationship with Clan
   *
   * @memberof Module
   */
  clan() {
    return this.belongsTo('App/Models/Clan');
  }

  /**
   * Returns a BelongsTo relationship with User/Instructor
   *
   * @memberof Module
   */
  instructor() {
    return this.belongsTo('App/Models/User', 'instructor_id');
  }

  /**
   * Returns a BelongsTo relationship with User/Assistant
   *
   * @memberof Module
   */
  assistant() {
    return this.belongsTo('App/Models/User', 'assistant_id');
  }

  /**
   * Returns a BelongsToMany relationship with User/Student
   *
   * @memberof Module
   */
  students() {
    return this.belongsToMany('App/Models/User', 'module_id', 'student_id')
      .pivotTable('module_students')
      .withPivot(['status']);
  }

  async hasSpace() {
    const studentCount = await this.students().getCount();
    return Config.get('constants.maxStudentsPerModule') - studentCount > 0;
  }
}

module.exports = Module;
