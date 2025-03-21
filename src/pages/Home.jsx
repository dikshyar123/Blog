import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [allblogs, setAllBlogs] = useState([]);

  async function allblog() {
    const response = await fetch("http://127.0.0.1:8000/allblogs", {
      method: "GET",
    });
    const result = await response.json();
    setAllBlogs(result?.data);
  }

  useEffect(() => {
    allblog();
  }, []);
 // Function to handle image click and navigate to details page
 const goToDetails = (data) => {
  navigate(`/blog/${data?._id}`, {
    state:data
  });
};
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-purple-600 py-10 mt-15">
      {/* Page Heading */}
      <div className="text-center mb-10">
        <h1 className="text-5xl font-extrabold text-white drop-shadow-lg">
          Explore Amazing Blogs ✨
        </h1>
        <p className="text-gray-200 mt-2 text-lg">Read and get inspired by stories from around the world.</p>
      </div>

      {/* Blog List */}
      <div className="gap-4 flex flex-wrap justify-center ">
        {allblogs?.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition duration-300 w-[300px] hover:scale-105 hover:shadow-2xl"
          >
            {/* Blog Image */}
            <div className="w-full h-48">
              <img onClick={() => goToDetails(item)} // Add click handler
                src={`http://127.0.0.1:8000/${item.image}`}
                alt="Blog Cover"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Blog Content */}
            <div className="p-5">
              <h2 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h2>
              <p className="text-sm text-gray-600">Posted By: <span className="font-semibold">{item.postBy.name}</span></p>
              <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
// className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4"