import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BiError } from "react-icons/bi";
import { AiOutlineEyeInvisible, AiFillEye } from "react-icons/ai";
import { actionsingUpError } from "../Reducer/UserReducer/actionType";
import { signUpFetch, validatePassword } from "../Reducer/UserReducer/action";


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
  });

  const userStore = useSelector((store) => store.UserReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [eyeclose, seteyeMoment] = useState(false);
  const [message, setMessage] = useState("");

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
      emailbox.current.style.padding = "0.75rem";
    }
    if (event.target === backgroundRef.current && !form.password) {
      passwordInput.current.style.display = "none";
      passwordbox.current.style.padding = "0.75rem";
    }
    if (event.target === backgroundRef.current && !form.confirmPassword) {
      confirmPasswordInput.current.style.display = "none";
      confirmPasswordbox.current.style.padding = "0.75rem";
    }

    if (event.target === backgroundRef.current && !form.name) {
      nameInput.current.style.display = "none";
      namebox.current.style.padding = "0.75rem";
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





  // SignUp function
  function handleSignUp() {
    setInterval(()=>{
        setMessage("")
    },5000)


    const { email, password, confirmPassword, name } = form;

    if (!email || !password || !confirmPassword || !name) {
    setMessage("All fields are required")
      return;
    }

    if(validatePassword(password)){
      return  setMessage(validatePassword(password))
    }

    if (confirmPassword !== password) {
      setMessage("Password does not match")
      return;
    }

    dispatch(signUpFetch(form)).then((res) => {
      setForm({ email: "", password: "", confirmPassword: "", name: "" });
    });
  }

  useEffect(()=>{
    
  },[message])

  


  return (
    <div>
    <div className="p-4"><h1 className="text-lg font-bold text-red-600" >{message}</h1></div>
      <div
        className="flex justify-center "
        onClick={blockInput}
        ref={backgroundRef}
        pt="100px"
      >
        
        <div className="w-3/4 sm:w-2/3 md:w-1/2 lg:w-1/3 bg-gray-200 p-4 border-[1px] border-solid border-black">
          <div>
            <h1 className="text-sm font-bold">Sign up and start learning</h1>
          </div>
          <div className="mt-25">
            {/* name */}
            <div className="border p-3 cursor-pointer mb-3 border-[1px] border-solid border-black" id="name" onClick={showInput} ref={namebox}>
              <div>
                <h1 className="text-sm font-bold" id="name">
                  Name
                </h1>
              </div>
              <div>
                <input
                  type="text"
                  className="hidden border-none p-3 focus:outline-none w-full"
                  ref={nameInput}
                  name="name"
                  value={form.name}
                  onChange={handleInput}
                />
              </div>
            </div>
            {/* email */}
            <div className="border p-3 cursor-pointer mb-3 border-[1px] border-solid border-black" id="email" onClick={showInput} ref={emailbox}>
              <div>
                <h1 className="text-sm font-bold" id="email">
                  Email
                </h1>
              </div>
              <div>
                <input
                  type="text"
                  className="hidden border-none p-3 focus:outline-none w-full"
                  ref={emailInput}
                  name="email"
                  value={form.email}
                  onChange={handleInput}
                />
              </div>
            </div>
            {/* password */}
            <div className="border p-3 cursor-pointer mb-3 border-[1px] border-solid border-black" id="password" onClick={showInput} ref={passwordbox}>
              <div className="flex justify-between">
                <div onClick={showInput} className="w-full">
                  <h1 className="text-sm font-bold" id="password">
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
                  className="hidden border-none p-3 focus:outline-none w-full"
                  ref={passwordInput}
                  name="password"
                  value={form.password}
                  onChange={handleInput}
                />
              </div>
            </div>
            {/* confirm password */}
            <div
              className="border p-3 cursor-pointer mb-3 border-[1px] border-solid border-black"
              id="confirmPassword"
              onClick={showInput}
              ref={confirmPasswordbox}
            >
              <div>
                <h1 className="text-sm font-bold" id="confirmPassword">
                  Confirm Password
                </h1>
              </div>
              <div>
                <input
                  type="password"
                  className="hidden border-none p-3 focus:outline-none w-full"
                  ref={confirmPasswordInput}
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleInput}
                />
              </div>
            </div>

            {/* button */}
            <div className="mt-15">
              <button
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 flex items-center justify-center"
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
      <Link className="text-blue-500 font-bold text-md " to="/login">LogIn</Link>
    </div>
  );
};

export default SignUp;
