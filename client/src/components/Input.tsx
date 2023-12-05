import { forwardRef, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    value: string;
    setValue: (value: string) => void;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ value, setValue, className, type, ...props }, ref) => {
    return (
        <input
            required
            value={value}
            onChange={(event) => setValue(event.target.value)}
            type={type}
            {...props}
            className="border-[1px] border-gray-500 p-2 rounded"
            ref={ref}
        />
    );
});

Input.displayName = "Input";

export default Input;
