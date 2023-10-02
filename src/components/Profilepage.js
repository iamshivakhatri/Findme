import React, { useEffect, useState } from 'react';
import { db } from './Firebase';
import { collection, onSnapshot, query, orderBy, where } from 'firebase/firestore';

import Post from './Post';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import FlipMove from 'react-flip-move';
import '../css/profile.css';

const Profilepage = () => {
  const user = useSelector(selectUser);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!user || !user.email) {
          // Handle the case where user or user.email is not defined.
          return;
        }

        const q = query(
          collection(db, 'posts'),
          where('description', '==', user.email), // Filter posts by user's email
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

        return unsubscribe; // Unsubscribe from the snapshot listener when the component unmounts
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    // Check if user and user.email are defined before fetching data
    if (user && user.email) {
      fetchData();
    }
  }, [user]); // Add 'user' to the dependency array

  return (
    <div className="profilepage">
      <div className="main__container">

         {/* Cover Photo */}
         <div className="cover-photo">
          <img src="" alt="Cover Photo" />
        </div>

        {/* Profile Picture */}
        <div className="profile-picture">
          {user && user.photoUrl ? (
            <img src={user.photoUrl} alt="Profile Photo" />
          ) : (
            <span>No Profile Photo</span>
          )}
        </div>

        {/* User Information */}
        <div className="user-info">
          <h2>{user && user.displayName}</h2>
          <p>Friends</p>
          <p>Projects</p>
        </div>


        {/* ... (the rest of your component remains the same) */}
        {/* Feed Section */}
        <FlipMove>
          {posts.map(({ id, data }) => {
            const { name, description, message, photoUrl } = data || {};
            return (
              <Post
                key={id}
                name={name || ''}
                description={description || ''}
                message={message || ''}
                photoUrl={photoUrl || ''}
              />
            );
          })}
        </FlipMove>
        {/* ... (the rest of your component remains the same) */}
      </div>
    </div>
  );
};

export default Profilepage;
