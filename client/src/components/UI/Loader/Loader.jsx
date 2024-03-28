import "./Loader.css";

function Loader({ type }) {
  return (
    <div className={`lds-ring ${type}`}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

export default Loader;
