/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Module extends Model {
  period() {
    return this.belongsTo('App/Models/Period');
  }

  grades() {
    return this.hasMany('App/Models/Grade');
  }

  schedule() {
    return this.belongsTo('App/Models/Schedule');
  }

  price() {
    return this.belongsTo('App/Models/Price');
  }

  clan() {
    return this.belongsTo('App/Models/Clan');
  }
}

module.exports = Module;
