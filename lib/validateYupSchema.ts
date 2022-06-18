/* eslint-disable @typescript-eslint/no-explicit-any */

import { ValidateOptions } from "./useForm";

const conf = { abortEarly: false };

export function isYupSchema(schema: any): boolean {
  return !!schema._blacklist;
}

export async function validateYupSchema(
  schema: any,
  values: Record<string, any>,
  { key, first, typeChange }: ValidateOptions = {},
) {
  let error = "";
  let path = "";
  const errors: Record<string, string> = {};

  if (key) {
    try {
      await schema.validateAt(key, values, conf);
    } catch (e: any) {
      if (e && e.errors && e.errors[0]) {
        errors[key] = e.errors[0];
        path = key;
        error = e.errors[0];
      }
    }
  } else {
    const list = Object.keys(values);
    try {
      await schema.isValid(values, conf);
    } catch (e: any) {
      errors[e.path] = e.errors[0];
      path = e.path;
      error = e.errors[0];
    }
  }
  return { errors, error, path };
}
