/* eslint-disable @typescript-eslint/no-explicit-any */
import { getin } from "set-get-in";
import { FormContext, ValidateOptions } from "./useForm";
import { isYupSchema, validateYupSchema } from "./validateYupSchema";

function checkTouched(formOb: FormContext<any>, errors: Record<string, string>) {
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

export async function updator(ctx: FormContext<any>, options: ValidateOptions = {}) {
  if (ctx.validate) {
    const errors: any = await Promise.resolve(ctx.validate(ctx.val, options.key!));
    Object.assign(ctx.errors, checkTouched(ctx, errors));
  } else if (ctx.validateSchema) {
    const schema = ctx.validateSchema;
    // 兼容 yup 的校验
    let res: any;
    if (isYupSchema(schema)) {
      const vals = {} as any;
      Object.keys(schema.fields).forEach((key: string) => {
        vals[key] = getin(ctx.val, key);
      });
      res = await validateYupSchema(schema, vals, {
        ...options,
        typeChange: true,
      });
    } else if (schema.isSoke) {
      const vals = {} as any;
      schema.schemaKeys.forEach((key: string) => {
        vals[key] = getin(ctx.val, key);
      });
      res = schema.validate(vals, {
        ...options,
        typeChange: true,
      });
      console.log("__debug__", res);
    }

    if (options.key) {
      ctx.errors[options.key] = res.error;
    } else {
      ctx.errors = checkTouched(ctx, res.errors);
    }

    if (res.error) {
      ctx.error = res.error;
      ctx.errorPath = res.path;
    }
  }
  ctx.next();
}
