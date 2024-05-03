import { useNavigate } from "react-router-dom";
import ArrowLeft from "./ArrowLeft";

function BackButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="group flex items-center gap-4"
    >
      <ArrowLeft />
      <span className="text-sm font-bold group-hover:text-skin-shipCove">
        Go back
      </span>
    </button>
  );
}

export default BackButton;
