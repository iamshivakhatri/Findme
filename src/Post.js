import { Avatar } from '@mui/material'
import React, { useState, forwardRef } from 'react'
import './Post.css'

import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import InputOption from './InputOption';
import CommentIcon from '@mui/icons-material/Comment';
import ShareIcon from '@mui/icons-material/Share';
import SendIcon from '@mui/icons-material/Send';
//yarn add react-flip-move
//forwardRef helps to add animation
//import {forwardRef} from 'react'

const Post = forwardRef(({name, description, message, photoUrl}, ref) => {

 
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

    
       </div>
       <div className="post__body">
        <p> {message}</p>

       </div>

       <div className="post__buttons">
       <InputOption Icon = {ThumbUpIcon} title = "Like" color = "#70B5F9"/>
       <InputOption Icon = {CommentIcon} title = "Comment" color = "#70B5F9"/>
       <InputOption Icon = {ShareIcon} title = "Share" color = "#70B5F9"/>
       <InputOption Icon = {SendIcon} title = "Send" color = "#70B5F9"/>
       </div>

        </div>
  )
})

export default Post