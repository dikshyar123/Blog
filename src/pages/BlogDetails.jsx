import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

function BlogDetails() {
  const data=useLocation()
  const state=data?.state
  const { id } = useParams();  // Get the blog ID from the URL
  

  return (
    <div className="max-w-3xl  py-20  p-8 m-4 bg-white  rounded-lg">
    {/* Blog Image */}
    <img
      src={`http://127.0.0.1:8000/${state.image}`}
      alt="Blog Cover"
      className="w-[300px] py-3.5 h-64 object-cover rounded-lg border border-gray-200 shadow-md"
    />
  
    {/* Blog Title & Content */}
    <h1 className="text-3xl font-bold text-gray-800 mt-4">{state.title}</h1>
    <p className="text-gray-600 mt-2">{state.description}</p>
    <p className="mt-4  text-gray-700 leading-relaxed">{state.content}</p>
  
    {/* Comment Section */}
    <div className="mt-6 flex items-center space-x-3">
      <input
        type="text"
        placeholder="Write a comment..."
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
      />
      <button className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition">
        Done
      </button>
    </div>
  </div>
  )  
}

export default BlogDetails;
