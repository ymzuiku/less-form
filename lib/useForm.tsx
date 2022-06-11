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
  entryValidateAll?: boolean;
  validateFirst?: boolean;
}

export interface FormObConfig<T> extends ConfigToContext<T> {
  initialValues: T;
  initErrors?: Partial<Record<keyof T, string>>;
}

export interface FormContext<T> extends ObControl<T>, ConfigToContext<T> {
  errors: Partial<Record<keyof T, string>>;
  touched: Record<keyof T, boolean>;
  /** 验证所有参数，并且返回遇到的第一个错误 */
  validateAll: () => Promise<string>;
  fields: Set<string>;
  contentValues: () => T;
}

export type FormContextAny = FormContext<any>;

export function useForm<T>({
  initialValues,
  initErrors,
  validate,
  entryValidateAll,
  validateSchema,
  handleChange,
}: FormObConfig<T>): FormContext<T> {
  const ref = useRef<any>(CreateObserver(initialValues));

  useEffect(() => {
    if (entryValidateAll) {
      updator(ref.current);
    }
  }, []);

  return useMemo(() => {
    const fields = new Set(Object.keys(initialValues));
    const touched = {} as Record<keyof T, boolean>;
    fields.forEach((key) => {
      (touched as any)[key] = false;
    });

    ref.current = {
      ...ref.current,
      validate,
      errors: initErrors || {},
      fields,
      touched,
      entryCheckAll: !!entryValidateAll,
      validateSchema,
      validateFirst: false,
      validateAll: async () => {
        const fields: Set<string> = ref.current.fields;
        fields.forEach((key) => {
          (ref.current.touched as any)[key] = true;
        });
        await updator(ref.current);
        let err = "";
        fields.forEach((k) => {
          if (!err && ref.current.errors[k]) {
            err = ref.current.errors[k];
          }
        });
        return err;
      },
      contentValues: () => {
        const fields: Set<string> = ref.current.fields;
        const out = {} as any;
        fields.forEach((k) => {
          out[k] = ref.current.val[k];
        });
        return out;
      },
      handleChange,
    };

    return ref.current;
  }, []);
}
