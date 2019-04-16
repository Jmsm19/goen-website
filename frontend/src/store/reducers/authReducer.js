import actionTypes from '../types';

const AuthStateReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    // User Login
    case actionTypes.AUTH_LOGIN_SUCCESS:
      return { ...state, isAuth: true };
    case actionTypes.AUTH_LOGIN_FAILED:
      return { ...state, isAuth: false };

    // User Register
    case actionTypes.AUTH_REGISTER_SUCCESS:
      return { ...state, signupSuccess: true, ...payload };
    case actionTypes.AUTH_REGISTER_FAILED:
      return { ...state, signupSuccess: false };

    // User Logout
    case actionTypes.AUTH_LOGOUT:
      return { ...state, isAuth: false, authUser: null };

    // Default responses
    default:
      return { ...state, ...payload };
  }
};

export default AuthStateReducer;
