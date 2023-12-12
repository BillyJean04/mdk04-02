import { forwardRef, InputHTMLAttributes } from "react";
import styled from "styled-components";

const StyledInput = styled.input`
    border: 2px solid gray;
    padding: 10px;
    border-radius: 5px;
`;

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    value: string;
    setValue: (value: string) => void;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ value, setValue, className, type, ...props }, ref) => {
    return (
        <StyledInput
            required
            value={value}
            onChange={(event) => setValue(event.target.value)}
            type={type}
            {...props}
            ref={ref}
        />
    );
});

Input.displayName = "Input";

export default Input;
