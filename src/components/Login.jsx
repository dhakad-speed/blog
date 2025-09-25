import React, { useState } from "react";
import component from "./component";
import authService from "../appwrite/auth";
import { login as authLogin } from "../store/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
function Login() {
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const login = async (data) => {
    setError(false);
    try {
      // newSession
      const newSession = await authService.login({
        email: data.email,
        password: data.password,
      });
      if (newSession) {
        const currentUser = await authService.getCurrentUser();
        if (currentUser) dispatch(authLogin(currentUser));
        navigate("/");
      }
      console.log(newSession);
    } catch (error) {
      setError(error.message);
    }
  };
  const { register, handleSubmit } = useForm();
  return (
    <div className="flex items-center justify-center w-full my-10">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <component.Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight text-black/70">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base text-black/40">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="text-black/60 underline font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)} className="mt-8">
          <div className="space-y-5">
            <component.Input
              className="outline-none border-none"
              label="Email"
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
            <component.Input
              className="outline-none border-none"
              label="Password"
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
              })}
            />
            <component.Button type="submit" className="w-full text-black">
              Sign in
            </component.Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
