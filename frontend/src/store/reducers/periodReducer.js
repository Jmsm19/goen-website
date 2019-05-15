import actionTypes from '../types';

const PeriodReducer = (state, action) => {
  const { type, payload } = action;
  const { periods } = state;

  switch (type) {
    case actionTypes.GET_ACTIVE_PERIOD:
      return {
        activePeriod: payload.activePeriod,
        periods: new Map([...periods, ...payload.periods]),
      };
    case actionTypes.GET_ALL_PERIODS:
      return {
        ...state,
        periods: new Map([...periods, ...payload.periods]),
        allPeriodsSearched: payload.allPeriodsSearched,
      };
    case actionTypes.GET_PERIOD:
      return {
        ...state,
        periods: new Map([...periods, ...payload.period]),
      };
    case actionTypes.CREATE_PERIOD:
    case actionTypes.UPDATE_PERIOD:
      return {
        ...state,
        periods: new Map([...periods, ...payload.period]),
      };
    case actionTypes.DELETE_PERIOD:
      periods.delete(payload.periodId);
      return { ...state, periods: new Map([...periods]) };
    // Default responses
    default:
      throw new Error(`Unsupported action type: ${action.type}`);
  }
};

export default PeriodReducer;
