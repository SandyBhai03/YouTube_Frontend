import React, { useState, useEffect } from "react";
import "./Video.css";
import { Link, useNavigate } from "react-router-dom";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import { formatViews } from "../../utils/formatViews.js";

import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function Video() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [comments, setComments] = useState([]);
  const [suggestedVideos, setSuggestedVideos] = useState([]);

  // fetch Video by ID from Database function
  const fetchVideoById = async () => {
    await axios
      .get(`http://localhost:3000/api/getVideoById/${id}`)
      .then((res) => {
        setData(res.data.video);
        //console.log("Response: ", res.data.video);
        setVideoUrl(res?.data?.video?.videoLink);
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  };

  // Get comment by videoID function
  const getCommentByVideoId = async () => {
    await axios
      .get(`http://localhost:3000/commentApi/comment/${id}`)
      .then((res) => {
        console.log("Response: ", res);
        const newComment = res.data.comments;
        setComments(newComment, ...comments);
        setMessage(" ");
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  };

  // useEffect run all the function when Browser Load
  useEffect(() => {
    // Reset state to force fresh re-render
    setData(null);
    setVideoUrl(null);
    setComments([]);

    fetchVideoById(); // fetch playing video details
    getCommentByVideoId(); // fetch comments for this video
    fetchSuggestionVideos();

    // Increase View Functionality
    const timer = setTimeout(() => {
      const addView = async () => {
        try {
          await axios.put(`http://localhost:3000/api/video/${id}/view`);
          console.log("View added successfully");
        } catch (err) {
          console.log("Failed to add view:", err);
        }
      };

      addView();
    }, 1000); // 15 seconds delay

    // Cleanup on component unmount
    return () => clearTimeout(timer);
  }, [id]);

  // Handle Comments Function
  const handleComment = async () => {
    const body = {
      message: message,
      video: id,
    };
    await axios
      .post(`http://localhost:3000/commentApi/comment`, body, {
        withCredentials: true,
      })
      .then((res) => {
        console.log("Response: ", res);
      })
      .catch((err) => {
        console.log("Error: ", err);
        toast.error("Please Login for add comment");
      });
  };

  // Get all videos in Suggestions Videos Function
  const fetchSuggestionVideos = async () => {
    await axios
      .get("http://localhost:3000/api/allVideo")
      .then((res) => {
        //console.log("Response: ", res.data.videos[0].user)
        setSuggestedVideos(res.data.videos);
        console.log(res.data.videos);
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  return (
    <div className="video">
      <div className="videoPostSection">
        <div className="video_youtube">
          {data && (
            <video
              key={videoUrl}
              className="video_youtube_video"
              width="400"
              muted
              controls
              autoPlay
            >
              <source src={videoUrl} type="video/mp4" />
              <source src={videoUrl} type="video/mp4" />
            </video>
          )}
        </div>
        <div className="video_youtubeAbout">
          <div className="video_uTubeTitle">{data?.title}</div>
          <div className="youtube_video_ProfileBlock">
            <div className="youtube_video_ProfileBlock_left">
              <Link
                to={`/user/${data?.user?._id}`}
                className="youtube_video_ProfileBlock_left_img"
              >
                <img
                  className="youtube_video_ProfileBlock_left_image"
                  src={data?.user?.profilePic}
                  alt="Image not Found"
                />
              </Link>
              <div className="youtubeVideo_subsView">
                <div className="youtubePostProfileName">
                  {data?.user?.channelName}
                </div>
                <div className="youtubePostProfileSubs">
                  {data?.user?.createdAt.slice(0, 10)}
                </div>
              </div>
              <div className="subscribeBtnYoutube">Subscribe</div>
            </div>
            <div className="youtube_video_likeBlock">
              <div className="youtube_video_likeBlock_Like">
                <ThumbUpOffAltIcon />
                <div className="youtube_video_likeBlock_NoOfLikes">
                  {data?.like}
                </div>
                <div className="youtubeVideoDivider"></div>
                <ThumbDownOffAltIcon />
                {/* <div className="youtube_video_likeBlock_NoOfLikes">{data?.dislike}</div> */}
              </div>
            </div>
          </div>
          {/* 👇 video description div */}
          <div className="youtube_video_About">
            <div className="viewsAndDate">
              <span>{formatViews(data?.views)} views</span>
              <span>{data?.createdAt.slice(0, 10)}</span>
            </div>
            <div>{data?.description}</div>
          </div>
        </div>
        {/* Commwnt Section (container)👇start here*/}
        <div className="youtubeCommentSection">
          <div className="youtubeCommentSectionTitle">
            {comments.length < 1 ? "No" : comments.length} Comments :-
          </div>
          <div className="youtubeSelfComment">
            <img
              className="video_youtubeSelfCommentProfile"
              src="https://i.pinimg.com/474x/af/e4/9d/afe49d5b9210b6f74742b34ebec9af28.jpg"
              alt=""
            />
            <div className="addAComment">
              <input
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
                type="text"
                className="addAcommentInput"
                placeholder="write a comment"
              />
              <div className="cancelSubmitComment">
                <div className="cancelComment">Cancel</div>
                <div onClick={handleComment} className="cancelComment">
                  Comment
                </div>
              </div>
            </div>
          </div>
          {/* other commented section */}
          <div className="youtubeOthersComments">
            {/* Add cooments dynamically from database */}
            {comments.map((comment, idx) => {
              return (
                <div className="youtubeSelfComment" key={idx}>
                  {/* use same class for reuse design*/}
                  <img
                    className="video_youtubeSelfCommentProfile"
                    src={comment?.user?.profilePic}
                    alt=""
                  />
                  <div className="others_commentSection">
                    <div className="others_commentSectionHeader">
                      <div className="channelName_comment">
                        {comment?.user?.channelName}
                      </div>
                      <div className="commentTimingOthers">
                        {comment?.createdAt.slice(0, 10)}
                      </div>
                    </div>
                    <div className="otherCommentSectionComment">
                      {comment.message}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 👇All suggested Videos container */}
      <div className="videoSuggestions">
        {suggestedVideos.map((video, idx) => {
          const isVideoPlaying = video._id === id;
          return (
            <Link
              to={`/watch/${video._id}`}
              className="videoSuggestionsBlock"
              key={idx}
            >
              <div
                className={`thumbnail_overlay ${
                  isVideoPlaying ? "thumbnail_overlay-red" : ""
                }`}
              ></div>{" "}
              {/*Gray and red layer*/}
              <div className="video_suggetion_thumbnail">
                <img
                  className="video_suggetion_thumbnail_img"
                  src={video?.thumbnail}
                  alt=""
                />
                {/* <video src={video?.videoLink} muted /> */}
              </div>
              <div className="video_suggetions_About">
                <div className="video_suggetions_About_title">
                  {video?.title}
                </div>
                <div className="video_suggetions_About_Profile">
                  {video?.user?.channelName}
                </div>
                <div className="video_suggetions_About_Profile">
                  {formatViews(video?.views)} views <span /> 1 day ago
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Video;
