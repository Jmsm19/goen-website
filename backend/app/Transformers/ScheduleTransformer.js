/* eslint-disable class-methods-use-this */
const BumblebeeTransformer = use('Bumblebee/Transformer');
const Hashids = use('Hashids');

/**
 * ScheduleTransformer class
 *
 * @class ScheduleTransformer
 * @constructor
 */
class ScheduleTransformer extends BumblebeeTransformer {
  /**
   * This method is used to transform the data.
   */
  transform(schedule) {
    return {
      id: Hashids.encode(schedule.id),
      day: schedule.day,
      from: schedule.from,
      until: schedule.until,
    };
  }
}

module.exports = ScheduleTransformer;
