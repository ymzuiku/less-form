import { CSSProperties } from "react";
import { useField } from "./useField";

export interface FieldProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  className?: string;
  style?: CSSProperties;
  placeholder?: string;
  type?: string;
  name: string;
}

export function Field({ name, ...rest }: FieldProps) {
  const ctx = useField(name);

  return (
    <input
      name={name}
      value={ctx.value || ""}
      onChange={ctx.onChange}
      onBlur={ctx.onBlur}
      {...rest}
    ></input>
  );
}
