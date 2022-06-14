import { LoadType, useField } from "./useField";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function FieldHOC<T extends { name?: string; loadType?: LoadType }>(
  Component: any
) {
  return function FieldHOCComponent({ name, loadType, ...rest }: T) {
    if (name) {
      const ctx = useField(name, loadType);
      return <Component {...ctx} {...rest} />;
    }

    return <Component {...rest} />;
  };
}
