import { LoadType, useField } from "./useField";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function FieldHOC<T extends { name?: string }>(
  Component: any,
  loadType?: LoadType
) {
  return function FieldHOCComponent({ name, ...rest }: T) {
    if (name) {
      const ctx = useField(name, loadType);
      return <Component {...ctx} {...rest} />;
    }

    return <Component {...rest} />;
  };
}
