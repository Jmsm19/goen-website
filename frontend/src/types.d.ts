declare module 'react-detect-offline';
declare module 'workbox-build';
declare module 'uuid/v4';

type Callbacks = Function | Function[];

interface ObjectWithId {
  id: string;
  [key: string]: any;
}

type RoleNames = 'admin' | 'instructor' | 'assistant' | 'student';

interface Period {
  id: string;
  name: string;
  year: string;
}

interface Module {
  id: string;
  name: string;
  section: string;
  period: Period;
}

interface User {
  id: string;
  name: string;
  nationalId: string;
  phoneNumber: string;
  email: string;
  birthDate: string;
  isAdmin: boolean;
  isInstructor: boolean;
  isAssistant: boolean;
  isStudent: boolean;
  modulesAsInstructor?: ModuleMap;
  modulesAsAssistant?: ModuleMap;
}

interface Schedule {
  id: string;
  day: string;
  from: string;
  until: string;
}

type PeriodMap = Map<string, Period>;
type ModuleMap = Map<string, Module>;
type UserMap = Map<string, User>;
type ScheduleMap = Map<string, Schedule>;
