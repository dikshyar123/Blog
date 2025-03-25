import React, { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

function SignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister(e) {
    e.preventDefault();
    setLoading(true);
    const response = await fetch("http://127.0.0.1:8000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        phone: number,
        password: password,
      }),
    });
    setLoading(false);
    const result = await response.json();
    console.log(result);
    if (result.status) {
      toast.success(result.message);
      navigate("/verify");
    } else {
      toast.error(result?.message);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-cream-500 to-blue-900 ">
      <div className="bg-white shadow-xl rounded-lg p-8 w-96">
        <h1 className="text-3xl font-semibold text-center text-gray-700 mb-6">Sign Up</h1>
        <form onSubmit={handleRegister} className="flex flex-col gap-6">
          <input
            type="text"
            placeholder="Name"
            className="border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:border-teal-500"
            required
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:border-teal-500"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Phone"
            className="border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:border-teal-500"
            required
            onChange={(e) => setNumber(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:border-teal-500"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="bg-teal-500 text-white py-3 rounded-lg font-semibold transition-all hover:bg-teal-600 focus:outline-none"
          >
            {loading ? "Loading..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
