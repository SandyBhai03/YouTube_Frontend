import React from "react";
import "./Sidebar.css";
import HomeIcon from "@mui/icons-material/Home";
import { SiYoutubeshorts } from "react-icons/si";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import HistoryIcon from "@mui/icons-material/History";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import SmartDisplayOutlinedIcon from "@mui/icons-material/SmartDisplayOutlined";
import WatchLaterOutlinedIcon from "@mui/icons-material/WatchLaterOutlined";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ContentCutIcon from "@mui/icons-material/ContentCut";

function Sidebar({ handleSidebar }) {
  return (
    <div className={handleSidebar ? "home-sidebar" : "homeSidebarHide"}>
      <div className="home_sidebarTop">
        <div className={`home_sidebarTopOption`}>
          <HomeIcon />
          <div className="home_sidebarTopOptionTitle">Home</div>
        </div>
        <div className={`home_sidebarTopOption`}>
          <SiYoutubeshorts style={{ fontSize: "22px" }} />
          <div className="home_sidebarTopOptionTitle">Shorts</div>
        </div>
        <div className={`home_sidebarTopOption`}>
          <SubscriptionsIcon />
          <div className="home_sidebarTopOptionTitle">Subscriptions</div>
        </div>
      </div>

      {/* Sidebar Middle part start here */}
      <div className="home_sidebarMiddle">
        <div className={`home_sidebarTopOption`}>
          <div className="home_sidebarTopOptionTitle">You</div>
          <ChevronRightIcon />
        </div>
        <div className={`home_sidebarTopOption`}>
          <RecentActorsIcon />
          <div className="home_sidebarTopOptionTitle">Your Channel</div>
        </div>
        <div className={`home_sidebarTopOption`}>
          <HistoryIcon />
          <div className="home_sidebarTopOptionTitle">History</div>
        </div>
        <div className={`home_sidebarTopOption`}>
          <PlaylistAddIcon />
          <div className="home_sidebarTopOptionTitle">Playlist</div>
        </div>
        <div className={`home_sidebarTopOption `}>
          <SmartDisplayOutlinedIcon />
          <div className="home_sidebarTopOptionTitle">Your videos</div>
        </div>
        <div className={`home_sidebarTopOption `}>
          <WatchLaterOutlinedIcon />
          <div className="home_sidebarTopOptionTitle">Watch later</div>
        </div>
        <div className={`home_sidebarTopOption `}>
          <ThumbUpAltOutlinedIcon />
          <div className="home_sidebarTopOptionTitle">Liked Videos</div>
        </div>
        <div className={`home_sidebarTopOption }`}>
          <ContentCutIcon />
          <div className="home_sidebarTopOptionTitle">Your clips</div>
        </div>
      </div>

      {/* Sidebar Bottom Section start here */}
      <div className="home_sidebarMiddle">
        <div className="home_sidebarTopOption">
          <div className="home_sidebarTopOptionTitleHeader">Subscription</div>
        </div>
        <div className="home_sidebarTopOption">
                    <img className='home_sidebar_ImgLogo' src='https://www.medianews4u.com/wp-content/uploads/2020/04/Aaj-Tak-2.jpg' />
                    <div className="home_sidebarTopOptionTitle">Sheryians Coding...</div>
                </div>


                <div className="home_sidebarTopOption">
                    <img className='home_sidebar_ImgLogo' src="https://i.pinimg.com/474x/fb/6c/1f/fb6c1f3561169051c01cfb74d73d93b7.jpg" />
                    <div className="home_sidebarTopOptionTitle">Chai aur Code</div>
                </div>

                <div className="home_sidebarTopOption">
                    <img className='home_sidebar_ImgLogo' src="https://i.pinimg.com/474x/fb/6c/1f/fb6c1f3561169051c01cfb74d73d93b7.jpg" />
                    <div className="home_sidebarTopOptionTitle">NDTV India</div>
                </div>
      </div>
    </div>
  );
}

export default Sidebar;
