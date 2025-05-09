import { Link, useNavigate } from "react-router-dom";
import "./Auth.css"; // External CSS
import YouTubeIcon from "@mui/icons-material/Youtube";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { CircularProgress } from "@mui/material";

// handle empty input fields message
const requiredFields = [
  { name: "channelName", message: "Please enter a Channel Name." },
  { name: "userName", message: "Please enter a User Name." },
  { name: "userEmail", message: "Please enter an Email." },
  { name: "password", message: "Please enter a Password." },
  { name: "about", message: "Please tell us about your channel." },
  { name: "profilePic", message: "Please upload a Profile Image." },
];

const SignUp = () => {
  const navigate = useNavigate();
  const [signUpProgressBar, setSignUpProgressBar] = useState(false); // for progress bar handle
  const [imgProgressBar, setImgProgressBar] = useState(false); // for image progress bar
  const [uploadedImgUrl, setUploadedImgUrl] = useState(
    "https://i.pinimg.com/474x/fb/6c/1f/fb6c1f3561169051c01cfb74d73d93b7.jpg"
  );
  const [inputVal, setInputVal] = useState({
    channelName: "",
    userName: "",
    userEmail: "",
    password: "",
    profilePic: "",
    about: "",
  });

  // ~~~~~ handle input and set input value function ~~~~~~
  const handleInput = (e) => {
    setInputVal({
      ...inputVal,
      [e.target.name]: e.target.value,
    });
  };
  console.log(inputVal);

  // ~~~~~~~  handle Upload Image Function ~~~~~~~
  const handleUploadImage = async (e) => {
    console.log("wait image Uploading...");
    setImgProgressBar(true);
    const file = e.target.files[0]; // Selected file from input
    console.log("Seclected file: ", file);

    const data = new FormData(); // Create form data

    // ----- Add file -----
    data.append("file", file);

    // ----- Add upload preset -----
    data.append("upload_preset", "youtube-clone"); //presetName = "youtube-clone"

    // for (let pair of data.entries()) { // print the data value
    //   console.log(`${pair[0]}:`, pair[1]);
    // }

    // ----- Send to Cloudinary -----
    try {
      // Cloud name = "dvgyn0edj"
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dvgyn0edj/image/upload",
        data
      );
      console.log("Uploaded image response: ", response.data);
      const imageUrl = response.data.url; // get uploaded image url from response

      setInputVal((prev) => ({ ...prev, profilePic: imageUrl })); // set imgUrl to input handler
      setUploadedImgUrl(imageUrl); // set uploaded imageUrl in uploaded state (uploaded image box)
      setImgProgressBar(false); // stop img progress bar
    } catch (error) {
      console.log(
        "Image upload error: ",
        error.response?.data || error.message
      );
      setImgProgressBar(false);
    }
  };

  // ~~~~~~~ handle SignUp Functinality ~~~~~~~
  const handleSignUp = async (e) => {
    e.preventDefault();
    let hasEmptyFields = false;

    // run Error toast if any input field are empty
    for (const field of requiredFields) {
      if (field.name === "profilePic") {
        if (!inputVal[field.name]) {
          // Check profilePic
          toast.error(field.message);
          hasEmptyFields = true;
          break;
        }
      } else if (!inputVal[field.name]?.trim()) {
        // other all input field checking
        toast.error(field.message);
        hasEmptyFields = true;
        break;
      }
    }
    // return and nothing do when field empty
    if (hasEmptyFields) {
      return;
    }

    // empty input field handle
    // if(!inputVal.channelName.trim() || !inputVal.userName.trim() || !inputVal.userEmail.trim() || !inputVal.password.trim() || !inputVal.about.trim() || !inputVal.profilePic.trim()){
    //   toast.error("Please fill all Input fields");
    //   return;
    // }
    setSignUpProgressBar(true);
    console.log("Button clicked");
    await axios
      .post(`http://localhost:3000/auth/signup`, inputVal)
      .then((res) => {
        console.log(res);

        toast.success("Account created successfully!");
        setSignUpProgressBar(false);

        // Reset the input fields
        setInputVal({
          channelName: "",
          userName: "",
          userEmail: "",
          password: "",
          profilePic: "",
          about: "",
        });
        navigate("/") // navigate to homepage when user registered
      })
      .catch((err) => {
        console.log("Error: ", err);
        toast.error("Failed to create account.");
        setSignUpProgressBar(false);
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
          <h2>Create Account</h2>
        </div>

        <form>
          <input
            type="text"
            onChange={(e) => handleInput(e)}
            name="channelName"
            value={inputVal.channelName}
            placeholder="Channel Name"
            required
          />
          <input
            type="text"
            onChange={(e) => handleInput(e)}
            name="userName"
            value={inputVal.userName}
            placeholder="UserName"
            required
          />
          <input
            type="email"
            onChange={(e) => handleInput(e)}
            name="userEmail"
            value={inputVal.userEmail}
            placeholder="Email"
            required
          />
          <input
            type="password"
            onChange={(e) => handleInput(e)}
            name="password"
            value={inputVal.password}
            placeholder="Password"
            required
          />
          <textarea
            onChange={(e) => handleInput(e)}
            name="about"
            value={inputVal.about || ""} // Initialize with empty string
            placeholder="Tell us About Your Channel"
          />
          <div className="profile-img-container">
            <input
              type="file"
              accept="image/*"
              onChange={handleUploadImage}
              name="profilePic"
              required
              disabled={imgProgressBar}
            />
            {imgProgressBar && (
              <CircularProgress
                className="imgProgressBar"
                size={38}
                color="inherit"
              />
            )}
            {/* Show uploaded image */}
            <img
              className="channelProfileImg"
              src={uploadedImgUrl}
              alt="Profile Image"
            />
          </div>
          <button
            onClick={(e) => handleSignUp(e)}
            type="submit"
            disabled={signUpProgressBar}
          >
            {signUpProgressBar ? (
              <CircularProgress size={26} color="primary" />
            ) : (
              "Sign Up"
            )}
          </button>
        </form>
        <p>
          Already have an account?{" "}
          <Link to="/login" className="link">
            Login
          </Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
