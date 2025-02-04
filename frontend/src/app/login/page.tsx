'use client';
import React, { useState } from 'react';
import Modal from '../../components/modal';
import {redirect} from 'next/navigation'

const LoginSignup = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);

  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [signupUsername, setSignupUsername] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');

  const [loginStatus, setLoginStatus] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginMessage, setLoginMessage] = useState("");

  const [signupStatus, setSignupStatus] = useState(false);
  const [signupLoading, setSignupLoading] = useState(false);
  const [signupMessage, setSignupMessage] = useState("");

  const handleLoginClick = () => setIsLoginMode(true);
  const handleSignupClick = () => setIsLoginMode(false);

  const handleCloseModal = () => {
    if(loginStatus || signupStatus){
      redirect("/browsebooks");
    }
    setLoginMessage("");
    setSignupMessage("");
  }

  const handleLoginSubmit = async (event : React.FormEvent) => {
    event.preventDefault();
    try{
      setLoginLoading(true)
      const payload = {
        username: loginUsername,
        password: loginPassword
      }

      const response = await fetch("https://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      const data = await response.json()

      if(data.result === "1"){
        setLoginStatus(true)
        setLoginMessage("Login Successfull")
        setLoginUsername('');
        setLoginPassword('');
      }
      else if(data.result === "0"){
        setLoginStatus(false)
        setLoginMessage("Username and Password don't match")
      }

    } catch(error){
      console.error("Error: ", error)
    } finally {
      setLoginLoading(false)
    }
  };

  const handleSignupSubmit = async (event : React.FormEvent) => {
    event.preventDefault();
    try{
      setSignupLoading(true)
      const payload = {
        username: signupUsername,
        password: signupPassword,
        confirm_password: signupConfirmPassword
      }

      const response = await fetch("https://localhost:8080/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      const data = await response.json()

      if(data.result === "1"){
        setSignupStatus(true)
        setSignupMessage("Registration Successfull")
        setSignupUsername('');
        setSignupPassword('');
        setSignupConfirmPassword('');
      }
      else if(data.result === "0"){
        setSignupStatus(false)
        setSignupMessage("Two passwords don't match")
      }
      else if(data.result === "2"){
        setSignupStatus(false)
        setSignupMessage("Username is already taken")
      }

    } catch(error){
      console.error("Error: ", error)
    } finally {
      setSignupLoading(false)
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="w-full max-w-md p-6 bg-gray-900 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold text-center">Welcome to SKLib</h1>
        <p className="text-sm text-center text-gray-400 mb-4">Login or create an account to get started</p>

        <div className="flex justify-center mb-4">
          <button
            onClick={handleLoginClick}
            className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
              isLoginMode ? 'bg-gray-700 text-white' : 'bg-gray-800 text-gray-400'
            }`}
          >
            Login
          </button>
          <button
            onClick={handleSignupClick}
            className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
              !isLoginMode ? 'bg-gray-700 text-white' : 'bg-gray-800 text-gray-400'
            }`}
          >
            Register
          </button>
        </div>

        {isLoginMode ? (
          <div>
            <form onSubmit={handleLoginSubmit}>
              <div className="mb-4">
                <label className="block text-sm">Username</label>
                <input
                  type="text"
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                  placeholder="Enter your Username"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm">Password</label>
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <button type="submit" disabled={loginLoading} className="w-full bg-blue-600 py-2 rounded-lg text-white font-medium hover:bg-blue-700">{loginLoading ? "Logging in..." : "Login"}</button>
            </form>
            {loginMessage && <Modal message={loginMessage} onClose={handleCloseModal}/>}
          </div>
        ) : (
          <div>     
            <form onSubmit={handleSignupSubmit}>
              <div className="mb-4">
                <label className="block text-sm">Username</label>
                <input
                  type="text"
                  value={signupUsername}
                  onChange={(e) => setSignupUsername(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                  placeholder="Enter your Username"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm">Password</label>
                <input
                  type="password"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm">Confirm Password</label>
                <input
                  type="password"
                  value={signupConfirmPassword}
                  onChange={(e) => setSignupConfirmPassword(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                  placeholder="Confirm your password"
                  required
                />
              </div>
              <button type="submit" disabled={signupLoading} className="w-full bg-green-600 py-2 rounded-lg text-white font-medium hover:bg-green-700">{signupLoading ? "Registering..." : "Register"}</button>
            </form>
            {signupMessage && <Modal message={signupMessage} onClose={handleCloseModal}/>}
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginSignup;