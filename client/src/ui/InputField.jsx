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
    <div className="flex flex-col gap-3">
      <label className="text-skin-black" htmlFor={id}>
        {label}
      </label>

      <div className="relative">
        <input
          maxLength={24}
          ref={inputElement}
          className="text-skin-black outline-skin-purple bg-skin-whisper w-full rounded-lg px-4 py-2"
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
