/* eslint-disable @typescript-eslint/no-explicit-any */
import { SignleContext } from "./SingleContext";
import { FormContext } from "./useForm";

const SingleProvider = SignleContext.Provider;

// not have form children
export function LessForm(props: { value: FormContext<any>; children: any }) {
  return <SingleProvider {...props}></SingleProvider>;
}
