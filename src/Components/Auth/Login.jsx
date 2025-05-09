import "./Auth.css"; // External CSS
import YouTubeIcon from "@mui/icons-material/Youtube";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { CircularProgress } from "@mui/material";

const Login = () => {
  const navigate = useNavigate();
  const [inputVal, setInputVal] = useState({ userNameOrEmail: "", password: "" });
  const [progressBar, setProgressBar] = useState(false);
  const handleInput = (e) => {
    setInputVal({
      ...inputVal,
      [e.target.name]: e.target.value,
    });
  };
  // console.log(inputVal)

  // handle Login Functinality function
  const handleLogin = async (e) => {
    e.preventDefault();
    setProgressBar(true);
    console.log("btn clicked!");
    await axios
      .post("http://localhost:3000/auth/login", inputVal, {
        withCredentials: true,
      })
      .then((res) => {
        console.log("Response: ", res);
        setProgressBar(false);
        localStorage.setItem("token", res.data?.token);
        localStorage.setItem("userId", res?.data?.user?._id);
        localStorage.setItem("profilePic", res?.data?.user?.profilePic);
        navigate("/");
        //window.location.reload();
      })
      .catch((err) => {
        toast.error("Invalid Credentials");
        setProgressBar(false);
        console.log("Error: ", err);
      });
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <Link to={`/`}>
          <CloseIcon className="close" />
        </Link>
        <div className="heading">
          <YouTubeIcon sx={{ fontSize: "50px", color: "red" }} />
          <h2>Sign In</h2>
        </div>
        <form>
          <input
            onChange={(e) => handleInput(e)}
            value={inputVal.userNameOrEmail}
            name="userNameOrEmail"
            type="text"
             placeholder="Enter Email or Username"
            required
            autoFocus
          />
          <input
            onChange={(e) => handleInput(e)}
            value={inputVal.password}
            name="password"
            type="password"
            placeholder="Password"
            required
            disabled={progressBar}
          />
          <button type="submit" onClick={handleLogin}>
            {" "}
            {progressBar ? (
              <CircularProgress size={26} color="primary" />
            ) : (
              "Sign In"
            )}
          </button>
        </form>
        <p>
          Don't have an account?{" "}
          <Link to="/signup" className="link">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
