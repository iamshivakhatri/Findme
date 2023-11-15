import { Avatar } from '@mui/material'
import React, { useState, forwardRef } from 'react'
import '../css/Post.css'

import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import InputOption from './InputOption';
import CommentIcon from '@mui/icons-material/Comment';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'; 
import { useSelector } from 'react-redux';
import {selectUser } from '../features/userSlice';
import { deleteDoc, doc } from 'firebase/firestore';
import { db} from './Firebase'; 
import EditPostModal from './EditPostModal';
import { updateDoc } from 'firebase/firestore';

//yarn add react-flip-move
//forwardRef helps to add animation
//import {forwardRef} from 'react'

const Post = forwardRef(({id, name, description, message, photoUrl}, ref) => {
  const user = useSelector(selectUser);
  const [optionsOpen, setOptionsOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);


  const toggleOptions = () => {
    setOptionsOpen(!optionsOpen);
  };

  const handleDelete = async (id) => {
    try {
      // Reference to the post document
      const postRef = doc(db, 'posts', id);
      console.log('Deleting post with ID: ', id)
  
      // Delete the post document
      await deleteDoc(postRef);
  
      // After deleting, you may want to update the state or perform other actions
  
      console.log('Post deleted successfully');
    } catch (error) {
      console.error('Error deleting post: ', error.message);
    }
  };
  

  const handleEdit = (id) => {
    setEditModalOpen(true);
  }

  const handleEditModalSave = async (editedMessage) => {
    try {
      const postRef = doc(db, 'posts', id);
      await updateDoc(postRef, {
        message: editedMessage,
      });
      console.log(`Post ${id} edited successfully`);
    } catch (error) {
      console.error('Error editing post: ', error.message);
    } finally {
      setEditModalOpen(false);
    }
  };


 
  return (
    <div  ref = {ref} className='post'>
       <div className="post__header">
        <Avatar src = {photoUrl}>
          {name[0]}
        </Avatar>
        <div className="post__info">
          <h2>{name}</h2>
          <p> {description}</p>
        </div>
      

        <div className="post__dots" onClick={toggleOptions}>
          <MoreHorizIcon />
        </div>

       
        {optionsOpen && (
            <div className="post__options">
              <p className = "post__option" onClick={() => handleEdit(id)}>Edit Post</p>
              <p className = "post__option" onClick={() => handleDelete(id)}>Delete Post</p>
            </div>
          )}

       <EditPostModal
        id = {id}
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        onSave={handleEditModalSave}
        initialMessage={message}
      />

          
      
        

    
       </div>
       <div className="post__body">
        <p> {message}</p>

       </div>

       <div className="post__buttons">
       <InputOption Icon = {ThumbUpIcon} title = "Like" color = "#70B5F9"/>
       <InputOption Icon = {CommentIcon} title = "Comment" color = "#70B5F9"/>
       {/* <InputOption Icon = {ShareIcon} title = "Share" color = "#70B5F9"/>
       <InputOption Icon = {SendIcon} title = "Send" color = "#70B5F9"/> */}
       </div>

        </div>
  )
})

export default Post