function FormCol({ label, children, classes, error }) {
  return (
    <div className={`flex flex-col gap-4 ${classes ? classes : ""}`}>
      {label && (
        <div className="flex justify-between">
          <label className="text-xs font-medium capitalize text-skin-baliHai">
            {label}
          </label>

          {error && (
            <span className="text-xs font-medium text-red-400">
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
