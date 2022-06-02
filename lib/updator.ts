/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormContext } from "./useForm";
import { validateYupSchema } from "./validateYupSchema";

function checkTouched(
  formOb: FormContext<any>,
  errors: Record<string, string>
) {
  if (formOb.entryCheckAll) {
    return errors;
  }
  // 正常情况下，只显示点击过的错误
  const nextErrors = {} as Partial<Record<keyof any, string>>;
  Object.keys(formOb.touched).forEach((key) => {
    if ((formOb.touched as any)[key]) {
      (nextErrors as any)[key] = (errors as any)[key];
    }
  });
  return nextErrors;
}

export async function updator(ctx: FormContext<any>, key?: string) {
  if (ctx.validate) {
    const errors: any = await Promise.resolve(ctx.validate(ctx.val, key));
    ctx.errors = checkTouched(ctx, errors);
    ctx.next();
  } else if (ctx.validateSchema) {
    const errors = await validateYupSchema(ctx.validateSchema, ctx.val, key);
    ctx.errors = checkTouched(ctx, errors);
    ctx.next();
  } else {
    ctx.next();
  }
}
