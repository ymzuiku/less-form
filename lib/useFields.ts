/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext } from "react";
import { useObserver } from "react-ob";
import { SignleContext } from "./SingleContext";
import { FormContext } from "./useForm";

type LoadType = "value" | "error";

interface FieldsContext<T> {
  names: string[];
  values: T;
  errors: Record<keyof T, string>;
  onChange: (name: keyof T, value: any) => void;
  // 只保留 initValue 时有key的属性
  contentValues: () => T;
}

const emptyCtxs: FieldsContext<any> = {
  names: [],
  values: {},
  errors: {},
  onChange: (name, value) => {},
  contentValues: () => {},
};

export function useFieldsByContext<T>(
  ctx: FormContext<T>,
  names: string[],
  loadType?: LoadType
): FieldsContext<T> {
  if (!ctx) {
    return emptyCtxs;
  }

  useObserver(ctx, (v: any) => {
    const out = [] as any;
    if (!loadType) {
      names.forEach((name) => {
        out.push(v[name]);
        out.push((ctx.errors as any)[name]);
      });
      return out;
    } else if (loadType == "error") {
      names.forEach((name) => {
        out.push((ctx.errors as any)[name]);
      });
      return out;
    } else {
      names.forEach((name) => {
        out.push(v[name]);
      });
      return out;
    }
  });

  const values = {} as any;
  const errors = {} as any;
  names.forEach((name) => {
    values[name] = (ctx.val as any)[name];
    errors[name] = ((ctx.errors as any)[name] || "") as any;
  });

  return {
    names,
    values,
    errors,
    onChange: (name: keyof T, value: any) => {
      ctx.val[name] = value;
      ctx.next();
    },
    contentValues: ctx.contentValues,
  };
}
/** 监听多个 fields */
export function useFields<T extends Record<string, unknown>, K>(
  names: string[],
  loadType?: LoadType
): FieldsContext<T> {
  const ctx = useContext(SignleContext);
  return useFieldsByContext(ctx, names, loadType);
}
