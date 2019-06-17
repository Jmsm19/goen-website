import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const useForm = (
  callback: Function = () => undefined,
  validate: Function = () => ({}),
  initialValues: FormValues = {},
): UseFormResult => {
  const { t } = useTranslation();

  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submittedOnce, setSubmittedOnce] = useState<boolean>(false);

  console.log('TCL: Object.keys(errors).length === 0', Object.keys(errors).length === 0);
  console.log('TCL: isSubmitting', isSubmitting);
  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      console.log('TCL: values', values);
      callback(values);
      setIsSubmitting(false);
    }
  }, [callback, errors, isSubmitting, values]);

  useEffect(() => {
    if (submittedOnce) {
      setErrors(validate(values, t));
    }
  }, [submittedOnce, t, validate, values]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (event) event.preventDefault();
    setErrors(validate(values, t));
    setSubmittedOnce(true);
    setIsSubmitting(true);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();
    const { target } = event;

    if (target) {
      setValues(v => ({ ...v, [target.name]: target.value }));
    }
  };

  return {
    handleChange,
    handleSubmit,
    values,
    errors,
  };
};

export default useForm;
