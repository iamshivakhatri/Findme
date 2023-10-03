import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { db } from './Firebase';
import { getDocs, collection, onSnapshot, query, orderBy, where } from 'firebase/firestore';
import Post from './Post';
import FlipMove from 'react-flip-move';
import Coverphoto from '../icons/cover_photo.jpg';
import '../css/profile.css';

const Profilepage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector(selectUser);

  useEffect(() => {
    const q = query(
      collection(db, 'posts'),
      where('email', '==', 'khatrishiva@gmail.com'),
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
