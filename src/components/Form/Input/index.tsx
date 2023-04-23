import { StyledInputContainer } from "../../../styles/form";
import { StyledParagraph } from "../../../styles/typography";
import { ForwardedRef, forwardRef, InputHTMLAttributes } from "react";
import { FieldError } from "react-hook-form";

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  id?: string;
  error?: FieldError;
  placeholder?: string;
}

const Input = forwardRef(
  (
    { label, id, error, placeholder, ...rest }: IInputProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => (
    <div>
      <StyledInputContainer>
        {label ? <label htmlFor={id}>{placeholder}</label> : null}
        <input id={id} ref={ref} placeholder={placeholder} {...rest} />
        {error ? (
          <StyledParagraph fontColor="red">{error.message}</StyledParagraph>
        ) : null}
      </StyledInputContainer>
    </div>
  )
);

export default Input;
