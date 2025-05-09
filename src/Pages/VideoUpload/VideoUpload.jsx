import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./VideoUpload.css";
import YouTubeIcon from "@mui/icons-material/Youtube";
import axios from "axios";
import { toast } from "react-toastify";

const VideoUpload = () => {
  const navigate = useNavigate();
  const [uploadStatus, setUploadStatus] = useState({
    uploading: false,
    successMessage: "",
    field: "", // "thumbnail" or "videoLink"
  });

  const [inputVal, setInputVal] = useState({
    title: "",
    description: "",
    videoLink: "",
    videoType: "",
    thumbnail: "",
    category: "",
  });
  const handleInput = (e) => {
    setInputVal({
      ...inputVal,
      [e.target.name]: e.target.value,
    });

    // console.log('Uploading video with details:', {
    //   title,
    //   description,
    //   category,
    //   thumbnail,
    //   video,
    // });

    // alert('Video Uploaded Successfully!');
  };
  console.log(inputVal);

  // ------- handle Upload Image/Video Function ---------
  const handleUpload = async (e) => {
    console.log("wait image & video Uploading...");

    const file = e.target.files[0];
    console.log("Selected file: ", file);

    const fieldName = e.target.name; // "thumbnail" or "videoLink"

    // Extract resource type: "image" or "video"
    const resourceType = file.type.split("/")[0]; // Only use "image" or "video"

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "youtube-clone");

    setUploadStatus({ uploading: true, successMessage: "", field: fieldName });

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dvgyn0edj/${resourceType}/upload`,
        data
      );

      console.log("Uploaded content response: ", response.data);
      const url = response.data.url;
      console.log(url);

      // Update inputVal with thumbnail or video URL
      const fieldName = resourceType === "image" ? "thumbnail" : "videoLink";
      setInputVal((prev) => ({
        ...prev,
        [fieldName]: url,
        videoType: resourceType === "video" ? file.type : prev.videoType,
      }));

      setUploadStatus({
        uploading: false,
        successMessage: `${resourceType} uploaded successfully.`,
        field: fieldName,
      });
    } catch (error) {
      console.log(
        "content upload error: ",
        error.response?.data || error.message
      );

      setUploadStatus({
        uploading: false,
        successMessage: `Failed to upload ${resourceType}.`,
        field: fieldName,
      });
    }
    setTimeout(() => {
      setUploadStatus({ uploading: false, successMessage: "", field: "" });
    }, 3000); // optional auto-clear
  };

  // run when browser load first time
  useEffect(() => {
    const isLogin = localStorage.getItem("userId");
    if (!isLogin) {
      toast.error("Please login to upload video", { autoClose: 1000 });
      setTimeout(() => {
        navigate("/");
      }, 1000); // ⏳ Wait for 1 seconds before redirect
    }
  }, [navigate]);

  // ~~~~~~~ Handle Video Upload Submit ~~~~~~~~
  const handleVideoSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(`http://localhost:3000/api/video`, inputVal, {
       withCredentials: true
      })
      .then((res) => {
        console.log("Response: ", res);
        setInputVal({
          title: "",
          description: "",
          videoLink: "",
          videoType: "",
          thumbnail: "",
          category: "",
        });        
        navigate("/")
      })

      .catch((err) => {
        console.log("Error: ", err);
        // setInputVal(false)
      });
  };

  return (
    <div className="video-upload-container">
      <div className="heading">
        <YouTubeIcon sx={{ fontSize: "50px", color: "red" }} />
        <h2>Upload Video</h2>
      </div>
      <form className="video-upload-form">
        <input
          type="text"
          placeholder="Title of Video"
          name="title"
          value={inputVal.title}
          onChange={(e) => handleInput(e)}
          required
        />

        <textarea
          placeholder="Description"
          name="description"
          value={inputVal.description}
          onChange={(e) => handleInput(e)}
          required
        ></textarea>

        <input
          type="text"
          placeholder="Category"
          name="category"
          value={inputVal.category}
          onChange={(e) => handleInput(e)}
          required
        />

        <div className="file-input">
          <label>Choose Thumbnail:</label>
          <input
            type="file"
            name="thumbnail"
            accept="image/*"
            onChange={(e) => handleUpload(e)}
            required
          />
          {/* Status only for thumbnail upload */}
          {uploadStatus.uploading && uploadStatus.field === "thumbnail" && (
            <p className="uploading">Uploading, please wait...</p>
          )}
          {uploadStatus.successMessage &&
            uploadStatus.field === "thumbnail" && (
              <p className="upload-success">{uploadStatus.successMessage}</p>
            )}
        </div>

        <div className="file-input">
          <label>Choose Video:</label>
          <input
            type="file"
            name="videoLink"
            accept="video/mp4, video/webm, video/*"
            onChange={(e) => handleUpload(e)}
            required
          />
          {/* Status only for video upload */}
          {uploadStatus.uploading && uploadStatus.field === "videoLink" && (
            <p className="uploading">Uploading, please wait...</p>
          )}
          {uploadStatus.successMessage &&
            uploadStatus.field === "videoLink" && (
              <p className="upload-success">{uploadStatus.successMessage}</p>
            )}
        </div>

        <div className="button-group">
          <button onClick={handleVideoSubmit} type="submit">
            Upload
          </button>
          <button type="button" onClick={() => navigate("/")}>
            Home
          </button>
        </div>
      </form>
    </div>
  );
};

export default VideoUpload;
