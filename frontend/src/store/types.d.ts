interface ProviderProps {
  children: React.ReactNode;
}

// AUTH
interface AuthContextAction {
  type:
    | 'AUTH_GET_USER'
    | 'AUTH_LOGIN'
    | 'AUTH_LOGIN_SUCCESS'
    | 'AUTH_LOGIN_FAILED'
    | 'AUTH_REGISTER'
    | 'AUTH_REGISTER_SUCCESS'
    | 'AUTH_REGISTER_FAILED'
    | 'AUTH_LOGOUT'
    | 'REGISTER_IN_MODULE'
    | 'REGISTER_IN_MODULE_SUCCESS'
    | 'REGISTER_IN_MODULE_FAILED';
  payload?: any;
}

interface AuthContextState {
  isAuth: boolean;
  authUser: null | User;
  isLoggingIn: boolean;
  isRegistering: boolean;
  signupSuccess: boolean;
  isRegisteringInModule: boolean;
  message?: string;
}

type AuthContextDispatch = React.Dispatch<AuthContextAction>;

// PERIOD
interface PeriodContextAction {
  type:
    | 'GET_ACTIVE_PERIOD'
    | 'GET_PERIOD'
    | 'GET_ALL_PERIODS'
    | 'CREATE_PERIOD'
    | 'UPDATE_PERIOD'
    | 'DELETE_PERIOD'
    | 'AUTH_LOGIN_FAILED';
  payload?: any;
}
interface PeriodContextState {
  activePeriod: string | null;
  periods: PeriodMap;
  allPeriodsSearched: boolean;
}

type PeriodContextDispatch = React.Dispatch<PeriodContextAction>;

// USER
interface UserContextAction {
  type: 'GET_USER' | 'USER_NOT_FOUND' | 'GET_SENPAI_MODULES';
  payload?: any;
}
interface UserContextState {
  allUsersSearched: boolean;
  users: UserMap;
  notFoundUsers: string[];
}

type UserContextDispatch = React.Dispatch<UserContextAction>;

// MODULE
interface ModuleContextAction {
  type:
    | 'GET_MODULE'
    | 'MODULE_NOT_FOUND'
    | 'CREATE_MODULE'
    | 'UPDATE_MODULE'
    | 'DELETE_MODULE'
    | 'GET_MODULES_FOR_PERIOD'
    | 'GET_ALL_SCHEDULES'
    | 'GET_STUDENTS_FOR_MODULE';
  payload?: any;
}
interface ModuleContextState {
  allModulesSearched: boolean;
  modules: ModuleMap;
  notFoundModules: string[];
  searchedPeriods: string[];
  students: UserMap;
  schedules: ScheduleMap;
}

type ModuleContextDispatch = React.Dispatch<ModuleContextAction>;

// SETTING
interface SettingContextAction {
  type: 'GET_SETTINGS' | 'UPDATE_SETTINGS';
  payload?: any;
}
interface SettingContextState {
  [key: string]: any;
}

type SettingContextDispatch = React.Dispatch<SettingContextAction>;
