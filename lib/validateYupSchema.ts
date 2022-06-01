/* eslint-disable @typescript-eslint/no-explicit-any */

export function validateYupSchema(schema: any, values: Record<string, any>) {
  const errors: Record<string, string> = {};
  const conf = { abortEarly: false };
  Object.keys(values).forEach((key) => {
    try {
      schema.validateSyncAt(key, values, conf);
    } catch (e: any) {
      if (e && e.errors && e.errors[0]) {
        errors[key] = e.errors[0];
      }
    }
  });
  return errors;
}
