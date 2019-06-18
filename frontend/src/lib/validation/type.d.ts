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

interface FormErrors {
  [fieldName: string]: string | undefined;
}
