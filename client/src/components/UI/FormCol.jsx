function FormCol({ label, children, classes, error }) {
  return (
    <div className={`flex flex-col gap-4 ${classes ? classes : ""}`}>
      {label && (
        <div className="flex justify-between">
          <label className="text-gray-400 text-xs font-medium capitalize">
            {label}
          </label>

          {error && (
            <span className="text-red-400 text-xs font-medium">
              {error.message}
            </span>
          )}
        </div>
      )}

      {children}
    </div>
  );
}

export default FormCol;
