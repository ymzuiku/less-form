/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormContext } from "./useForm";
import { validateYupSchema } from "./validateYupSchema";

function checkTouched(formOb: FormContext<any>, errors: Record<string, string>) {
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

export function updator(ctx: FormContext<any>) {
  if (ctx.validate) {
    Promise.resolve(ctx.validate(ctx.val)).then((errors) => {
      ctx.errors = checkTouched(ctx, errors);
      ctx.next();
    });
  } else if (ctx.validateSchema) {
    ctx.errors = checkTouched(ctx, validateYupSchema(ctx.validateSchema, ctx.val));
    ctx.next();
  } else {
    ctx.next();
  }
}
