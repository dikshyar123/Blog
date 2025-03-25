import React, { useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { User } from "../contextApi.jsx/UserAuthApi";


function BlogDetails() {
  const [data, setData] = useContext(User);
  const data1 = useLocation();
  const state = data1?.state;
  const [comment, setComment] = useState("");
  const [editId, setEditId] = useState(null);
  // Delete comment
  const deleteComment = async (id) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/deletecomment/{state?._id}", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${data}`,
        },
        body: JSON.stringify({
          commentId: id,
        }),
      });
  
      if (response.ok) {
        getComment(); // Refresh comments after deletion
      } else {
        const errorData = await response.json();
        console.error("Failed to delete comment:", errorData);
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };
  

  // Update comment
  const updateComment = async () => {
    const response = await fetch("http://127.0.0.1:8000/updatecomment", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data}`,
      },
      body: JSON.stringify({
        commentId: editId,
        title: comment,
      }),
    });
    const result = await response.json();
    setEditId(null);
    setComment("");
    getComment();
  };

  // add
  const addComment=async()=>{
    const response=await fetch("http://127.0.0.1:8000/addcomment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:`Bearer ${data}`,
      },
      body: JSON.stringify({
        title: comment,
        blog: state?._id,
      }),
    });
    const result=await response.json();
    console.log(result);
    setComment("");
    // jun jun naya comment enter garcha afai aucha getcomment gareu bhanen refresh garirakhnu pardaina
    getComment();
  };
  // get
  const [comments, setComments] = useState([]);
  const getComment = async () => {
    const response = await fetch(
      `http://127.0.0.1:8000/blogcomment/${state?._id}`,
      {
        method:"GET",
      }
    );
    const result = await response.json();
    setComments(result?.data);
  };
  useEffect(() => {
    getComment();
  }, []);
  return (
    <div className="max-w-3xl  py-20  p-8 m-4 bg-white  rounded-lg">
      {/* {/ Blog Image /} */}
      <img
        src={`http://127.0.0.1:8000/${state.image}`}
        alt="Blog Cover"
        className="w-[300px] py-3.5 h-64 object-cover rounded-lg border border-gray-200 shadow-md"
      />

      {/* {/ Blog Title & Content /} */}
      <h1 className="text-3xl font-bold text-gray-800 mt-4">{state.title}</h1>
      <p className="text-gray-600 mt-2">{state.description}</p>
      <p className="mt-4  text-gray-700 leading-relaxed">{state.content}</p>

      {/* {/ Comment Section /} */}
      <div className="mt-6 flex items-center space-x-3">
        <input
          type="text"
          placeholder="Write a comment..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
          onChange={(e)=>setComment(e.target.value)}
          value={comment}
        />
        {editId ? (
          <button
            onClick={updateComment}
            className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
          >
            Update
          </button>
        ) : (
        <button
          onClick={addComment}
          className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition"
        >
          Done
        </button>
        )}
      </div>
      {/* {/ fetch comment /} */}
      {comments.map((item) => (
       <div key={item._id} className="mt-4 p-3 border rounded-lg shadow">
       <h1 className="text-lg font-semibold">{item.title}</h1>
       <div className="mt-2 flex space-x-2">
         <button
           onClick={() => {
             setEditId(item._id);
             setComment(item.title);
           }}
           className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
         >
           Edit
         </button>
         <button
           onClick={() => deleteComment(item._id)}
           className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
         >
           Delete
         </button>
       </div>
     </div>
   ))}
    </div>
  );
}

export default BlogDetails;