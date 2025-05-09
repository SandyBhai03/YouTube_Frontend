import React, { useEffect, useState } from "react";
import "./HomePage.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { formatViews } from "../../utils/formatViews.js";

function Homepage({ handleSidebar }) {
  const [data, setData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  // all videos show on the home page
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/allVideo")
      .then((res) => {
        //console.log("Response: ", res.data.videos[0].user)
        setData(res.data.videos);
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  }, []);

  const categories = [
    "All",
    "Shorts",
    "Videos",
    "Unwatched",
    "Watched",
    "Recently Uploaded",
    "Cricket",
    "Music",
    "Live",
    "Entertainment",
    "Gaming",
    "Debates",
    "Coding",
    "Democracy",
    "Web Development",
    "Comedy",
    "News",
    "Sports",
    "Technology",
    "Travel",
    "Food",
    "Education",
    "Movies",
    "Full Stack",
    "Subscription",
    "Interviews",
    "Science",
    "Art & Culture",
    "Business & Finance",
    "Health & Fitness",
    "Fashion",
    "Automobiles",
    "Animation",
    "Short Films",
    "World Affairs",
  ];

  const videos = [
    {
      id: "11111",
      thumbnail:
        "https://i.pinimg.com/736x/37/dd/eb/37ddeb9646f5f22de8cda18b0c18c064.jpg",
      duration: "28:05",
      title: "User 1",
      channel: "User1",
      likes: "1 like",
      profilePic:
        "https://i.pinimg.com/736x/37/dd/eb/37ddeb9646f5f22de8cda18b0c18c064.jpg",
    },
  ];

  //  get Filtered videos based on category
  const filteredVideos =
    selectedCategory === "All"
      ? data
      : data.filter(
          (video) =>
            video?.category
              .toLowerCase()
              .includes(selectedCategory.toLowerCase()) ||
            video.user.channelName
              .toLowerCase()
              .includes(selectedCategory.toLowerCase())
        );

  return (
    <div className={handleSidebar ? "homePage" : "fullHomePage"}>
      {/* Category Options */}
      <div className="homePage_options_container">
        <div
          className={`homePage_options ${
            handleSidebar ? "sidebar-open-options" : ""
          }`}
        >
          {categories.map((item, idx) => (
            <div
              className={`homePage_option ${
                selectedCategory === item ? "active" : ""
              }`}
              key={idx}
              onClick={() => setSelectedCategory(item)}
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Videos */}
      <div
        className={handleSidebar ? "home_mainPage" : "home_mainPageWithoutLink"}
      >
        {/* Diplay Videos on Homepage */}
        {filteredVideos.length === 0 ? (
          <p className="no-videos-message">
            No Videos Matches!
          </p>
        ) : (
          filteredVideos.map((item, idx) => (
            <Link to={`/watch/${item._id}`} className="youtube_video" key={idx}>
              <div className="youtube_thumbnailBox">
                <img
                  src={item.thumbnail}
                  alt="Video Thumbnail"
                  className="youtube_thumbnailPic"
                />
                <div className="youtube_timingThumbnail">{item.duration}</div>
              </div>
              <div className="youtubeTitleBox">
                <div className="youtubeTitleBoxProfile">
                  <img
                    className="youtube_thumbnail_Profile"
                    src={item.user.profilePic}
                    alt="Channel Profile"
                  />
                </div>
                <div className="youtubeTitleBox_Title">
                  <div className="youtube_videoTitle">{item?.title}</div>
                  <div className="youtube_channelName">
                    {item?.user.channelName}
                  </div>
                  <div className="youtube_video_views"> {formatViews(item.views)} views <span /> 1 day ago</div>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

export default Homepage;
