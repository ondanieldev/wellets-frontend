/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { MutableRefObject } from 'react';
import { FormHandles } from '@unform/core';
import { ValidationError as YupValidationError } from 'yup';
import { toast } from 'react-toastify';

interface Errors {
  [key: string]: string;
}

export function getValidationErrors(err: YupValidationError): Errors {
  const errors: Errors = {};

  err.inner.forEach(error => {
    if (!error.path) return;
    errors[error.path] = error.message;
  });

  return errors;
}

export default function handleErrors(
  err: any,
  formRef?: MutableRefObject<FormHandles | null>,
): void {
  if (err instanceof YupValidationError && formRef) {
    const errors = getValidationErrors(err);
    formRef.current?.setErrors(errors);
    return;
  }
  if (err.response) {
    const e = err.response.data;
    let message = '';
    if (e.validation) {
      const celebrate = e.validation;
      if (celebrate.body) message = celebrate.body.message;
      else if (celebrate.query) message = celebrate.query.message;
      else if (celebrate.params) message = celebrate.params.message;
    }
    toast.error(message || e.message || e);
  } else {
    toast.error('An unexpected error has ocurred');
  }
}
