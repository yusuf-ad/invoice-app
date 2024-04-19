import { useForm } from "react-hook-form";
import { InputField } from "../ui/InputField";
import { Link } from "react-router-dom";
import { useSignUp } from "../features/authentication/useSignup";
import { useIsAuthenticated } from "../features/authentication/useIsAuthenticated";

function SignUpPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signup, isLoading } = useSignUp();

  function onSuccess(data) {
    signup(data);
  }

  useIsAuthenticated();

  return (
    <div className="relative mt-10 flex items-center justify-center px-8">
      <div className="dark:bg-skin-mirage container max-w-2xl rounded-md bg-white px-8 py-12 shadow-md">
        <h1 className="text-skin-black mb-8 ml-8 text-2xl font-extrabold">
          Sign up to Invoice App
        </h1>
        <form
          onSubmit={handleSubmit(onSuccess)}
          className="dark:bg-skin-ebony bg-skin-selago mt-8 rounded-md  px-8 py-6"
        >
          <div className="flex flex-col gap-8">
            <InputField
              label="Your fullname:"
              placeholder="John Doe"
              id="fullName"
              type="text"
              register={register}
              options={{ required: "Can't be empty." }}
              error={errors?.fullName?.message}
            />
            <InputField
              label="Your email:"
              placeholder="email@gmail.com"
              id="email"
              type="email"
              register={register}
              options={{ required: "Can't be empty." }}
              error={errors?.email?.message}
            />
            <InputField
              label="Create your username:"
              placeholder="username"
              id="username"
              type="text"
              register={register}
              options={{ required: "Can't be empty." }}
              error={errors?.username?.message}
            />
            <InputField
              label="Create your password:"
              id="password"
              type="password"
              register={register}
              options={{ required: "Can't be empty." }}
              error={errors?.password?.message}
            />
          </div>
          <button
            disabled={isLoading}
            className="btn-md text-skin-white bg-skin-purple mt-10 w-full font-extrabold disabled:cursor-not-allowed disabled:opacity-50"
          >
            Sign up
          </button>

          <p className="text-skin-black mt-8">
            Already a Customer?{" "}
            <Link
              className="underline underline-offset-2 hover:text-purple"
              to={"/login"}
            >
              Click to Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUpPage;
