import React, { useState } from "react";
import component from "./component";
import { useNavigate, Link } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { useForm } from "react-hook-form";
import authService from "../appwrite/auth";
import { useDispatch } from "react-redux";
function SignupComponent() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const create = async (data) => {
    setError(false);
    try {
      const userData = await authService.createAcount({
        name: data.name,
        email: data.email,
        password: data.password,
      });
      console.log(userData);
      if (userData) {
        await authService.login({
          email: data.email,
          password: data.password,
        });
        const signedUser = await authService.getCurrentUser().catch();
        if (signedUser) dispatch(authLogin(signedUser));
        navigate("/");
        console.log(signedUser);
      }
    } catch (error) {
      return null;
    }
  };

  return (
    <div className="flex items-center justify-center my-10">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <component.Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight text-black/70">
          Sign up to create account
        </h2>
        <p className="mt-2 text-center text-base text-black/40">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="text-black/60 underline font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign In
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

        <form onSubmit={handleSubmit(create)}>
          <div className="space-y-5">
            <component.Input
              id="name"
              className="border-none outline-none"
              label="Name"
              placeholder="Enter your full name"
              {...register("name", {
                required: true,
              })}
            />
            <component.Input
              id="email"
              className="border-none outline-none"
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
              id="password"
              className="border-none outline-none"
              label="Password"
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
              })}
            />
            <component.Button type="submit" className="w-full">
              Create Account
            </component.Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignupComponent;
