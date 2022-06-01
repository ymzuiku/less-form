/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect } from "react";
import { useObserver } from "react-ob";
import { SignleContext } from "./SingleContext";
import { updator } from "./updator";
import { FormContext } from "./useForm";

type LoadType = "value" | "error";

const emptyCtx = {
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
) {
  if (!ctx) {
    return emptyCtx;
  }
  const ob = useObserver(ctx, (v) =>
    !loadType
      ? [v[name], ctx.errors[name]]
      : loadType == "value"
      ? [v[name]]
      : [ctx.errors[name]]
  );
  useEffect(() => {
    if (ctx.val[name]) {
      field.onChange(ctx.val[name]);
    }
  }, []);

  const field = {
    name,
    value: ob[name] as any,
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
      let typed = typeof val;
      let value;
      if (typed === "object" && val.currentTarget) {
        const type = val.currentTarget.type;

        if (type === "checkbox" || type === "checkbox") {
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
        (ctx.val as any)[name] = value;
        updator(ctx);
      } else {
        (ctx.val as any)[name] = val;
        updator(ctx);
      }
    },
  };

  return field;
}

export function useField<T>(name: keyof T, loadType?: LoadType) {
  const ctx = useContext(SignleContext);
  return useFieldByContext(ctx, name, loadType);
}
