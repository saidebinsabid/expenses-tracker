import React from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router";
import Lottie from "lottie-react";
import registerAnimation from "../assets/register.json";
import { FaGoogle, FaFacebookF, FaTwitter } from "react-icons/fa";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";

const Register = () => {
  const { createUser, setUser, setLoading } = useAuth();
  // const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { name, email, password } = data;
    try {
      const result = await createUser(email, password, name);
      const user = result;

      setUser({
        ...user,
        displayName: name,
      });
      toast.success("Registration successful!");
      setLoading(false);
      // navigate("/");
      reset();
    } catch (err) {
      toast.error(err.message || "Something went wrong.");
      setLoading(false);
    }
  };
  return (
    <section className="w-11/12 mx-auto bg-base-100 flex items-center justify-center py-8">
      <div className="bg-white shadow-2xl rounded-lg p-6 md:p-12 w-full max-w-5xl flex flex-col md:flex-row gap-10 items-center">
        {/* Left Side: Lottie Animation */}
        <div className="w-full md:w-1/2">
          <Lottie animationData={registerAnimation} loop={true} />
        </div>
        {/* Right Side: Form */}
        <div className="w-full md:w-1/2">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 font-poppins text-center pb-6">
            Create Your Account
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Your Name"
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 5,
                    message: "Name should be more than 5 characters",
                  },
                })}
                className="w-full px-4 py-2 border-b bg-transparent border-gray-300 focus:outline-none focus:border-primary text-black"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email Address"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address",
                  },
                })}
                className="w-full px-4 py-2 border-b bg-transparent border-gray-300 focus:outline-none focus:border-primary text-black"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
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
                type="password"
                id="password"
                name="password"
                placeholder="Password (min 6 characters)"
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
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Register Button */}
            <button
              type="submit"
              className="w-full text-black border border-primary py-2 rounded-xl font-medium hover:bg-primary transition-all duration-300"
            >
              Register
            </button>
          </form>

          {/* Login Link */}
          <p className="text-sm text-gray-600 mt-4 text-center">
            Already have an account?{" "}
            <NavLink
              to="/auth/login"
              className="text-primary font-medium hover:underline"
            >
              Login
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

export default Register;
