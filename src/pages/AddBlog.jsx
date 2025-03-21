import React, { useContext, useState } from "react";
import { User } from "../contextApi.jsx/UserAuthApi";
import { toast } from "react-toastify";


function AddBlog() {
  const [data] = useContext(User);
  console.log(data);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  async function handleBlog(e) {
    // yo chai form data ko code ho yedi image cha bhane append garnai lai use garch 
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("hi", image);
    e.preventDefault();
    const response = await fetch("http://127.0.0.1:8000/addblog", {
      method: "POST",
      headers: {
        // image bhayo bhane yo content type ko code ni chahidaina
        // "Content-type": "application/json",
        Authorization: `Bearer ${data}`,
      },
      body: formData,
      });
    const result = await response.json();
    console.log(result);
    toast(result?.message)
  }

  return (
    <form className="  flex py-30 mb-20 flex-col items-center mt-9 gap-4 p-4 border border-gray-300 rounded-lg shadow-md max-w-md mx-auto">
  <input
    type="text"
    placeholder="Title"
    onChange={(e) => setTitle(e.target.value)}
    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
  />
  <input
    type="text"
    placeholder="Description"
    onChange={(e) => setDescription(e.target.value)}
    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
  />
  <input
    type="file"
    placeholder="Image"
    onChange={(e) => setImage(e.target.files[0])}
    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
  />
  <button
    onClick={handleBlog}
    className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
  >
    Add Blog
  </button>
</form>

  );
}

export default AddBlog;