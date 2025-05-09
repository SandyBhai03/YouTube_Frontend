import React from "react";
import { Link } from "react-router-dom";
import "./VideoCard.css"; 
import { formatViews     } from "../../utils/formatViews";

const VideoCard = ({ video }) => {
  return (
    <Link to={`/video/${video._id}`} className="video-card-link">
     <img src={video.thumbnail} alt={video.title} className="video-thumbnail" />
      <div className="video-card">
        <div className="video-info">
          <span className="video-title">{video.title}</span>
          <span className="video-channel">{video.user?.channelName}</span>
          <span className="video-meta">
          {formatViews(video.views)} • {new Date(video.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;
