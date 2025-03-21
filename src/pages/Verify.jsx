import React, { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

function Verify() {
  const navigate = useNavigate();
  const [otp, setOpt] = useState(undefined);
  async function handleHandler(e) {
    e.preventDefault();
    const response = await fetch("http://127.0.0.1:8000//otpverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ otp: otp }),
    });
    const result = await response.json();
    console.log(result);
    if (result.status) {
      // yo chai local storage ko code ho yesma chai k garcha bhane chai login bhayesi aru page na dekhaune store garera rakhxa
      localStorage.setItem("auth", result?.token);
      toast.success(result.message);
      navigate("/login");
    } else {
      toast.error(result.message);
    }
  }
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold">Verify Your Account</h1>
      <p className="mt-2 text-gray-600">
        Enter the verification code sent to your email.
      </p>
      <form className="flex flex-col gap-4 mt-4">
        <input
          type="number"
          placeholder="Verification Code"
          className="border p-2 rounded"
          required
          onChange={(e) => setOpt(e.target.value)}
        />
        <button
          onClick={handleHandler}
          className="bg-yellow-500 text-white p-2 rounded"
        >
          Verify
        </button>
      </form>
    </div>
  );
}

export default Verify;