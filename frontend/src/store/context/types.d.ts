interface AuthContextValue {
  state: AuthContextState;
  dispatch: AuthContextDispatch;
}

interface PeriodContextValue {
  state: PeriodContextState;
  dispatch: PeriodContextDispatch;
}

interface UserContextValue {
  state: UserContextState;
  dispatch: UserContextDispatch;
}

interface ModuleContextValue {
  state: ModuleContextState;
  dispatch: ModuleContextDispatch;
}

interface SettingContextValue {
  settings: any;
  setSettings: React.Dispatch<React.SetStateAction<null>>;
}
