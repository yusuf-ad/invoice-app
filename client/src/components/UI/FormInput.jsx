function FormInput({ register, name, type = "text", autoComplete = "off" }) {
  return (
    <input
      className="w-full py-3 px-4 border-2 rounded-md border-gray-300/50 text-sm font-bold"
      type={type}
      {...register(name, { required: "Can't be empty" })}
      autoComplete={autoComplete}
    />
  );
}

export default FormInput;
