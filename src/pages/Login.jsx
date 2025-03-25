import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { User } from '../contextApi.jsx/UserAuthApi';

function Login() {
  const [data, setData] = useContext(User);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState("");

  async function handleRegister(e) {
    e.preventDefault();
    setLoading(true);
    const response = await fetch("http://127.0.0.1:8000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    setLoading(false);
    const result = await response.json();
    if (result.status) {
      toast.success(result.message);
      navigate("/home");
      localStorage.setItem('auth', result?.token)
      setData(result?.token);
    } else {
      toast.error(result?.message);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-cream-500 to-blue-900 ">
      <div className="bg-white shadow-xl rounded-lg p-8 w-96">
        <h1 className="text-3xl font-bold text-center text-gray-700 mb-6">Login</h1>
        <form onSubmit={handleRegister} className="flex flex-col gap-6">
          <input
            type="email"
            placeholder="Email"
            className="border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:border-indigo-500"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:border-indigo-500"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white py-3 rounded-lg font-semibold transition-all hover:bg-indigo-700 focus:outline-none"
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500">
            Don't have an account?{" "}
            <a href="/signup" className="text-indigo-600 hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
