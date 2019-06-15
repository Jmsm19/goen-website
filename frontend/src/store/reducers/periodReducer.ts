const PeriodReducer: PeriodContextReducer = (state, action) => {
  const { type, payload } = action;
  const { periods } = state;

  switch (type) {
    case 'GET_ACTIVE_PERIOD':
      return {
        ...state,
        activePeriod: payload.activePeriod,
        periods: new Map([...periods, ...payload.periods]),
      };
    case 'GET_ALL_PERIODS':
      return {
        ...state,
        periods: new Map([...periods, ...payload.periods]),
        allPeriodsSearched: payload.allPeriodsSearched,
      };
    case 'GET_PERIOD':
      return {
        ...state,
        periods: new Map([...periods, ...payload.period]),
      };
    case 'CREATE_PERIOD':
    case 'UPDATE_PERIOD':
      return {
        ...state,
        periods: new Map([...periods, ...payload.period]),
      };
    case 'DELETE_PERIOD':
      periods.delete(payload.periodId);
      return { ...state, periods: new Map([...periods]) };
    // Default responses
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export default PeriodReducer;
