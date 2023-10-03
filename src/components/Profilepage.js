import React, { useEffect, useState } from "react";
import Coverphoto from "../icons/cover_photo.jpg"
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { db } from "./Firebase";
import {
  getDocs,
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import Post from "./Post";
import FlipMove from "react-flip-move";
import "../css/profile.css";

const Profile = () => {
  const user = useSelector(selectUser);
  const [posts, setPosts] = useState([]); // Initialize with an empty array

  useEffect(() => {
    const fetchData = async () => {
      const q = query(
        collection(db, "posts"),
        where("description", "==", "khatrishiva@gmail.com"), // Filter by the user's email
        orderBy("timestamp", "desc")
      );

      const snapshot = await getDocs(q);

      const postsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));

      setPosts(postsData);
    };

    fetchData(); // Call the asynchronous function to fetch data

    // No need to unsubscribe, as this is not a real-time listener
  }, [user]);

  // Wait for the data to be fetched before rendering
  if (posts.length === 0) {
    return <p>No posts found.</p>;
  }

  return (
    <div className="profile">

<div className="top__photo">
  <div className="cover__photo">
    {/* Your cover photo image goes here */}
    <img src= {Coverphoto} alt="Cover Photo" />
  </div>
  <div className="profile__photo">
    {/* Your profile photo image goes here */}
    <img src= {user.photoUrl} alt="Profile Photo" />
  </div>
</div>








      <div className="profile__posts">
        {posts === null ? (
          // Display a loading spinner while fetching data
          <div className="loading-spinner"></div>
        ) : posts.length === 0 ? (
          // Display a message if no posts are found
          <p>No posts found.</p>
        ) : (
          // Display posts when data is available
          <FlipMove>
            {posts.map(({ id, data }) => {
              const { name, description, message, photoUrl } = data || {};
              return (
                <Post
                  key={id}
                  name={name || ""}
                  description={description || ""}
                  message={message || ""}
                  photoUrl={photoUrl || ""}
                />
              );
            })}
          </FlipMove>
        )}
      </div>


    </div>
  );
};

export default Profile;
