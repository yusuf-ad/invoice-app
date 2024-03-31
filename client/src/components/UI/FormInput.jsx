function FormInput({
  name,
  type = "text",
  autoComplete = "off",

  defaultValue = "",
  register,
}) {
  return (
    <input
      className="w-full rounded-md border-2 border-gray-300/50 px-4 py-3 text-sm font-bold placeholder:text-black/85"
      type={type}
      {...register(name, { required: "Can't be empty" })}
      autoComplete={autoComplete}
      defaultValue={defaultValue}
    />
  );
}

export default FormInput;
