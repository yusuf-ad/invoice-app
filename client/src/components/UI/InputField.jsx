import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ShowPasswordButton } from "./ShowPasswordButton";

export function InputField({
  label,
  placeholder,
  id,
  type = "text",
  value,
  onChange,
}) {
  const inputElement = useRef(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "user/displayError", payload: "" });
  }, [dispatch]);

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id}>{label}</label>
      <div className="relative">
        <input
          maxLength={32}
          ref={inputElement}
          value={value}
          onChange={onChange}
          className="w-full bg-selago py-2 px-4 rounded-lg outline-purple"
          placeholder={placeholder}
          autoComplete={`current-${id}`}
          id={id}
          type={type}
        />
        <ErrorMessage type={type} />

        <ShowPasswordButton
          inputElement={inputElement}
          isPassword={type === "password"}
        />
      </div>
    </div>
  );
}

function ErrorMessage({ type }) {
  const { message: error, status } = useSelector(
    (state) => state.user.errorMsg
  );

  const errorTypes = {
    text404: status === 404 && type === "text",
    password401: status === 401 && type === "password",
    status400: status === 400,
  };

  return (
    <>
      {(errorTypes.text404 ||
        errorTypes.password401 ||
        errorTypes.status400) && (
        <p className="absolute text-sm text-red-500 font-semibold mt-2">
          {error}
        </p>
      )}
    </>
  );
}
