import React, { useEffect, useState } from 'react';
import { db } from './Firebase';
import { collection, onSnapshot, query, orderBy, where } from 'firebase/firestore';

import Post from './Post';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import FlipMove from 'react-flip-move';
import Coverphoto from '../icons/cover_photo.jpg';
import '../css/profile.css';

const Profilepage = () => {
  const user = useSelector(selectUser);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user?.email) { // Use optional chaining to check user.email
          const q = query(
            collection(db, 'posts'),
            where('description', '==', user.email),
            orderBy('timestamp', 'desc')
          );

          const unsubscribe = onSnapshot(q, (snapshot) => {
            setPosts(
              snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data(),
              }))
            );
            setLoading(false); // Set loading to false when data is fetched
          });

          return unsubscribe;
        } else {
          setLoading(false); // Set loading to false if user.email is not available
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
        setLoading(false); // Set loading to false in case of an error
      }
    };

    fetchData(); // Always fetch data when the component mounts
  }, [user]);

  return (
    <div className="profilepage">
      <div className="main__container">
        {/* Cover Photo */}
        <div className="cover-photo">
          <img src={Coverphoto} alt="Cover Photo" />
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

        {/* Loading Indicator */}
        {loading ? (
          <p>Loading...</p>
        ) : (
          // Feed Section
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
        )}
      </div>
    </div>
  );
};

export default Profilepage;
