import { FieldContext, LoadType, useField } from "./useField";

export interface FieldProps<T> {
  name: keyof T;
  loadType?: LoadType;
  children: (ctx: FieldContext<T>) => any;
}

// render props
export function Field<T extends Record<string, unknown>>({
  name,
  children,
  loadType,
}: FieldProps<T>) {
  const ctx = useField(name, loadType);

  return children(ctx);
}
