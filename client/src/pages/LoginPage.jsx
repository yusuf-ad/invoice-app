import { InputField } from "../components/UI/InputField";

import { useLogin } from "../features/authentication/useLogin";
import { useForm } from "react-hook-form";

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
        className=" bg-white mt-8 py-6 px-8 rounded-md flex flex-col  gap-10"
      >
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

        <button className="btn-md bg-purple font-extrabold text-white">
          Log in
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
