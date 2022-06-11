/* eslint-disable @typescript-eslint/no-explicit-any */

const conf = { abortEarly: false };

export function isYupSchema(schema: any): boolean {
  return !!schema._blacklist;
}

export async function validateYupSchema(
  schema: any,
  values: Record<string, any>,
  key?: string
) {
  const errors: Record<string, string> = {};

  if (key) {
    try {
      await schema.validateAt(key, values, conf);
    } catch (e: any) {
      if (e && e.errors && e.errors[0]) {
        errors[key] = e.errors[0];
      }
    }
  } else {
    const list = Object.keys(values);
    for (const key of list) {
      try {
        await schema.validateAt(key, values, conf);
      } catch (e: any) {
        if (e && e.errors && e.errors[0]) {
          errors[key] = e.errors[0];
        }
      }
    }
  }
  return errors;
}
