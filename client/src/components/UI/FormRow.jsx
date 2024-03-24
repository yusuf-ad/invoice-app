function FormRow({ children, classes }) {
  return <div className={`flex ${classes ? classes : ""}`}>{children}</div>;
}

export default FormRow;
