// Auth Actions
interface AuthHelper {
  dispatch: AuthContextDispatch;
  [key: string]: any;
}

type LoginUser = (loginData: any, helper: AuthHelper) => Promise<void>;
type RegisterUser = (userData: any) => Promise<void>;
type LogoutUser = (helper: AuthHelper) => Promise<void>;
type GetAuthUser = (helper: AuthHelper) => Promise<void>;
type RegisterInModule = (id: string, helper: AuthHelper) => Promise<void>;

// Period Actions
interface PeriodHelper {
  dispatch: PeriodContextDispatch;
  [key: string]: any;
}

type GetActivePeriod = (dispatch: PeriodContextDispatch) => Promise<void>;
type GetPeriod = (id: string, helper: PeriodHelper) => Promise<void>;
type GetAllPeriods = (arg: PeriodHelper) => Promise<void>;
type CreatePeriod = (periodData: any, helper: PeriodHelper, cb: Function) => Promise<void>;
type UpdatePeriod = (
  id: string,
  periodData: any,
  helper: PeriodHelper,
  cb: Function,
) => Promise<void>;
type DeletePeriod = (id: string, helper: PeriodHelper) => Promise<void>;

// Module Actions
interface ModuleHelper {
  dispatch: ModuleContextDispatch;
  [key: string]: any;
}

type GetModule = (id: string, dispatch: ModuleContextDispatch) => Promise<void>;
type GetAllModules = (dispatch: ModuleContextDispatch) => Promise<void>;
type CreateModule = (moduleData: any, helper: ModuleHelper, cb: Callbacks) => Promise<void>;
type GetAllSchedules = (helper: ModuleHelper) => Promise<void>;
type UpdateModule = (
  id: string,
  moduleData: any,
  helper: ModuleHelper,
  cb: Callbacks,
) => Promise<void>;
type DeleteModule = (id: string, helper: ModuleHelper, cb: Callbacks) => Promise<void>;
type GetModulesForPeriod = (id: string, helper: ModuleHelper) => Promise<void>;
type GetStudentsForModule = (id: string, helper: ModuleHelper) => Promise<void>;

// User Actions
// type UserHelper = { dispatch: UserContextDispatch, [key: string]: any }

type GetUser = (id: string, dispatch: UserContextDispatch) => Promise<void>;
type GetAllUsers = (dispatch: UserContextDispatch) => Promise<void>;
type GetSenpaiModules = (role: string, id: string, dispatch: UserContextDispatch) => Promise<void>;
