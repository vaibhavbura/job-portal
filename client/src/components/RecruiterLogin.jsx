import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const RecruiterLogin = () => {
  const [state, setState] = useState("Login"); // Login or Sign Up
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(null); // file object
  const [isTextDataSubmitted, setTextDataSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {setShowRecruiterLogin} = useContext(AppContext)

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    // Validation for required fields
    if (!email || !password || (state === "Sign Up" && !isTextDataSubmitted && !name)) {
      setErrorMessage("Please fill out all required fields");
      return;
    }

    setErrorMessage(""); // Clear previous errors

    // Step 1: Move to upload step if signing up
    if (state === "Sign Up" && !isTextDataSubmitted) {
      setTextDataSubmitted(true);
      return;
    }

    // Step 2: Final Sign Up submission
    if (state === "Sign Up" && isTextDataSubmitted) {
      console.log({ name, email, password, image });
      alert("Account created successfully!");
      return;
    }

    // Step 3: Login
    if (state === "Login") {
      console.log({ email, password });
      alert("Logged in successfully!");
    }
  };
  useEffect(()=>{
    document.body.style.overflow ='hidden'

    return () =>{
        document.body.style.overflow ='unset'
    }
  },[])

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center">
      <form onSubmit={onSubmitHandler} className="relative bg-white p-10 rounded-xl text-slate-500">
        <h1 className="text-center text-2xl text-neutral-700 font-medium">
          Recruiter {state}
        </h1>
        <p className="text-sm">Welcome! Please {state === "Login" ? "sign in" : "sign up"} to continue</p>

        {errorMessage && (
          <p className="text-red-600 text-sm mt-2 mb-2">{errorMessage}</p>
        )}

        {/* If Sign Up Step 2 (Image Upload) */}
        {state === "Sign Up" && isTextDataSubmitted ? (
          <div className="flex items-center gap-4 my-10">
            <label htmlFor="image">
              {image ? (
                <img
                  className="w-16 h-16 rounded-full object-cover"
                  src={URL.createObjectURL(image)}
                  alt="Logo"
                />
              ) : (
                <img className="w-16 rounded-full" src={assets.upload_area} alt="Upload" />
              )}
              <input
                type="file"
                id="image"
                hidden
                onChange={(e) => {
                  if (e.target.files[0]) {
                    setImage(e.target.files[0]);
                  }
                }}
              />
            </label>
            <p>Upload Company <br /> Logo</p>
          </div>
        ) : (
          <>
            {/* Company Name for Sign Up only */}
            {state !== "Login" && (
              <div className="border px-4 py-2 flex items-center gap-2 rounded-full mt-5">
                <img src={assets.person_icon} alt="person" />
                <input
                  className="outline-none text-sm"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  type="text"
                  placeholder="Company Name"
                />
              </div>
            )}

            <div className="border px-4 py-2 flex items-center gap-2 rounded-full mt-5">
              <img src={assets.email_icon} alt="email" />
              <input
                className="outline-none text-sm"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder="Email ID"
              />
            </div>

            <div className="border px-4 py-2 flex items-center gap-2 rounded-full mt-5">
              <img src={assets.lock_icon} alt="lock" />
              <input
                className="outline-none text-sm"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="Password"
              />
            </div>
          </>
        )}

        {state === "Login" && (
          <p className="text-sm text-blue-600 my-4 cursor-pointer">
            Forgot password?
          </p>
        )}

        <button type="submit" className="bg-blue-600 w-full text-white py-2 rounded-full mt-4">
          {state === "Login" ? "Login" : isTextDataSubmitted ? "Create Account" : "Next"}
        </button>

        <p className="mt-5 text-center">
          {state === "Login" ? (
            <>
              Don't have an account?{" "}
              <span
                className="text-blue-600 cursor-pointer"
                onClick={() => {
                  setState("Sign Up");
                  setErrorMessage("");
                }}
              >
                Sign Up
              </span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span
                className="text-blue-600 cursor-pointer"
                onClick={() => {
                  setState("Login");
                  setIsTextDataSubmitted(false);
                  setErrorMessage("");
                }}
              >
                Login
              </span>
            </>
          )}
        </p>
        <img onClick={e=> setShowRecruiterLogin(false)} className="absolute top-5 right-5 cursor-pointer" src={assets.cross_icon} alt="" />
      </form>
    </div>
  );
};

export default RecruiterLogin;
