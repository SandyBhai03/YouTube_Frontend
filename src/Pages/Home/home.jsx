import React from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import HomePage from "../../Components/HomePage/Homepage";
import "./home.css";


function home({ handleSidebar }) {
  return (
    <div className="home">
      <Sidebar handleSidebar={handleSidebar} />  { /* Sidebar component */}
      <HomePage handleSidebar={handleSidebar} /> { /* Homepage component */}
    </div>
  );
}

export default home;
