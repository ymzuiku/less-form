/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect } from "react";
import { useObserver } from "react-ob";
import { getin, setin } from "set-get-in";
import { SignleContext } from "./SingleContext";
import { updator } from "./updator";
import { FormContext } from "./useForm";

export type LoadType = "value" | "error";

export interface FieldContext<T> {
  name: keyof T;
  value: any;
  error: Partial<Record<keyof T, string>>[keyof T];
  onChange: (e: any) => any;
  onBlur: (e: any) => any;
}

const emptyCtx: FieldContext<any> = {
  name: "",
  value: "",
  error: "",
  onChange: (e: any) => {
    //
  },
  onBlur: (e: any) => {
    //
  },
};

export function useFieldByContext<T>(ctx: FormContext<T>, name: keyof T, loadType?: LoadType): FieldContext<T> {
  if (!ctx) {
    return emptyCtx;
  }

  // 根据 loadType 判断是监听 value 还是 error 或者两者均监听
  const ob = useObserver(ctx, (v) =>
    !loadType ? [getin(v, name), ctx.errors[name]] : loadType == "error" ? [ctx.errors[name]] : [getin(v, name)],
  );

  useEffect(() => {
    const val = getin(ob, name);
    if (val !== undefined) {
      field.onChange(val);
    }
  }, []);

  const val = getin(ob, name);
  const field = {
    name,
    value: val == undefined ? "" : val,
    error: typeof ctx.errors[name] === "undefined" ? "" : ctx.errors[name],
    onBlur: (e: any) => {
      if (e.persist) {
        e.persist();
      }
      // if (!ctx.touched[name]) {
      //   ctx.touched[name] = true;
      //   const val = getin(ob, name);
      //   field.onChange(val);
      // }
    },
    onChange: (val: any) => {
      if (!ctx.touched[name] && !val) {
        return;
      }
      if (val && !ctx.touched[name]) {
        ctx.touched[name] = true;
      }
      let typed = typeof val;
      let value;

      if (typed === "undefined") {
        value = "";
      } else if (typed === "object" && (val.currentTarget || val.target)) {
        const target = val.currentTarget || val.target;
        const type = target.type;

        if (type === "checkbox" || type === "radio") {
          value = !!target.checked;
        } else if (target.multiple) {
          const options = target.options;
          const values = [];
          for (var i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
              values.push(options[i].value);
            }
          }
          value = values;
        } else {
          value = target.value;
        }
      } else {
        value = val;
      }

      // (ctx.val as any)[name] = value;
      setin(ctx.val, name, value);
      if (ctx.handleChange) {
        ctx.val = ctx.handleChange(ctx.val, name as string);
      }

      updator(ctx, { first: true, key: name as string, typeChange: false });
    },
  };

  return field;
}

export function useField<T>(name: keyof T, loadType?: LoadType): FieldContext<T> {
  const ctx = useContext(SignleContext);
  return useFieldByContext(ctx, name, loadType);
}
