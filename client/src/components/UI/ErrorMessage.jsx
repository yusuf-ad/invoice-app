function ErrorMessage({ error }) {
  return (
    <p className="absolute text-sm text-red-500 font-semibold mt-2">{error}</p>
  );
}

export default ErrorMessage;
