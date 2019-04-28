import actionTypes from '../types';

const DataStateReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.GET_MODULE:
      return {
        ...state,
        modules: {
          ...state.modules,
          [payload.module.id]: payload.module,
        },
      };
    case actionTypes.MODULE_NOT_FOUND:
      return {
        ...state,
        modules: {
          ...state.modules,
          notFound: [
            state.modules && state.modules.notFound && [...state.modules.notFound],
            payload.id,
          ].filter(el => !!el),
        },
      };
    // Default responses
    default:
      return { ...state, ...payload };
  }
};

export default DataStateReducer;
