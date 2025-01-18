import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Login = () => {
    const [eUsername, setEUsername] = useState("");
    const [ePassword, setEPassword] = useState("");
    const [displayMessage, setDisplayMessage] = useState(false);

    const navigate = useNavigate();

    let handleUsername = (evt) => {
        let tempUsername = evt.target.value;
        setEUsername(tempUsername);
    }

    let handlePassword = (evt) => {
        let tempPassword = evt.target.value;
        setEPassword(tempPassword);
    }

    let handleSubmit = (event) => {
        event.preventDefault();

        axios.post("http://localhost:5000/login", {username: eUsername, password: ePassword})
        .then(function(response) {
            if(response.status === 200) {
                navigate("/success", {state: {message: response.data.message}});
            }
        })
        .catch(function(error) {
            if(error.response) {
                const {data, status} = error.response;
                if(status === 401) {
                    setDisplayMessage(true);
                } else if(status === 404){
                    navigate("/failure", {state: {message: data.message}});
                }
            }else {
                console.error("Unexpected error: ", error);
                navigate("/failure", {state: {message: "An unexpected error occurred. Please try again."}});
            }
        });
    }

    return (
        <div className="container relative w-[350px] h-[350px] border-black rounded-lg flex flex-col justify-around items-center z-10 transition duration-500 backdrop-blur-md bg-[rgba(0,0,0,0.2)] shadow-2xl p-4">
            <h1 className="text-2xl text-white font-medium my-2">Login Page</h1>
            <form method="post">
                <input type="text" placeholder="Enter username" name="username" onChange={handleUsername} className="w-full px-4 py-2 mb-3 text-lg text-white border-transparent focus:border-2 focus:border-solid focus:border-[rgba(0,0,0,0.35)] bg-[rgba(0,0,0,0.25)] rounded-xl placeholder-[rgba(255,255,255,0.95)] outline-none font-normal transition-border duration-2000" autoComplete="off"/>
                <br />
                <input type="text" placeholder="Enter password" name="password" onChange={handlePassword} className="w-full px-4 py-2 mb-3 text-lg text-white border-transparent focus:border-2 focus:border-solid focus:border-[rgba(0,0,0,0.35)] bg-[rgba(0,0,0,0.25)] rounded-xl placeholder-[rgba(255,255,255,0.95)] outline-none font-normal transition-border duration-2000" autoComplete="off"/>
                <br />
                <p className="text-red-300 text-base inline-block mb-2 text-center w-full">{displayMessage && "Password mismatch. Please enter correct password."}</p>
                <input type="submit" disabled={!(eUsername && ePassword)} style={{cursor: "pointer"}} onClick={handleSubmit} className="bg-blue-500 text-white w-full p-2 rounded-lg text-lg hover:bg-green-600" />
            </form>
            <p className="text-lg text-white">Don't have an account? <Link to={"/registration"} className="text-blue-300 underline">Register</Link></p>
        </div>
    );
}

export default Login;