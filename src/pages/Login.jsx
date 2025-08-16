import React from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router";
import { FaGoogle, FaFacebookF, FaTwitter } from "react-icons/fa";
import Lottie from "lottie-react";
import loginAnimation from "../assets/login.json";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";
import axios from "axios";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signInUser, setLoading, setUser } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const firebaseUser = await signInUser(data.email, data.password);

      if (firebaseUser?.email) {
        setUser({
          displayName: firebaseUser.displayName,
          email: firebaseUser.email,
        });
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/jwt`,
          { email: firebaseUser.email },
          { withCredentials: true }
        );

        console.log("JWT token received and cookie set:", res.data.token);

        toast.success("Login successful");
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error(error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-11/12 mx-auto py-24 o">
      <div className="bg-white shadow-2xl rounded-lg overflow-hidden max-w-5xl w-full mx-auto grid grid-cols-1 md:grid-cols-2">
        {/* Left - Lottie */}
        <div className="bg-gray-100 p-6 flex items-center justify-center">
          <Lottie animationData={loginAnimation} className="w-72 md:w-full" />
        </div>

        {/* Right - Form */}
        <div className="p-8 md:p-12 space-y-6">
          {/* Logo + Heading */}
          <div className="text-center">
            <div className="mb-3 flex justify-center">
              <h2 className="text-2xl font-bold font-poppins flex flex-wrap justify-center gap-1">
                Welcome Back
              </h2>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                name="email"
                id="email"
                placeholder="Email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Enter a valid email address",
                  },
                })}
                className="w-full px-4 py-2 border-b bg-transparent border-gray-300 focus:outline-none focus:border-primary text-black"
              />
              {errors.email && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                name="password"
                type="password"
                id="password"
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className="w-full px-4 py-2 border-b bg-transparent border-gray-300 focus:outline-none focus:border-primary text-black"
              />
              {errors.password && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full py-2 font-semibold bg-primary text-black border border-primary hover:bg-transparent transition-all duration-300 rounded-xl"
            >
              Login
            </button>
          </form>

          {/* Register Link */}
          <p className="text-sm text-gray-600 text-center">
            Don’t have an account?{" "}
            <NavLink
              to="/auth/register"
              className="text-primary font-medium hover:underline"
            >
              Register
            </NavLink>
          </p>

          {/* Social Login */}
          <div className="flex items-center justify-center gap-4 pt-4">
            <button className="rounded-full p-2 border text-[#DB4437] border-gray-300 hover:bg-[#DB4437]/10 transition cursor-not-allowed">
              <FaGoogle size={18} />
            </button>
            <button className="rounded-full p-2 border text-[#4267B2] border-gray-300 hover:bg-[#4267B2]/10 transition cursor-not-allowed">
              <FaFacebookF size={18} />
            </button>
            <button className="rounded-full p-2 border text-[#1DA1F2] border-gray-300 hover:bg-[#1DA1F2]/10 transition cursor-not-allowed">
              <FaTwitter size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
