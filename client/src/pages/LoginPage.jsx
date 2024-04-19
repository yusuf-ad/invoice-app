import { Link } from "react-router-dom";
import { InputField } from "../ui/InputField";

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
      className="center-x container absolute top-1/4 max-w-lg px-4"
    >
      <h1 className="mb-16 text-center text-2xl font-extrabold">
        Login to Invoice App
      </h1>

      <form
        onSubmit={(e) => e.preventDefault()}
        className=" dark:bg-skin-mirage mt-8 flex flex-col rounded-md bg-white px-8 py-6"
      >
        <div className="flex flex-col gap-8">
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
            className="btn-md bg-skin-purple text-skin-white mt-2 w-full font-extrabold disabled:cursor-not-allowed disabled:opacity-50"
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
