// import actionTypes from '../types';

const DataStateReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    // Default responses
    default:
      return { ...state, ...payload };
  }
};

export default DataStateReducer;
