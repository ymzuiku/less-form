import { CSSProperties, DOMAttributes } from "react";
import { useField } from "./useField";

export interface FieldProps extends DOMAttributes<HTMLInputElement> {
  className?: string;
  style?: CSSProperties;
  placeholder?: string;
  name: string;
}

export function Field({ name, ...rest }: FieldProps) {
  const ctx = useField(name);

  return (
    <input
      name={name}
      onChange={(e) => {
        ctx.setValue(e.currentTarget.value);
      }}
      onBlur={ctx.setTouched}
      {...rest}></input>
  );
}
