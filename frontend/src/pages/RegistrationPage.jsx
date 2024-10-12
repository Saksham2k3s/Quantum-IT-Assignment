import React, { useState, useEffect } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { BsCalendar2DateFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { register } from "../redux/slices/authSlice";

function RegistrationPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    dob: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const { isError, isLoading, errorMessage, successMessage } = useSelector(
    (state) => state.auth
  );

  // Trigger notifications and redirect on success
  useEffect(() => {
    if (isError && errorMessage) {
      toast.error(errorMessage);
    } else if (successMessage) {
      toast.success(successMessage);
      navigate("/");
    }
  }, [isError, errorMessage, successMessage, navigate]);

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
    if (!formData.username) errors.username = "Username is required";
    if (!formData.email) errors.email = "Email is required";
    if (!formData.dob) errors.dob = "Date of Birth is required";
    if (!formData.password) errors.password = "Password is required";
    return errors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      dispatch(register(formData));

      // Reset form after successful submission
      if (!isError) {
        setFormData({
          username: "",
          email: "",
          dob: "",
          password: "",
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-dark-light flex justify-center align-middle">
      <div className="relative self-center min-h-[200px] w-[70%] lg:w-[30%] bg-form-bg rounded-lg">
        <div
          className="absolute bg-light px-5 py-4 text-dark text-center w-[60%] lg:w-[40%] -top-4 z-10"
          style={{ left: "50%", transform: "translateX(-50%)" }}
        >
          SIGN UP
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
              <FaUser size={20} />
            </div>
            <div>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
              />
              
            </div>
            
          </div>
          {errors.username && (
                <p className="text-red-500 text-sm text-center ">{errors.username}</p>
          )}
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
              
            </div>
          </div>
          {errors.email && (
                <p className="text-red-500 text-sm text-center ">{errors.email}</p>
              )}
          <div className="input-container">
            <div className="px-2 border-r">
              <BsCalendar2DateFill size={20} />
            </div>
            <div>
              <input
                type="text"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                placeholder="Date of Birth"
              />
              
            </div>
          </div>
          {errors.dob && (
                <p className="text-red-500 text-sm text-center ">{errors.dob}</p>
              )}
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
              
            </div>
          </div>
          {errors.password && (
                <p className="text-red-500 text-sm text-center ">{errors.password}</p>
              )}
          <button
            type="submit"
            className="bg-light text-dark w-[40%] self-center py-2 rounded-lg"
            disabled={isLoading}
          >
            {isLoading ? "Registering..." : "REGISTER"}
          </button>

          <small className="text-light text-center text-lg">
            Already have an account?{" "}
            <Link to="/sign-in" className="underline">
              Sign in
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
  );
}

export default RegistrationPage;
