const AuthStateReducer: AuthContextReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'AUTH_GET_USER':
      return { ...state, authUser: { ...payload.user } };

    // User Login
    case 'AUTH_LOGIN':
      return { ...state, isLoggingIn: true };
    case 'AUTH_LOGIN_SUCCESS':
      return { ...state, isAuth: true, isLoggingIn: false };
    case 'AUTH_LOGIN_FAILED':
      return { ...state, isAuth: false, isLoggingIn: false };

    // User Register
    case 'AUTH_REGISTER':
      return { ...state, isRegistering: true };
    case 'AUTH_REGISTER_SUCCESS':
      return { ...state, signupSuccess: true, isRegistering: false, message: payload.message };
    case 'AUTH_REGISTER_FAILED':
      return { ...state, signupSuccess: false, isRegistering: false };

    // User Logout
    case 'AUTH_LOGOUT':
      return { ...state, isAuth: false, authUser: null };

    // Module register
    case 'REGISTER_IN_MODULE':
      return { ...state, isRegisteringInModule: true };
    case 'REGISTER_IN_MODULE_SUCCESS':
      return {
        ...state,
        isRegisteringInModule: false,
        authUser: {
          ...state.authUser,
          registrationStatus: 'paying',
        },
      };
    case 'REGISTER_IN_MODULE_FAILED':
      return { ...state, isRegisteringInModule: false };

    // Default responses
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export default AuthStateReducer;
