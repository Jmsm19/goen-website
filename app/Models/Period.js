/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Period extends Model {
  static boot() {
    super.boot();
    this.addTrait('FindByHash');
  }

  static get hidden() {
    return ['created_at', 'updated_at'];
  }

  /**
   * Returns a HasMany relationship with Module
   *
   * @memberof Period
   */
  modules() {
    return this.hasMany('App/Models/Module');
  }

  /**
   * Makes period instance the currently active period.
   * Any other period is marked as active: false
   *
   * @memberof Period
   */
  async makeCurrent() {
    await Period.query()
      .where('active', 1)
      .update({ active: false });

    this.active = true;
    this.save();
  }
}

module.exports = Period;
