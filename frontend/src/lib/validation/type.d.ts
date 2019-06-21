interface LoginFormValues {
  email: string;
  password: string;
}

interface RegisterFormValues {
  name: string;
  nationalId: string;
  birthDate: Date;
  phoneNumber: string;
  email: string;
  password: string;
  password_confirmation: string;
  roleName: RoleNames;
}

interface ModuleFormValues {
  name: string;
  section: string;
  schedule_id: string;
  assistant_id: string;
  instructor_id: string;
  clan?: ClanNames;
}

interface CreatePeriodFormValues {
  signup_from: string;
  signup_until: string;
}

interface UpdatePeriodFormValues extends CreatePeriodFormValues {
  year: string;
  name: string;
}

interface FormErrors {
  [fieldName: string]: string | undefined;
}
