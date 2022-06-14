import { Override } from "./types";
import { LoadType, useField } from "./useField";

type FieldHOCProps<T> = Override<
  T,
  {
    name: string;
    loadType?: LoadType;
    onChange?: (val: any) => void;
  }
>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function FieldHOC<T>(Component: any) {
  return function FieldHOCComponent({
    name,
    loadType,
    onChange,
    ...rest
  }: FieldHOCProps<T>) {
    if (name) {
      const ctx = useField(name, loadType);
      if (onChange) {
        onChange(ctx.value);
      }
      return <Component {...ctx} {...rest} />;
    }

    return <Component {...rest} />;
  };
}
