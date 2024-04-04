import { Link } from "react-router-dom";

function LoginMessage() {
  return (
    <div className="absolute space-y-8 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white  py-14 px-12 rounded-xl shadow-sm">
      <h1 className="text-black font-bold text-2xl text-center">
        Welcome to the Invoice App
      </h1>

      <div className="flex flex-col gap-4 md:flex-row justify-around ">
        <Link to={"/login"}>
          <button className="btn-md bg-purple text-white w-full">Log in</button>
        </Link>
        <Link to={"/signup"}>
          <button className="btn-md bg-orange w-full">Sign up</button>
        </Link>
      </div>
    </div>
  );
}

export default LoginMessage;
