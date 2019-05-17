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
      clan: 'required_when:name,M-0|string',
      period_id: 'required|exists:periods,id',
      section: `required|string|in:${sectionLetters}`,
      schedule_id: 'required|exists:schedules,id',
      assistant_id: 'required|string|has_role:assistant',
      instructor_id: 'required|has_role:instructor',
    };
  }
}

module.exports = StoreModule;
