export type Override<P, S> = Omit<P, keyof S> & S;
export type ReactBaseProps = {
  name?: string;
  key?: string;
  className?: string;
  "test-id"?: string;
  style?: CSSProperties;
};
export type DetailedHTML = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLElement>,
  HTMLElement
> &
  ReactBaseProps;
export type DetailedDivHTML = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  ReactBaseProps;
export type DetailedInputHTML = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> &
  ReactBaseProps;
export type DetailedTextAreaHTML = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
> &
  ReactBaseProps;
export type DetailedSpanHTML = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLSpanElement>,
  HTMLSpanElement
> &
  ReactBaseProps;
export type DetailedFormHTML = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLFormElement>,
  HTMLFormElement
> &
  ReactBaseProps;
export type DetailedSelectHTML = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
> &
  ReactBaseProps;
export type DetailedVideoHTML = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLVideoElement>,
  HTMLVideoElement
> &
  ReactBaseProps;
export type DetailedTableHTML = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLTableElement>,
  HTMLTableElement
> &
  ReactBaseProps;
export type DetailedHeadHTML = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLHeadElement>,
  HTMLHeadElement
> &
  ReactBaseProps;
export type DetailedButtonHTML = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> &
  ReactBaseProps;
export type DetailedImageHTML = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLImageElement>,
  HTMLImageElement
> &
  ReactBaseProps;

export type HTMLProps<T> = Override<DetailedHTML, T>;
export type DivProps<T> = Override<DetailedDivHTML, T>;
export type InputProps<T> = Override<DetailedInputHTML, T>;
export type TextAreaProps<T> = Override<DetailedTextAreaHTML, T>;
export type SpanProps<T> = Override<DetailedSpanHTML, T>;
export type FormProps<T> = Override<DetailedFormHTML, T>;
export type SelectProps<T> = Override<DetailedSelectHTML, T>;
export type VideoProps<T> = Override<DetailedVideoHTML, T>;
export type TableProps<T> = Override<DetailedTableHTML, T>;
export type HeadProps<T> = Override<DetailedHeadHTML, T>;
export type ButtonProps<T> = Override<DetailedButtonHTML, T>;
export type ImageProps<T> = Override<DetailedImageHTML, T>;
