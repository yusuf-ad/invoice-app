function FormInput({
  name,
  type = 'text',
  autoComplete = 'off',

  defaultValue = '',
  register,
}) {
  return (
    <input
      className="w-full rounded-md border-2 border-gray-300/50 bg-white px-4 py-3 text-sm font-bold text-skin-black placeholder:text-black/85 dark:border-transparent dark:bg-skin-mirage "
      type={type}
      {...register(name, { required: "Can't be empty" })}
      autoComplete={autoComplete}
      defaultValue={defaultValue}
    />
  );
}

export default FormInput;
