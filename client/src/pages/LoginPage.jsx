import { useState } from "react";
import { InputField } from "../components/UI/InputField";

import { useNavigate } from "react-router-dom";
import { useLogin } from "../features/authentication/useLogin";

function LoginPage() {
  const [user, setUser] = useState({
    username: "ali",
    password: "ali",
  });

  const { login, isLoading } = useLogin();

  const navigate = useNavigate();

  function handleInputChange(e) {
    const { id, value } = e.target;

    setUser((prevData) => ({ ...prevData, [id]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    login(user);

    // navigate("/");
  }

  return (
    <div
      onSubmit={handleSubmit}
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
          value={user.username}
          onChange={handleInputChange}
        />

        <InputField
          label={"Password:"}
          type="password"
          id={"password"}
          value={user.password}
          onChange={handleInputChange}
        />

        <button className="btn-md bg-purple font-extrabold text-white">
          Log in
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
