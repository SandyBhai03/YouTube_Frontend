import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import MenuIcon from "@mui/icons-material/Menu";
import YoutubeIcon from "@mui/icons-material/Youtube";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonIcon from "@mui/icons-material/Person";
import axios from "axios";

function Navbar({ setHandleSidebar, handleSidebar }) {
  const [searchTerm, setSearchTerm] = useState("");

  // search videos function
  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    navigate(`/search?q=${searchTerm}`);
  };
  const navigate = useNavigate();
  const [loginUser, setLoginUser] = useState(false);
  const [userPic, setUserPic] = useState(
    "https://i.pinimg.com/originals/2c/47/d5/2c47d5dd5b532f83bb55c4cd6f5bd1ef.jpg"
  );
  const [navbarModal, setNavbarModal] = useState(false);

  // Visit User Channel Function and close modal
  const handleProfile = () => {
    let userId = localStorage.getItem("userId");
    navigate(`/user/${userId}`);
    setNavbarModal(false);
  };

  useEffect(() => {
    const profilePic = localStorage.getItem("profilePic");
    const userId = localStorage.getItem("userId");

    if (userId && profilePic) {
      setLoginUser(true);
      setUserPic(profilePic);
    } else {
      setLoginUser(false);
      setUserPic(
        "https://i.pinimg.com/originals/2c/47/d5/2c47d5dd5b532f83bb55c4cd6f5bd1ef.jpg"
      );
    }
  }, []);

  // navigate to login page and closed modal
  const handleLogin = async () => {
    navigate("/login");
    // const userId = localStorage.getItem("userId");
    // const profilePic = localStorage.getItem("profilePic");
    // setUserPic(profilePic);
    setNavbarModal(false);
    setLoginUser(true);
    //redirect or reload
    window.location.reload();
  };
  // Logout User and closed modal
  const handleLogout = async () => {
    try {
      await axios.post(
        `http://localhost:3000/auth/logout`,
        {},
        { withCredentials: true }
      );

      localStorage.clear(); // Clear user data
      setTimeout(() => {
        setLoginUser(false); // Update login state
        setUserPic(
          "https://i.pinimg.com/originals/2c/47/d5/2c47d5dd5b532f83bb55c4cd6f5bd1ef.jpg"
        ); // Default image
        setNavbarModal(false); // Close modal
        navigate("/");
        window.location.reload();
      }, 1000);
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <div className="navbar">
      <div className="navbar-left">
        <div className="navbarHamburger">
          <MenuIcon
            onClick={() => setHandleSidebar(!handleSidebar)}
            sx={{ color: "white" }}
          />
        </div>
        <Link to={"/"} className="navbar_youtubeImg">
          <YoutubeIcon
            sx={{ fontSize: "34px" }}
            className="navbar_youtubeImage"
          />
          <div className="navbar_utubeTitle">YouTube</div>
        </Link>
      </div>

      {/* Navbar Middle Part */}
      <div className="navbar-middle">
        <div className="navbar_searchBox">
          <input
            type="text"
            placeholder="Search"
            className="navbar_searchBoxInput"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <div onClick={handleSearch} className="navbar_searchIconBox">
            <SearchIcon sx={{ fontSize: "28px", color: "white" }} />{" "}
          </div>
        </div>
        <div className="navbar_mike">
          <KeyboardVoiceIcon sx={{ color: "white" }} />
        </div>
      </div>

      {/* Navbar Right Part Start Here */}
      <div className="navbar_right ">
        <Link to={"/11111/upload"}>
          <VideoCallIcon
            className="navbar_right-icons"
            sx={{
              fontSize: "42px",
              color: "white",
              cursor: "pointer",
              padding: "7px",
            }}
          />
        </Link>
        <NotificationsIcon
          className="navbar_right-icons"
          sx={{
            fontSize: "40px",
            color: "white",
            cursor: "pointer",
            padding: "7px",
          }}
        />
        <img
          onClick={() => setNavbarModal(!navbarModal)}
          src={userPic}
          alt="Logo Image"
          className="navbar-right-logo"
        />

        {/* Navbar modal  */}
        {navbarModal && (
          <div className="navbar_modal">
            {loginUser ? (
              <>
                <div onClick={handleProfile} className="navbar_modal_option">
                  Profile
                </div>
                <div onClick={handleLogout} className="navbar_modal_option">
                  Logout
                </div>
              </>
            ) : (
              <div onClick={handleLogin} className="navbar_modal_option">
                Login
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
