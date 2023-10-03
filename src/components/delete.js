import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { db } from './Firebase';
import { onSnapshot, collection, query, where } from 'firebase/firestore';
import Post from './Post';
import FlipMove from 'react-flip-move';
import '../css/profile.css';

const Profilepage = () => {
  const [posts, setPosts] = useState([]);
  const user = useSelector(selectUser);

  useEffect(() => {
    const q = query(
      collection(db, 'posts'),
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });

    return () => {
      // Unsubscribe from the snapshot listener when the component unmounts
      unsubscribe();
    };
  }, []);

  return (
    <div className="profilepage">
      <div className="main__container">
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
      </div>
    </div>
  );
};

export default Profilepage;
