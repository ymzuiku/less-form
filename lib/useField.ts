/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect } from "react";
import { useObserver } from "react-ob";
import { SignleContext } from "./SingleContext";
import { updator } from "./updator";
import { FormContext } from "./useForm";

type LoadType = "value" | "error";

const emptyCtx = {
  value: "",
  error: "",
  setTouched: () => {
    //
  },
  setValue: () => {
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
      field.setTouched();
    }
  }, []);

  const field = {
    value: ob[name],
    error: typeof ctx.errors[name] === "undefined" ? "" : ctx.errors[name],
    setTouched: () => {
      if (!ctx.touched[name]) {
        ctx.touched[name] = true;
        field.setValue(ob[name]);
      }
    },
    setValue: (val: unknown) => {
      (ctx.val as any)[name] = val;
      updator(ctx);
    },
  };

  return field;
}

export function useField<T>(name: keyof T, loadType?: LoadType) {
  const ctx = useContext(SignleContext);
  return useFieldByContext(ctx, name, loadType);
}
