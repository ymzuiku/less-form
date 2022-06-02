/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect } from "react";
import { useObserver } from "react-ob";
import { SignleContext } from "./SingleContext";
import { updator } from "./updator";
import { FormContext } from "./useForm";

type LoadType = "value" | "error";

interface FieldContext<T> {
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

export function useFieldByContext<T>(
  ctx: FormContext<T>,
  name: keyof T,
  loadType?: LoadType
): FieldContext<T> {
  if (!ctx) {
    return emptyCtx;
  }

  // 根据 loadType 判断是监听 value 还是 error 或者两者均监听
  const ob = useObserver(ctx, (v) =>
    !loadType
      ? [v[name], ctx.errors[name]]
      : loadType == "error"
      ? [ctx.errors[name]]
      : [v[name]]
  );

  useEffect(() => {
    if (ctx.val[name]) {
      field.onChange(ctx.val[name]);
    }
  }, []);

  const field = {
    name,
    value: ob[name] == undefined ? "" : ob[name],
    error: typeof ctx.errors[name] === "undefined" ? "" : ctx.errors[name],
    onBlur: (e: any) => {
      if (e.persist) {
        e.persist();
      }
      if (!ctx.touched[name]) {
        ctx.touched[name] = true;
        field.onChange(ob[name]);
      }
    },
    onChange: (val: any) => {
      if (!ctx.touched[name]) {
        ctx.touched[name] = true;
      }
      let typed = typeof val;
      let value;

      if (typed === "undefined") {
        value = "";
      } else if (typed === "object" && val.currentTarget) {
        const type = val.currentTarget.type;

        if (type === "checkbox" || type === "radio") {
          value = !!val.currentTarget.checked;
        } else if (val.currentTarget.multiple) {
          const options = val.currentTarget.options;
          const values = [];
          for (var i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
              values.push(options[i].value);
            }
          }
          value = values;
        } else {
          value = val.currentTarget.value;
        }
      } else {
        value = val;
      }

      (ctx.val as any)[name] = value;
      if (ctx.handleChange) {
        ctx.val = ctx.handleChange(ctx.val, name as string);
      }

      updator(ctx, name as string);
    },
  };

  return field;
}

export function useField<T>(name: keyof T, loadType?: LoadType) {
  const ctx = useContext(SignleContext);
  return useFieldByContext(ctx, name, loadType);
}
