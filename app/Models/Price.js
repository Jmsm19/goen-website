/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Price extends Model {
  modules() {
    return this.hasMany('App/Models/Module');
  }
}

module.exports = Price;
