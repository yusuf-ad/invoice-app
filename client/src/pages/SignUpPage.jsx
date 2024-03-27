import { useState } from "react";
import { signup } from "../features/users/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { InputField } from "../components/UI/InputField";

const initialState = {
  fullName: "",
  email: "",
  username: "",
  password: "",
};

function SignUpPage() {
  const [newUser, setNewUser] = useState(initialState);

  const dispatch = useDispatch();

  function handleInputChange(e) {
    const { id, value } = e.target;

    setNewUser((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    for (const data in newUser) {
      newUser[data] = newUser[data].trim();
      if (!newUser[data]) return;
    }

    dispatch(signup(newUser));
  }

  return (
    <div className="relative flex items-center justify-center mt-10 px-8">
      <div className="container max-w-2xl rounded-md shadow-md bg-white py-12 px-8">
        <h1 className="ml-8 font-extrabold mb-8 text-2xl">
          Sign up to Invoice App
        </h1>
        <form
          onSubmit={handleSubmit}
          className=" bg-white mt-8 py-6 px-8 rounded-md flex flex-col  gap-8"
        >
          <InputField
            value={newUser.fullName}
            onChange={handleInputChange}
            label="Your fullname:"
            placeholder="John Doe"
            id="fullName"
            type="text"
          />
          <InputField
            value={newUser.email}
            onChange={handleInputChange}
            label="Your email:"
            placeholder="email@gmail.com"
            id="email"
            type="email"
          />
          <InputField
            value={newUser.username}
            onChange={handleInputChange}
            label="Create your username:"
            placeholder="username"
            id="username"
            type="text"
          />
          <InputField
            value={newUser.password}
            onChange={handleInputChange}
            label="Create your password:"
            id="password"
            type="password"
          />
          <button className="btn-md bg-purple font-extrabold text-white">
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUpPage;
