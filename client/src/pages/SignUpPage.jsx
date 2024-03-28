import { useForm } from "react-hook-form";
import { InputField } from "../components/UI/InputField";
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
    <div className="relative flex items-center justify-center mt-10 px-8">
      <div className="container max-w-2xl rounded-md shadow-md bg-white py-12 px-8">
        <h1 className="ml-8 font-extrabold mb-8 text-2xl">
          Sign up to Invoice App
        </h1>
        <form
          onSubmit={handleSubmit(onSuccess)}
          className=" bg-white mt-8 py-6 px-8 rounded-md"
        >
          <div className="space-y-8">
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
            className="w-full mt-10 btn-md bg-purple font-extrabold text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Sign up
          </button>

          <p className="mt-8">
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
