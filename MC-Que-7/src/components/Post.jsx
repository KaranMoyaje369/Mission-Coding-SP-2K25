import React, { useState, useEffect } from "react";
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";

const Post = () => {
  // State management
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);
  const [userReaction, setUserReaction] = useState(0); // 0: neutral, 1: liked, -1: disliked.

  // Load reaction from local storage on component mount
  useEffect(() => {
    const savedReaction = localStorage.getItem("userReaction");
    if (savedReaction) {
      setUserReaction(Number(savedReaction));
    }
  }, []);

  // Save reaction to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("userReaction", userReaction);
  }, [userReaction]);

  // Handle like button click
  const handleLike = () => {
    if (userReaction === 1) {
      // If already liked, unlike
      setLikeCount((prev) => prev - 1);
      setUserReaction(0);
    } else {
      // If disliked, switch to like
      if (userReaction === -1) {
        setDislikeCount((prev) => prev - 1);
      }
      setLikeCount((prev) => prev + 1);
      setUserReaction(1);
    }
  };

  // Handle dislike button click
  const handleDislike = () => {
    if (userReaction === -1) {
      // If already disliked, undislike
      setDislikeCount((prev) => prev - 1);
      setUserReaction(0);
    } else {
      // If liked, switch to dislike
      if (userReaction === 1) {
        setLikeCount((prev) => prev - 1);
      }
      setDislikeCount((prev) => prev + 1);
      setUserReaction(-1);
    }
  };

  return (
    <div className="post-container">
      <div className="post">
        <h2
          style={{ marginBottom: "2rem", fontWeight: "bold", color: "purple" }}
        >
          This is an amazing React tutorial!
        </h2>
        <div className="reaction-buttons">
          {/* Like Button */}
          <button
            className={`like-btn ${userReaction === 1 ? "active" : ""}`}
            onClick={handleLike}
            disabled={userReaction === 1 && likeCount === 0} // Prevent rapid clicks
          >
            <AiOutlineLike /> {likeCount}
          </button>

          {/* Dislike Button */}
          <button
            className={`dislike-btn ${userReaction === -1 ? "active" : ""}`}
            onClick={handleDislike}
            disabled={userReaction === -1 && dislikeCount === 0} // Prevent rapid clicks
          >
            <AiOutlineDislike /> {dislikeCount}
          </button>
        </div>
        <div className="reaction-message">
          {userReaction === 1 && <p>You Liked this post!</p>}
          {userReaction === -1 && <p>You Disliked this post!</p>}
        </div>
      </div>
    </div>
  );
};

export default Post;
