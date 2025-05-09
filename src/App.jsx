import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/Home/home"; 
import {Route, Routes} from 'react-router-dom'
import Video from './Pages/Video/Video'
import Profile from './Pages/Profile/Profile'
import VideoUpload from './Pages/VideoUpload/VideoUpload'
import Login from "./Components/Auth/Login";
import SignUp from "./Components/Auth/SignUp";
import SearchResults from "./Components/SearchVideo/SearchResults.jsx";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import { useState, useEffect } from "react";
import axios from "axios";

function App() {

  // // all videos show on the home page
  // useEffect(() => {
  //   axios.get('http://localhost:3000/api/allVideo').then((res) => {
  //     console.log(res)
  //   })
  // }, [])

  // sidebar open close handler
  const [handleSidebar, setHandleSidebar] = useState(false)


  return (
    <div className="App">
      <Navbar setHandleSidebar={setHandleSidebar} handleSidebar={handleSidebar} />
      <Routes>
        <Route path="/" element= {<Home handleSidebar={handleSidebar} />} />
        <Route path='/watch/:id' element={<Video />} />
        <Route path='/user/:id' element={<Profile handleSidebar={handleSidebar} />} /> 
        <Route path='/:id/upload' element={<VideoUpload />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/search" element={<SearchResults />} />
      </Routes>
      <ToastContainer position="top-center" />
    </div>
  );
}

export default App;
