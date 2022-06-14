/* eslint-disable @typescript-eslint/no-explicit-any */
import { getin } from "set-get-in";
import { FormContext } from "./useForm";
import { isYupSchema, validateYupSchema } from "./validateYupSchema";

function checkTouched(
  formOb: FormContext<any>,
  errors: Record<string, string>
) {
  // 正常情况下，只显示点击过的错误
  const nextErrors = {} as Partial<Record<keyof any, string>>;
  Object.keys(formOb.touched).forEach((key) => {
    if ((formOb.touched as any)[key]) {
      const err = (errors as any)[key];
      if (err !== undefined) {
        (nextErrors as any)[key] = err;
      }
    }
  });
  return nextErrors;
}

export async function updator(ctx: FormContext<any>, key?: string) {
  if (ctx.validate) {
    const errors: any = await Promise.resolve(ctx.validate(ctx.val, key));
    Object.assign(ctx.errors, checkTouched(ctx, errors));
  } else if (ctx.validateSchema) {
    const schema = ctx.validateSchema;
    // 兼容 yup 的校验
    if (isYupSchema(schema)) {
      const errors = await validateYupSchema(schema, ctx.val, key);
      Object.assign(ctx.errors, checkTouched(ctx, errors));
    } else if (schema.isSoke) {
      const vals = {} as any;
      schema.schemaKeys.forEach((key: string) => {
        vals[key] = getin(ctx.val, key);
      });
      const errors = schema.validate(vals, key);
      Object.assign(ctx.errors, checkTouched(ctx, errors));
    }
  }
  ctx.next();
}
