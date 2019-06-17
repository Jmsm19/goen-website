interface UseFormResult {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  values: FormValues;
  errors: FormErrors;
}

interface FormValues {
  [key: string]: string | number | undefined;
}

interface FormErrors {
  [key: string]: string | undefined;
}
