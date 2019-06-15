// Auth Reducer
type AuthContextReducer = (state: AuthContextState, action: AuthContextAction) => AuthContextState;

// Period Reducer
type PeriodContextReducer = (
  state: PeriodContextState,
  action: PeriodContextAction,
) => PeriodContextState;

// User Reducer
type UserContextReducer = (state: UserContextState, action: UserContextAction) => UserContextState;

// Module Reducer
type ModuleContextReducer = (
  state: ModuleContextState,
  action: ModuleContextAction,
) => ModuleContextState;

// Setting Reducer
type SettingContextReducer = (
  state: SettingContextState,
  action: SettingContextAction,
) => SettingContextState;
