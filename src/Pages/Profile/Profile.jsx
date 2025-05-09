import React, { useState, useEffect } from "react";
import "./Profile.css";
import Sidebar from "../../Components/Sidebar/Sidebar";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function Profile({ handleSidebar }) {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [user, setUser] = useState(null);

  const fetchProfileData = async () => {
    await axios
      .get(`http://localhost:3000/api/${id}/channel`)
      .then((res) => {
        console.log(res.data.videos);
        setData(res.data?.videos);
        setUser(res.data?.videos[0]?.user);
        //console.log("Channel Admin details: ", res.data?.videos[0]?.user)
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  };

  useEffect(() => {
    fetchProfileData();
  }, []);
  return (
    <div className="profile">
      {/* Import Sidebar Component and reuse */}
      <Sidebar handleSidebar={handleSidebar} />

      <div className={handleSidebar ? "profile_page" : "profile_page_inactive"}>
        {/* User Profile and Their Details Container */}
        <div className="profile_top_section">
          {/* Profile img container */}
          <div className="profile_top_section_profile">
            <img
              className="profile_top_section_img"
              src={user?.profilePic}
              alt=""
            />
          </div>
          {/* user(profile) details container div */}
          <div className="profile_top_section_About">
            <div className="profile_top_section_About_Name">
              {user?.channelName}
            </div>{" "}
            {/* user Channel Name  */}
            <div className="profile_top_section_info">
              @{user?.userName} <span /> 198K subscribers <span /> {data.length}{" "}
              videos
            </div>
            <div className="profile_top_section_info">{user?.about}</div>
          </div>
        </div>
        {/* User Profile Bottom Part(Videos)👇 Section */}
        <div className="profile_videos">
          <div className="profile_videos_title">
            Video &nbsp; <ArrowRightIcon />
          </div>
          {/* All Uploaded Videos container div start here */}
          <div className="profileVideos">
            {/* ~~~~~ 1 uploaded video container div ~~~~ */}
            {data.map((item, idx) => {
              return (
                <Link
                  to={`/watch/${item._id}`}
                  key={idx}
                  className={
                    handleSidebar
                      ? "profileVideo_block"
                      : "profileVideo_block_WhenSidebarHide"
                  }
                >
                  <div className="profileVideo_block_thumbnail">
                    <img
                      className="profileVideo_block_thumbnail_img"
                      src={item?.thumbnail}
                      alt=""
                    />
                  </div>
                  <div className="profileVideo_block_detail">
                    <div className="profileVideo_block_detail_name">
                    {item?.title}
                    </div>
                    <div className="profileVideo_block_detail_about">
                      {"198K views"} <span/> {item?.user?.createdAt.slice(0, 10)}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
