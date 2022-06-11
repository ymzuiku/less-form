/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useRef } from "react";
import { CreateObserver, ObControl } from "react-ob";
import { firstError } from "soke";
import { updator } from "./updator";
import { isYupSchema } from "./validateYupSchema";

interface ConfigToContext<T> {
  validate?: (
    values: T,
    changeName?: string
  ) => Promise<Partial<Record<keyof T, string>>>;
  validateSchema?: any;
  // 返回新的values，以实现联动
  handleChange?: (values: T, name: string) => T;
  entryValidateAll?: boolean;
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
  entryValidateAll,
  validateSchema,
  handleChange,
}: FormObConfig<T>): FormContext<T> {
  const ref = useRef<any>(CreateObserver(initialValues));

  useEffect(() => {
    if (entryValidateAll && ref.current.validateAll) {
      ref.current.validateAll();
    }
  }, []);

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
      entryCheckAll: !!entryValidateAll,
      validateSchema,
      findFirstError: () => {
        if (!isYupSchema(ref.current.validateSchema)) {
          return firstError(ref.current.validateSchema, ref.current.errors);
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
        if (!isYupSchema(ref.current.validateSchema)) {
          const schemaKeys = Object.keys(ref.current.validateSchema);
          schemaKeys.forEach((key) => {
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
        return ref.current.findFirstError();
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
