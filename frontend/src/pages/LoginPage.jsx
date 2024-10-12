import React, { useEffect, useState } from "react";
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/slices/authSlice";
import toast from "react-hot-toast";

function LoginPage() {
  const navigate = useNavigate()
  // State for form inputs
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // State for error messages
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();

  // Get login state from Redux store
  const { isLoading, isError, errorMessage, successMessage } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError && errorMessage) {
      toast.error(errorMessage);
    } else if (successMessage) {
      toast.success(successMessage);
      navigate("/");
    }
  }, [isError, errorMessage, successMessage, navigate])

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Validate form inputs
  const validate = () => {
    let errors = {};
    if (!formData.email) errors.email = "Email is required";
    if (!formData.password) errors.password = "Password is required";
    return errors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      dispatch(login(formData));
    }
  };


  return (
    <>
      <div className="min-h-screen bg-gradient-dark-light flex justify-center align-middle">
        <div className="relative self-center min-h-[200px] w-[70%] lg:w-[30%] bg-form-bg rounded-lg">
          <div
            className="absolute bg-light px-5 py-4 text-dark text-center w-[60%] lg:w-[40%] -top-4 z-10 cursor-pointer"
            style={{ left: "50%", transform: "translateX(-50%)" }}
          >
            SIGN IN
          </div>
          <div className="flex justify-center pt-12">
            <img
              src="https://cdn-icons-png.flaticon.com/128/847/847969.png"
              alt="user-img"
              className="w-20 h-20"
            />
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center gap-4 py-5"
          >
            <div className="input-container">
              <div className="px-2 border-r">
                <MdEmail size={20} />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>
            </div>

            <div className="input-container">
              <div className="px-2 border-r">
                <FaLock size={20} />
              </div>
              <div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password}</p>
                )}
              </div>
            </div>

            {/* Button shows loading state if isLoading is true */}
            <button
              type="submit"
              className={`bg-light text-dark w-[40%] self-center py-2 rounded-lg ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "LOGIN"}
            </button>

            {/* Success and Error Messages */}
            {isError && (
              <p className="text-red-500 text-sm text-center mt-2">
                {errorMessage}
              </p>
            )}
            {successMessage && (
              <p className="text-green-500 text-sm text-center mt-2">
                {successMessage}
              </p>
            )}

            <small className="text-light text-center text-lg">
              Don't have an account yet?{" "}
              <Link to={"/sign-up"} className="underline">
                Sign Up
              </Link>
            </small>
          </form>

          {/* Bottom shadow div */}
          <div
            className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-[80%] h-[5px] bg-black rounded-[100%] shadow-2xl"
            style={{ filter: "blur(10px)", opacity: 0.7 }}
          ></div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
