/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useRef } from "react";
import { CreateObserver, ObControl } from "react-ob";
import { updator } from "./updator";

interface ConfigToContext<T> {
  validate?: (
    values: T,
    changeName?: string
  ) => Promise<Partial<Record<keyof T, string>>>;
  validateSchema?: any;
  // 返回新的values，以实现联动
  handleChange?: (values: T, name: string) => T;
  entryCheckAll?: boolean;
}

export interface FormObConfig<T> extends ConfigToContext<T> {
  initialValues: T;
  initErrors?: Partial<Record<keyof T, string>>;
}

export interface FormContext<T> extends ObControl<T>, ConfigToContext<T> {
  errors: Partial<Record<keyof T, string>>;
  touched: Record<keyof T, boolean>;
}

export type FormContextAny = FormContext<any>;

export function useForm<T>({
  initialValues,
  initErrors,
  validate,
  entryCheckAll,
  validateSchema,
  handleChange,
}: FormObConfig<T>): FormContext<T> {
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
      handleChange,
    };

    return ref.current;
  }, []);
}
