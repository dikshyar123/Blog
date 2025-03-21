import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../contextApi.jsx/UserAuthApi";

function Blog() {
  const navigate = useNavigate();
  const [data, setData] = useContext(User);
  const [blog, setBlog ]=  useState([]);
  console.log(blog);
    async function blogname(){
      // e.preventDefault(); yo ni button ko bela matra chahinxa re 
      const response = await fetch("http://127.0.0.1:8000/blog",{
        method:"GET",
        headers: {
          Authorization: `Bearer ${data}`,
        },
       
      });
     const result=await response.json()
     setBlog(result?.data );
    
    }
    useEffect(()=>{
      blogname();

    },[])
    // Function to handle image click and navigate to details page
  const goToDetails = (data) => {
    navigate(`/blog/${data?._id}`, {
      state:data
    });
  };

  return (
    <div className=" min-h-screen bg-gradient-to-r from-green-400 to-blue-500 py-5 mt-10" >
      
    <div className=" shadow-xl rounded-2xl p-8 text-center ">
      <h2 className="text-2xl font-extrabold text-blue-600">Welcome to the Blog</h2>
      <button
        onClick={() => navigate("/addblog")}
        className=" mt-4 mb-4 px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-all"
      >
        Add Blog
      </button>
      <div className="gap-4 flex flex-wrap justify-center" >
      {blog?.map((item,index)=>(
        <div
        key={index}
        className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition duration-300 w-[300px] hover:scale-105 hover:shadow-2xl"
          >
        

        {/* Image */}
        <img onClick={() => goToDetails(item)} // Add click handler
          src={`http://127.0.0.1:8000/${item.image}`}
          alt="Blog Cover"
          className="w-full h-48 object-cover rounded-lg  border border-white/30"
        />
        <h2 className="text-2xl font-bold text-black">{item.title}</h2>
        <p className="text-sm text-gray-600">Posted By: <span className="font-semibold">{item.postBy.name}</span></p>
        <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">{item.description}</p>
        {/* <p>blog:{item.blog.name}</p> */}
        </div>
      ))}
      </div>
      
    </div>
  </div>
  

  );
}

export default Blog;
