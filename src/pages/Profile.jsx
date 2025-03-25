import React, { useContext, useEffect, useState } from "react";
import { User } from "../contextApi.jsx/UserAuthApi";

function Profile() {
  const [data, setData] = useContext(User);
  const [myinfo, setMyInfo] = useState({});

  console.log(myinfo);

  async function handlemyinfo() {
    const response = await fetch("http://127.0.0.1:8000/singleuser", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${data}`,
      },
    });
    const result = await response.json();
    setMyInfo(result?.data);
  }

  useEffect(() => {
    handlemyinfo();
  }, []);

  return (
    <div className= " flex justify-center min-h-screen bg-gradient-to-r from-cream-500 to-blue-900 py-10 mt-15">
      <div className="bg-white shadow-lg rounded-lg p-6 w-80 sm:w-96 text-center transform transition-all hover:scale-105 hover:shadow-2xl">
        <h2 className="text-2xl font-bold text-purple-600">Welcome to Your Profile</h2>
        <p className="text-gray-600 mt-2">This is your colorful profile page.</p>

        {/* Profile Info */}
        <div className="mt-4 space-y-2">
          <p className="text-lg font-medium text-gray-700">{myinfo.name}</p>
          <p className="text-gray-600">{myinfo.email}</p>
          <p className="text-gray-600">{myinfo.phone}</p>
        </div>

        {/* Action Button */}
        <button className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition">
          Edit Profile
        </button>
      </div>
    </div>
  );
}

export default Profile;
