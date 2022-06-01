/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useRef } from "react";
import { CreateObserver, ObControl } from "react-ob";
import { updator } from "./updator";

export interface FormObConfig<T> {
  initialValues: T;
  validate?: (
    values: T
  ) => Promise<Record<keyof T, string>> | Record<keyof T, string>;
  validateSchema?: any;
  initErrors?: Partial<Record<keyof T, string>>;
  entryCheckAll?: boolean;
  handleChange?: (values: T) => T;
}

export interface FormContext<T> extends ObControl<T> {
  validate?: (
    values: T
  ) => Promise<Record<keyof T, string>> | Record<keyof T, string>;
  validateSchema?: any;
  errors: Partial<Record<keyof T, string>>;
  touched: Record<keyof T, boolean>;
  entryCheckAll: boolean;
}

export type FormContextAny = FormContext<any>;

export function useForm<T>({
  initialValues,
  initErrors,
  validate,
  entryCheckAll,
  validateSchema,
}: // onSubmit,
FormObConfig<T>): FormContext<T> {
  const ref = useRef<any>(CreateObserver(initialValues));

  useEffect(() => {
    if (entryCheckAll) {
      updator(ref.current);
    }
  }, []);

  return useMemo(() => {
    const touched = {} as Record<keyof T, boolean>;
    Object.keys(initialValues).forEach((key) => {
      (touched as any)[key] = false;
    });

    ref.current = {
      ...ref.current,
      validate,
      errors: initErrors || {},
      touched,
      entryCheckAll: !!entryCheckAll,
      validateSchema,
    };

    return ref.current;
  }, []);
}
