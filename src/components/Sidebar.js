import { Avatar } from '@mui/material'
import React from 'react'
import "../css/Sidebar.css"
import { useSelector } from 'react-redux'
import { selectUser } from '../features/userSlice'

const Sidebar = () => {
    const user = useSelector(selectUser);
    const recentItem = (topic) => (
        <div className="sidebar__recentItem">
            <span className="sidebar__hash">
            #
            </span>

            <p>{topic}</p>
        </div>


    );
  return (
    <div className='sidebar'> 
        <div className="sidebar__top">
            <img src="https://images.unsplash.com/photo-1494500764479-0c8f2919a3d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80" alt="" />
            <Avatar src = {user.photoUrl} className='sidebar__avatar'>
                {user.email[0]}
            </Avatar>
            <h2>{user.displayName}</h2>
            <h4>{user.email}</h4>
        </div>  

        <div className="sidebar__stats">
            <div className="sidebar__stat">
                <p>Who viewed you? </p>
                <p className='sidebar__statNumber'> 2,543 </p>
            </div>
            <div className="sidebar__stat">
                <p>Views on post </p>
                <p className='sidebar__statNumber'> 2,200 </p>
            </div>
        </div>

        <div className="sidebar__bottom">
            <p>Recent</p>
            {recentItem("react js")}
            {recentItem("programming")}
            {recentItem("sofware engineering")}
            {recentItem("design")}
            {recentItem("developer")}

        </div>
        

        
        
    </div>
  )
}

export default Sidebar