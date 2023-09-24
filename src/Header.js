import React from 'react'
import './Header.css'
import SearchIcon from '@mui/icons-material/Search';
import LinkedinIcon from "./icons/Linkedin.png"
import HeaderOption from './HeaderOption';
import PeopleIcon from '@mui/icons-material/People';
import HomeIcon from '@mui/icons-material/Home';
import WorkIcon from '@mui/icons-material/Work';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useDispatch } from 'react-redux';
import {logout } from './features/userSlice'
import {auth } from './Firebase'; 


const Header = () => {
  
  const dispatch = useDispatch();

  const logoutOfApp = () =>{
    dispatch(logout())
    auth.signOut();
  }

  return (
    <div className='header'> 

    <div className="header__left">
        <img src = {LinkedinIcon}  alt="" />

        <div className="header__search">
            {/** Search Icon */}
            <SearchIcon/>
           
        
            <input type="text" />
        </div>

    </div>

    <div className="header__right">

        <HeaderOption Icon = {PeopleIcon} title ="Home"/>
        <HeaderOption Icon = {HomeIcon} title = "My network"/>
        <HeaderOption Icon = {WorkIcon} title = "Jobs"/>
        <HeaderOption Icon = {ChatIcon} title = "Messaging"/>
        <HeaderOption Icon = {NotificationsIcon} title = "Notifications"/>
        <HeaderOption
        avatar = {true}
        title = "Me"
        onClick={logoutOfApp}
        />

    </div>
    
    </div>
  )
}

export default Header