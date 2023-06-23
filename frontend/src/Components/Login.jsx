import React, { useRef, useState } from "react";
 import { useDispatch, useSelector } from "react-redux";
//import { loginFetch } from "../Redux/UserReducer/action";
import { Link, useNavigate } from "react-router-dom";
//import GoogleAuth from "../Pages/GoogleAuth";
//import { FcGoogle } from "react-icons/fc";
import { DiApple } from "react-icons/di";
import { BsFacebook } from "react-icons/bs";
import {FcGoogle} from 'react-icons/fc'
import { loginFetch } from "../Reducer/UserReducer/action";

const Login = () => {
  const emailInput = useRef(null);
  const backgroundRef = useRef(null);
  const emailbox = useRef(null);
  const passwordInput = useRef(null);
  const passwordbox = useRef(null);
  const [form, setForm] = useState({ email: "", password: "" });

  const userStore = useSelector((store) => store.UserReducer);
  const dispatch = useDispatch();
 const navigate = useNavigate();


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
    }
  }

  // will block the input element when click on background
  function blockInput(event) {
    if (event.target === backgroundRef.current && !form.email) {
      emailInput.current.style.display = "none";
      emailbox.current.style.padding = "0.75rem";
    }
    if (event.target === backgroundRef.current && !form.password) {
      passwordInput.current.style.display = "none";
      passwordbox.current.style.padding = "0.75rem";
    }
  }

  // form management
  function handleInput(e) {
    const { value, name } = e.target;
    if (name === "email") {
      setForm({ ...form, email: value });
    } else {
      setForm({ ...form, password: value });
    }
  }

  // login function
  function handleLogin() {
    console.log(form);
    dispatch(loginFetch(form)).then((res) => {
      setForm({ email: "", password: "" });
    });
  }

  // if isAuth is true move to dashboard;
  // if (userStore.isAuth) {
  //   if (userStore?.role === "user") {
  //     navigate("/arivu");
  //   } else if (userStore?.role === "admin") {
  //     navigate("/admin/dashboard");
  //   }
  // }

  return (
    <div >
      <div
        className="flex justify-center pt-16"
        onClick={blockInput}
        ref={backgroundRef}
      >
        <div className="w-3/4 sm:w-2/3 md:w-1/2 lg:w-1/3 bg-gray-200 p-4 border-[1px] border-solid border-black">
          <div className="mb-5">
            <h2 className="text-sm font-bold">Log in to your Chat Account</h2>
          </div>
          {/* 2nd box  */}
          <div className="mt-3">
            {/* google bar  */}
            <div className="border p-3 flex items-center mb-3 border-[1px] border-solid border-black">
              <FcGoogle className="text-2xl" />
              {/* sign up with google */}
              <div className="ml-3">
                <h2 className="text-sm font-bold">Continue with Google</h2>
              </div>
              {/* <GoogleAuth /> */}
            </div>
            {/* facebook bar     */}
            <div className="border p-3 flex items-center mb-3 border-[1px] border-solid border-black">
              <BsFacebook className="text-xl text-blue-500" />
              <div className="ml-3">
                <h2 className="text-sm font-bold">Continue with Facebook</h2>
              </div>
            </div>
            {/* apple bar  */}
            <div className="border p-3 flex items-center mb-3 border-[1px] border-solid border-black">
              <DiApple className="text-2xl" />
              <div className="ml-3">
                <h2 className="text-sm font-bold">Continue with Apple</h2>
              </div>
            </div>
            {/* email  */}
            <div
              className="border p-3 cursor-pointer mb-3 border-[1px] border-solid border-black"
              id="email"
              onClick={showInput}
              ref={emailbox}
            >
              <h2 className="text-sm font-bold">Email</h2>
              <input
                type="text"
                className="hidden border-none p-3 focus:outline-none w-full"
                ref={emailInput}
                name="email"
                value={form.email}
                onChange={handleInput}
              />
            </div>
            {/* password */}
            <div
              className="border p-3 cursor-pointer mb-3 border-[1px] border-solid border-black"
              id="password"
              onClick={showInput}
              ref={passwordbox}
            >
              <h2 className="text-sm font-bold">Password</h2>
              <input
                type="password"
                className="hidden border-none p-3 focus:outline-none w-full"
                ref={passwordInput}
                name="password"
                value={form.password}
                onChange={handleInput}
              />
            </div>
            {/* button  */}
            <div className="mt-3">
              <button
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 flex items-center justify-center"
                onClick={handleLogin}
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
      <Link className="text-blue-500 font-bold text-md " to="/signup">SignUp</Link>
    </div>
  );
};

export default Login;
