import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BiError } from "react-icons/bi";
import { AiOutlineEyeInvisible, AiFillEye } from "react-icons/ai";
import { actionsingUpError } from "../Reducer/UserReducer/actionType";
import { signUpFetch } from "../Reducer/UserReducer/action";

const SignUp = () => {
  const emailInput = useRef(null);
  const backgroundRef = useRef(null);
  const emailbox = useRef(null);
  const passwordInput = useRef(null);
  const passwordbox = useRef(null);
  const nameInput = useRef(null);
  const namebox = useRef(null);
  const confirmPasswordInput = useRef(null);
  const confirmPasswordbox = useRef(null);
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    isPromotion: false,
  });

  const userStore = useSelector((store) => store.UserReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  const [eyeclose, seteyeMoment] = useState(false);
  const [toastkey, setToastKey] = useState(true);

  // will show the input element when click on element
  function showInput(e) {
    const ele = e.target.id;
    if (ele === "email") {
      emailInput.current.style.display = "block";
      emailInput.current.focus();
      emailbox.current.style.padding = "5px 20px";
    } else if (ele === "password") {
      passwordInput.current.style.display = "block";
      passwordInput.current.focus();
      passwordbox.current.style.padding = "5px 20px";
    } else if (ele === "name") {
      nameInput.current.style.display = "block";
      nameInput.current.focus();
      namebox.current.style.padding = "5px 20px";
    } else if (ele === "confirmPassword") {
      confirmPasswordInput.current.style.display = "block";
      confirmPasswordInput.current.focus();
      confirmPasswordbox.current.style.padding = "5px 20px";
    }
  }

  // will block the input element when click on background
  function blockInput(event) {
    if (event.target === backgroundRef.current && !form.email) {
      emailInput.current.style.display = "none";
      emailbox.current.style.padding = "20px";
    }
    if (event.target === backgroundRef.current && !form.password) {
      passwordInput.current.style.display = "none";
      passwordbox.current.style.padding = "20px";
    }
    if (event.target === backgroundRef.current && !form.confirmPassword) {
      confirmPasswordInput.current.style.display = "none";
      confirmPasswordbox.current.style.padding = "20px";
    }

    if (event.target === backgroundRef.current && !form.name) {
      nameInput.current.style.display = "none";
      namebox.current.style.padding = "20px";
    }
  }

  // form management
  function handleInput(e) {
    const { value, name } = e.target;
    setForm({ ...form, [name]: value });
  }

  // see password;
  function showPassword() {
    seteyeMoment(!eyeclose);
    passwordInput.current.type === "password"
      ? (passwordInput.current.type = "text")
      : (passwordInput.current.type = "password");
  }

  // handle promotion
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    setForm({ ...form, isPromotion: !isChecked });
  };

  // Error toast
  const showToast = () => {
    // Add your custom toast implementation using Tailwind CSS classes here
  };

  // Success Toast
  const showSuccessToast = () => {
    // Add your custom toast implementation using Tailwind CSS classes here
  };

  if (userStore.isError && toastkey) {
    showToast();
    setToastKey(false);
  }

  // SignUp function
  function handleSignUp() {
    setToastKey(true);
    const { email, password, confirmPassword, name } = form;
    if (!email || !password || !confirmPassword || !name) {
      dispatch(actionsingUpError("All fields are required"));
      return;
    }

    if (confirmPassword !== password) {
      dispatch(actionsingUpError("Password does not match"));
      return;
    }

    if (password.length < 8) {
      dispatch(
        actionsingUpError("Password should be at least 8 characters long")
      );
      return;
    }

    dispatch(signUpFetch(form)).then((res) => {
      setForm({ email: "", password: "", confirmPassword: "", name: "" });
      showSuccessToast();
    });
  }

  return (
    <div>
      <div
        className="flex justify-center"
        onClick={blockInput}
        ref={backgroundRef}
        pt="100px"
      >
        <div className="w-3/4 sm:w-2/3 md:w-1/2 lg:w-1/3 bg-gray-200 p-4 border-[1px] border-solid border-black">
          <div>
            <h1 className="text-xs">Sign up and start learning</h1>
          </div>
          <div className="mt-25">
            {/* name */}
            <div className="border-1 border-solid p-20" id="name" onClick={showInput} ref={namebox}>
              <div>
                <h1 className="text-xs" id="name">
                  Name
                </h1>
              </div>
              <div>
                <input
                  type="text"
                  className="hidden border-none focus:border-transparent focus:outline-none"
                  ref={nameInput}
                  name="name"
                  value={form.name}
                  onChange={handleInput}
                />
              </div>
            </div>
            {/* email */}
            <div className="border-1 border-solid p-20" id="email" onClick={showInput} ref={emailbox}>
              <div>
                <h1 className="text-xs" id="email">
                  Email
                </h1>
              </div>
              <div>
                <input
                  type="text"
                  className="hidden border-none focus:border-transparent focus:outline-none"
                  ref={emailInput}
                  name="email"
                  value={form.email}
                  onChange={handleInput}
                />
              </div>
            </div>
            {/* password */}
            <div className="border-1 border-solid p-20" id="password" onClick={showInput} ref={passwordbox}>
              <div className="flex justify-between">
                <div onClick={showInput} className="w-full">
                  <h1 className="text-xs" id="password">
                    Password
                  </h1>
                </div>
                <div onClick={showPassword}>
                  {eyeclose ? (
                    <AiFillEye size="20px" />
                  ) : (
                    <AiOutlineEyeInvisible size="20px" />
                  )}
                </div>
              </div>
              <div>
                <input
                  type="password"
                  className="hidden border-none focus:border-transparent focus:outline-none"
                  ref={passwordInput}
                  name="password"
                  value={form.password}
                  onChange={handleInput}
                />
              </div>
            </div>
            {/* confirm password */}
            <div
              className="border-1 border-solid p-20"
              id="confirmPassword"
              onClick={showInput}
              ref={confirmPasswordbox}
            >
              <div>
                <h1 className="text-xs" id="confirmPassword">
                  Confirm Password
                </h1>
              </div>
              <div>
                <input
                  type="password"
                  className="hidden border-none focus:border-transparent focus:outline-none"
                  ref={confirmPasswordInput}
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleInput}
                />
              </div>
            </div>

            <div className="flex">
              <div className="inline p-15">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />
              </div>
              <div className="inline">
                <p className="p-10">
                  Send me special offers, personalized recommendations, and
                  learning tips.
                </p>
              </div>
            </div>

            {/* button */}
            <div className="mt-15">
              <button
                className="w-full text-white bg-blue-500 hover:bg-blue-600 rounded-0 text-center"
                onClick={handleSignUp}
              >
                <h2 className="text-sm">
                  {userStore.loading ? (
                    <svg
                      className="animate-spin h-4 w-4 text-white mr-2"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  ) : (
                    "Log in"
                  )}
                </h2>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
