import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Verify from './pages/Verify';
import Navbar from './Components/Navlink';
import Profile from './pages/Profile';
import Blog from './pages/Blog';
import Logout from './pages/Logout';
import Footer from './Components/Footer';
import AddBlog from './pages/AddBlog';
import BlogDetails from './pages/BlogDetails';

function App() {
  return (
    <Router>
      
        {/* Navigation Bar
        <nav className="bg-white shadow-md w-full py-4 flex justify-center space-x-6 fixed top-0">
          <Link to="/" className="text-lg font-semibold text-gray-700 hover:text-blue-600 transition">Home</Link>
          <Link to="/login" className="text-lg font-semibold text-gray-700 hover:text-blue-600 transition">Login</Link>
          <Link to="/signup" className="text-lg font-semibold text-gray-700 hover:text-blue-600 transition">Sign Up</Link>
          <Link to="/verify" className="text-lg font-semibold text-gray-700 hover:text-blue-600 transition">Verify</Link>
        </nav> */} 
        <Navbar/>
        

        {/* Page Content */}

            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/verify" element={<Verify />} />
              <Route path="/profile" element={<Profile/>}/>
              <Route path="/blog" element={<Blog/>}/>
              <Route path="/logout" element={<Logout/>}/>
              <Route path="/addblog" element={<AddBlog/>}/>
              <Route path="/" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogDetails />} /> {/* Dynamic route for details */}
              <Route path="/addblog" element={<AddBlog />} />
              {/* <Route path="/*" element={<notfound/>}/> yo chai notfound ko code ho  */}

            </Routes>
          
        <Footer/>
      
    </Router>
  );
}

export default App;
