import React, {useEffect, useState} from 'react'
import { db, auth } from './Firebase'; 
import { collection, onSnapshot, query, orderBy, addDoc, serverTimestamp } from 'firebase/firestore'; 

import Post from './Post'
import { useSelector } from 'react-redux'
import {selectUser } from '../features/userSlice';
import FlipMove from 'react-flip-move';


const Profilepage = () => {
  const user = useSelector(selectUser);
  const [posts, setPosts] = useState([{

  }]);

  useEffect(() => {
    const q = query(
      collection(db, 'posts'),
      orderBy('timestamp', 'desc')
    );
  
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);


  return (
    <div className="user-profile">
      {/* Cover Photo */}
      <div className="cover-photo">
        <img src= "" alt="Cover Photo" />
      </div>

      {/* Profile Picture */}
      <div className="profile-picture">
        <img src={user.photoUrl} alt="Profile Photo" />
      </div>

      {/* User Information */}
      <div className="user-info">
        <h2>{user.displayName}</h2>
        <p>Friends</p>
        <p> Projects</p>
      </div>

      {/* Navigation Tabs */}
      <div className="navigation-tabs">
        {/* Add navigation tabs here */}
      </div>

      {/* Feed Section */}
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

      {/* About Section */}
      <div className="about">
        {/* Include user's bio, skills, interests, contact information, etc. */}
      </div>

      {/* Collaborations and Projects Section */}
      <div className="collaborations">
        {/* Include user's collaborations and projects */}
      </div>

      {/* Edit Profile Button */}
      <button className="edit-profile-button">Edit Profile</button>

      {/* Privacy Controls */}
      <div className="privacy-controls">
        {/* Add privacy settings here */}
      </div>

      {/* Activity and Notifications */}
      <div className="activity">
        {/* Display recent activity and notifications */}
      </div>

      {/* User Actions */}
      <div className="user-actions">
        {/* Include buttons for friend request, follow, message, etc. */}
      </div>
    </div>
  );
};

export default Profilepage;
