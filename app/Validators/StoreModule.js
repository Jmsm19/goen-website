/* eslint-disable class-methods-use-this */
const Config = use('Config');

class StoreModule {
  get validateAll() {
    return true;
  }

  get rules() {
    const sectionLetters = Config.get('constants.sectionLetters');

    return {
      name: 'required|string',
      clan_id: 'required_when:name,M-0|exists:clans,id',
      period_id: 'required|exists:periods,id',
      section: `required|string|in:${sectionLetters}`,
      schedule_id: 'required|exists:schedules,id',
      assistant_id: 'required|string|has_role:assistant',
      instructor_id: 'required|has_role:instructor',
    };
  }
}

module.exports = StoreModule;
