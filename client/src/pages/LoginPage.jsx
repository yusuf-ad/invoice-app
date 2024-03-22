import { useEffect, useState } from "react";
import { InputField } from "../components/UI/InputField";
import { useDispatch, useSelector } from "react-redux";

import { login } from "../features/users/userSlice";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const token = useSelector((state) => state.user.token);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleInputChange(e) {
    const { id, value } = e.target;

    setUser((prevData) => ({ ...prevData, [id]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    dispatch(login(user));
  }

  useEffect(() => {
    if (token) {
      navigate("/app");

      setUser((prevData) => ({ ...prevData, password: "" }));
    }
  }, [token, navigate]);

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
