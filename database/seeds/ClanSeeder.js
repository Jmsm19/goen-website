/* eslint-disable class-methods-use-this */
/*
|--------------------------------------------------------------------------
| ClanSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('../../app/Models/Clan')} */
const Clan = use('App/Models/Clan');

class ClanSeeder {
  async run() {
    await Clan.create({
      name: 'Kani',
      picture: '',
    });
    await Clan.create({
      name: 'Saru',
      picture: '',
    });
    await Clan.create({
      name: 'Kotori',
      picture: '',
    });
    await Clan.create({
      name: 'Buta',
      picture: '',
    });
    await Clan.create({
      name: 'Usagi',
      picture: '',
    });
    await Clan.create({
      name: 'Kame',
      picture: '',
    });
    await Clan.create({
      name: 'Tanuki',
      picture: '',
    });
    await Clan.create({
      name: 'Kitsune',
      picture: '',
    });
  }
}

module.exports = ClanSeeder;
