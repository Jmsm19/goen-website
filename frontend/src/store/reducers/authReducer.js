import actionTypes from '../types';

const AuthStateReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.AUTH_GET_USER:
      return { ...state, authUser: { ...payload.user } };

    // User Login
    case actionTypes.AUTH_LOGIN:
      return { ...state, isLoggingIn: true };
    case actionTypes.AUTH_LOGIN_SUCCESS:
      return { ...state, isAuth: true, isLoggingIn: false };
    case actionTypes.AUTH_LOGIN_FAILED:
      return { ...state, isAuth: false, isLoggingIn: false };

    // User Register
    case actionTypes.AUTH_REGISTER:
      return { ...state, isRegistering: true };
    case actionTypes.AUTH_REGISTER_SUCCESS:
      return { ...state, signupSuccess: true, isRegistering: false, message: payload.message };
    case actionTypes.AUTH_REGISTER_FAILED:
      return { ...state, signupSuccess: false, isRegistering: false };

    // User Logout
    case actionTypes.AUTH_LOGOUT:
      return { ...state, isAuth: false, authUser: null };

    // Module register
    case actionTypes.REGISTER_IN_MODULE:
      return { ...state, isRegisteringInModule: true };
    case actionTypes.REGISTER_IN_MODULE_SUCCESS:
      return {
        ...state,
        isRegisteringInModule: false,
        authUser: {
          ...state.authUser,
          registrationStatus: 'paying',
        },
      };
    case actionTypes.REGISTER_IN_MODULE_FAILED:
      return { ...state, isRegisteringInModule: false };

    // Default responses
    default:
      throw new Error(`Unsupported action type: ${action.type}`);
  }
};

export default AuthStateReducer;
