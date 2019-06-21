declare module 'react-detect-offline';
declare module 'workbox-build';
declare module 'uuid/v4';

type Callbacks = Function | Function[];

interface ObjectWithId {
  id: string;
  [key: string]: any;
}

type RoleNames = 'admin' | 'instructor' | 'assistant' | 'student';
type ClanNames = 'Kani' | 'Saru' | 'Buta' | 'Tori' | 'Usagi' | 'Kame' | 'Kitsune' | 'Tanuki';
type DayNames = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

interface Clan {
  id: string;
  name: ClanNames;
}

interface Price {
  id: string;
  amount: number;
}

interface Grade {
  id: string;
  score: number;
  moduleId: string;
}

interface Schedule {
  id: string;
  day: string;
  from: string;
  until: string;
}

interface Period {
  id: string;
  name: string;
  year: string;
  active: boolean;
  signupFrom: string;
  signupUntil: string;
}

interface Module {
  id: string;
  name: string;
  fullName: string;
  section: string;
  period: Period;
  clan?: Clan;
  schedule: Schedule;
  availableSlots: number;
  instructor?: User;
  assistant?: User;
  price: Price;
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
  registrationStatus: 'idle' | 'paying' | 'verifying payment' | 'registered' | string;
  grades?: Grade[];
  modulesAsInstructor?: Module[];
  modulesAsAssistant?: Module[];
}

interface Senpai {
  id: string;
  name: string;
  email: string;
  modulesAsInstructor?: Module[];
  modulesAsAssistant?: Module[];
}

interface Student {
  id: string;
  name: string;
  email: string;
  registrationStatus: 'idle' | 'paying' | 'verifying payment' | 'registered' | string;
  grades?: Grade[];
}

interface Schedule {
  id: string;
  day: DayNames;
  from: string;
  until: string;
}

type PeriodMap = Map<string, Period>;
type ModuleMap = Map<string, Module>;
type UserMap = Map<string, User>;
type StudentMap = Map<string, User[]>;
type ScheduleMap = Map<string, Schedule>;
