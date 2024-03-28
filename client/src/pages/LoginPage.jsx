import { Link } from "react-router-dom";
import { InputField } from "../components/UI/InputField";

import { useLogin } from "../features/authentication/useLogin";
import { useForm } from "react-hook-form";
import { useIsAuthenticated } from "../features/authentication/useIsAuthenticated";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { login, isLoading } = useLogin();

  function onSuccess(data) {
    login(data);
  }

  useIsAuthenticated();

  return (
    <div
      onSubmit={handleSubmit(onSuccess)}
      className="absolute center-x top-1/4 container max-w-lg px-4"
    >
      <h1 className="text-center font-extrabold mb-16 text-2xl">
        Login to Invoice App
      </h1>

      <form
        onSubmit={(e) => e.preventDefault()}
        className=" bg-white mt-8 py-6 px-8 rounded-md flex flex-col"
      >
        <div className="space-y-8">
          <InputField
            label={"Username:"}
            placeholder={"username"}
            type="text"
            id={"username"}
            register={register}
            options={{ required: "Can't be empty." }}
            error={errors?.username?.message}
          />
          <InputField
            label={"Password:"}
            type="password"
            id={"password"}
            register={register}
            options={{ required: "Can't be empty." }}
            error={errors?.password?.message}
          />

          <button
            disabled={isLoading}
            className="btn-md bg-purple font-extrabold text-white w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Log in
          </button>
        </div>

        <p className="mt-8">
          New Customer?{" "}
          <Link
            className="underline underline-offset-2 hover:text-purple"
            to={"/signup"}
          >
            Click to Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;
