import { useRef } from "react";
import { ShowPasswordButton } from "./ShowPasswordButton";
import ErrorMessage from "../UI/ErrorMessage";

export function InputField({
  label,
  placeholder,
  id,
  type = "text",
  register,
  options,
  error,
}) {
  const inputElement = useRef(null);

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id}>{label}</label>

      <div className="relative">
        <input
          maxLength={24}
          ref={inputElement}
          className="w-full bg-selago py-2 px-4 rounded-lg outline-purple"
          placeholder={placeholder}
          autoComplete={`current-${id}`}
          id={id}
          type={type}
          {...register(id, options)}
        />

        {error && <ErrorMessage error={error} />}

        <ShowPasswordButton
          type={type}
          inputElement={inputElement}
          isPassword={type === "password"}
        />
      </div>
    </div>
  );
}
