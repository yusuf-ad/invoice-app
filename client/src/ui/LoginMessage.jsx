import { Link } from "react-router-dom";

function LoginMessage() {
  return (
    <div className="dark:bg-skin-mirage absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 space-y-8  rounded-xl bg-white px-12 py-14 shadow-sm">
      <h1 className="text-skin-black text-center text-2xl font-bold">
        Welcome to the Invoice App
      </h1>

      <div className="flex flex-col justify-around gap-4 md:flex-row ">
        <Link to={"/login"}>
          <button className="btn-md bg-skin-purple w-full">Log in</button>
        </Link>
        <Link to={"/signup"}>
          <button className="btn-md bg-skin-orange w-full">Sign up</button>
        </Link>
      </div>
    </div>
  );
}

export default LoginMessage;
