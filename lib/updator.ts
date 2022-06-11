/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormContext } from "./useForm";
import { validateTiny } from "./validateTiny";
import { validateYupSchema } from "./validateYupSchema";

function checkTouched(
  formOb: FormContext<any>,
  errors: Record<string, string>
) {
  if (formOb.entryValidateAll) {
    return errors;
  }
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
    // 兼容 yup 的校验
    if (ctx.validateSchema._blacklist) {
      const errors = await validateYupSchema(ctx.validateSchema, ctx.val, key);
      Object.assign(ctx.errors, checkTouched(ctx, errors));
    } else {
      const errors = validateTiny(ctx.validateSchema, ctx.val, key);
      Object.assign(ctx.errors, checkTouched(ctx, errors));
    }
  }
  ctx.next();
}
