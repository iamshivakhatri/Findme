import React, {useEffect, useState} from 'react'
// snapshot.docs is an object which stores all the documents in the collection
 

import "../css/Feed.css"
import InputOption from './InputOption';
import CreateIcon from '@mui/icons-material/Create';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import VideocamIcon from '@mui/icons-material/Videocam';
import EventIcon from '@mui/icons-material/Event';
import ArticleIcon from '@mui/icons-material/Article';
import Post from './Post'
import { db, auth } from './Firebase'; 
import { collection, onSnapshot, query, orderBy, addDoc, serverTimestamp } from 'firebase/firestore'; 
import { useSelector } from 'react-redux';
import {selectUser } from '../features/userSlice';
import FlipMove from 'react-flip-move';

/**
 * 
 * import FlipMove from 'react-flip-move';
 * 
 * cover the section with 
 *  <FlipMove>
 * </FlipMove>
 * 
 */


const Feed = () => {
    const user = useSelector(selectUser);
    const [input, setInput] = useState("")
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

    /** 

    useEffect(()=>{
        const unsubscribe = onSnapshot(collection(db, 'posts'), (snapshot) => {
            setPosts(
              snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data(),
              }))
            );
          });
    }, []);
    */

    const sendPost = async (e) => {
        e.preventDefault();
    
        try {
            await addDoc(collection(db, 'posts'), {
                name: user.displayName,
                description: user.email,
                message: input,
                photoUrl: user.photoUrl || '',
                timestamp: serverTimestamp()
            });
    
            setInput(""); // Clear the input field after posting
        } catch (error) {
            console.error('Error adding document: ', error);
        }
    };

  return (
    <div className="feed">
        <div className="feed__inputContainer">
            <div className="feed__input">
                <CreateIcon/>
           
            <form action="">
                <input 
                value = {input}
                type="text"
                onChange = {(e)=>{setInput(e.target.value)}}/>
                <button onClick={sendPost} type='submit'> Send</button>
            </form>
            </div>
            <div className="feed__inputOptions">
              Enter your thoughts
              </div>
            {/* <div className="feed__inputOptions">
                
                <InputOption Icon = {InsertPhotoIcon} title = "Photo" color = "#70B5F9"/>
                <InputOption Icon = {VideocamIcon} title = "Video" color = "#E7A33E"/>
                <InputOption Icon = {EventIcon} title = "Event" color = "#COCBCD"/>
                <InputOption Icon = {ArticleIcon} title = "Write Article" color = "#7FC15E"/>
            </div> */}

           

           


        </div>
         {/**Posts */}
         <FlipMove>
         {posts.map(({ id, data }) => {
    const { name, description, message, photoUrl } = data || {};
    return (
        <Post 
            key={id}
            id = {id}
            name={name || ""}
            description={description || ""}
            message={message || ""}
            photoUrl={photoUrl || ""}
        />
    );
})}

</FlipMove>
     
        

    </div>  
  )
}

export default Feed