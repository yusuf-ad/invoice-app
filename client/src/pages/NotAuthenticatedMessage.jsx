import { Link } from "react-router-dom";

function NotAuthenticatedMessage() {
  return (
    <div className="text-center mt-24">
      <h1>You are not logged in. Please log in!</h1>
      <Link className="text-red-500 underline text-xl" to="/">
        Back to the homepage &rarr;
      </Link>
    </div>
  );
}

export default NotAuthenticatedMessage;
