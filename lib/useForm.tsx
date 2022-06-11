/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useRef } from "react";
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
  /** 验证某参数，并且错误 */
  validateKey: (key: keyof T) => Promise<string>;
  fields: string[];
  keepValues: (keys?: string[]) => T;
  findFirstError: () => string;
}

export type FormContextAny = FormContext<any>;

export function useForm<T>({
  initialValues,
  initErrors,
  validate,
  validateSchema,
  handleChange,
}: FormObConfig<T>): FormContext<T> {
  const ref = useRef<any>(CreateObserver(initialValues));

  return useMemo(() => {
    const fields = Object.keys(initialValues);
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
      validateSchema,
      findFirstError: () => {
        const schema = ref.current.validateSchema;
        if (schema.isSoke) {
          return schema.firstError(ref.current.errors);
        }
        const fields: string[] = ref.current.fields;
        let err = "";
        fields.forEach((k) => {
          if (!err && ref.current.errors[k]) {
            err = ref.current.errors[k];
          }
        });
        return err;
      },
      validateAll: async () => {
        const schema = ref.current.validateSchema;
        if (schema.isSoke) {
          schema.schemaKeys.forEach((key: string) => {
            (ref.current.touched as any)[key] = true;
          });
        } else {
          const fields: string[] = ref.current.fields;
          fields.forEach((key) => {
            (ref.current.touched as any)[key] = true;
          });
        }
        await updator(ref.current);
        return ref.current.findFirstError();
      },
      validateKey: async (key: string) => {
        (ref.current.touched as any)[key] = true;
        await updator(ref.current, key);
        return ref.current.errors[key];
      },
      keepValues: (keys?: string[]) => {
        const fields = keys || ref.current.fields;
        const out = {} as any;
        fields.forEach((k: string) => {
          out[k] = ref.current.val[k];
        });
        return out;
      },
      handleChange,
    };

    return ref.current;
  }, []);
}
