import React from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const [rUser, setRUser] = useState("");
  // const [showPassword, setShowPassword] = useState(false);
  const [rPassword, setRPassword] = useState("");
  const [rCPassword, setRCPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const navigate = useNavigate();

  let handleRUser = (evt) => {
    setRUser(evt.target.value);
  }

  let handleRPassword = (evt) => {
    setRPassword(evt.target.value);
  }

  // let togglePasswordVisibility = () => {
  //   setShowPassword(!showPassword);
  // }

  let checkPassword = (evt) => {
    let confirmPassword = evt.target.value;
    setRCPassword(confirmPassword);
    setIsPasswordValid(rPassword === confirmPassword);
  }

  function handleRSubmit(event) {
    event.preventDefault();
    axios.post("https://login-react-uvuc.onrender.com/api/register", {
      username: rUser,
      password: rPassword,
    })
    .then(function (response) {
      navigate("/success", {state: {message: response.data.message}});
    })
    .catch(function(error) {
      // console.log(error);
      /*
      AxiosError
      code: "ERR_BAD_REQUEST"
      config: {transitional: {…}, adapter: Array(3), transformRequest: Array(1), transformResponse: Array(1), timeout: 0, …}
      message: "Request failed with status code 400"
      name: "AxiosError"
      request: XMLHttpRequest {onreadystatechange: null, readyState: 4, timeout: 0, withCredentials: false, upload: XMLHttpRequestUpload, …}
      response: {data: {…}, status: 400, statusText: 'Bad Request', headers: AxiosHeaders, config: {…}, …}
      status: 400
      stack: "AxiosError: Request failed with status code 400\n    at settle (http://localhost:3000/static/js/bundle.js:28745:12)\n    at XMLHttpRequest.onloadend (http://localhost:3000/static/js/bundle.js:27392:66)\n    at Axios.request (http://localhost:3000/static/js/bundle.js:27891:41)"
      [[Prototype]]: Error
      */
      
      if(error.response && error.response.status === 400) {
        navigate("/success", {state: {message: error.response.data.message}});
      } else {
        console.error("Unexpected error: ", error);
        navigate("/failure", {state: {message: "An unexpected error occurred. Please try again."}});
      }
    });
  }
  return (
    <div className="relative w-[350px] h-[350px] border-black rounded-lg flex flex-col justify-around items-center z-10 transition duration-500 backdrop-blur-md bg-[rgba(0,0,0,0.2)] shadow-2xl p-1">
      <h1 className="text-2xl text-white font-medium my-2">Registration Page</h1>
      <form onSubmit={handleRSubmit} method="post" className="w-3/4 my-1">
        <input type="text" placeholder="Enter username" name="username" onChange={handleRUser} autoComplete="off" className="w-full px-4 py-2 mb-3 text-lg text-white border-transparent focus:border-2 focus:border-solid focus:border-[rgba(0,0,0,0.35)] bg-[rgba(0,0,0,0.25)] rounded-xl placeholder-[rgba(255,255,255,0.95)] outline-none font-normal transition-border duration-2000" />
        <br />
        <input type="text" placeholder="Enter password" name="password" onChange={handleRPassword} autoComplete="off" className="w-full px-4 py-2 mb-3 text-lg text-white border-transparent focus:border-2 focus:border-solid focus:border-[rgba(0,0,0,0.35)] bg-[rgba(0,0,0,0.25)] rounded-xl placeholder-[rgba(255,255,255,0.95)] outline-none font-normal transition-border duration-2000" />
        <br />
        {/* <div style={{ position: "relative", display: "inline-block" }}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter password"
            name="password"
            onChange={handleRPassword}
          />
          <span
            onClick={togglePasswordVisibility}
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              cursor: "pointer",
            }}
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div> */}
        <input
          type="text"
          placeholder="Confirm password"
          name="confirmPassword"
          onChange={checkPassword}
          autoComplete="off"
          className="w-full px-4 py-2 mb-3 text-lg text-white border-transparent focus:border-2 focus:border-solid focus:border-[rgba(0,0,0,0.35)] bg-[rgba(0,0,0,0.25)] rounded-xl placeholder-[rgba(255,255,255,0.95)] outline-none font-normal transition-border duration-2000"
        />
        {!isPasswordValid && <span className="text-red-300 text-base inline-block mb-2 text-center w-full">Passwords do not match</span>}
        <br />
        <input type="submit" disabled={!(isPasswordValid && rUser && rPassword && rCPassword)} style={{cursor: isPasswordValid ? "pointer" : "not-allowed"}} className="bg-blue-500 text-white w-full p-2 rounded-lg text-lg hover:bg-green-600" />
      </form>
      <p className="text-lg text-white">Already have an account? <Link to={"/"} className="text-blue-300 underline">Login</Link></p>
    </div>
  );
};

export default Registration;
