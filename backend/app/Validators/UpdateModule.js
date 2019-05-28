/* eslint-disable class-methods-use-this */

class UpdateModule {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      name: 'string',
      clan: 'required_when:name,M-0|string',
      schedule_id: 'exists:schedules,id',
      assistant_id: 'string|has_role:assistant',
      instructor_id: 'has_role:instructor',
    };
  }
}

module.exports = UpdateModule;
