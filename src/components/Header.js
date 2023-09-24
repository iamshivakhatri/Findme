import React, {useState} from 'react'
import '../css/Header.css'
import SearchIcon from '@mui/icons-material/Search';
import LinkedinIcon from "../icons/Linkedin.png"
import FindmeIcon from "../icons/findmelogo.png"
import HeaderOption from './HeaderOption';
import PeopleIcon from '@mui/icons-material/People';
import HomeIcon from '@mui/icons-material/Home';
import WorkIcon from '@mui/icons-material/Work';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useDispatch } from 'react-redux';
import {logout } from '../features/userSlice'
import {auth } from './Firebase'; 
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'
import {selectUser } from '../features/userSlice';



const Header = () => {
  const user = useSelector(selectUser);

  const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);
  
  const dispatch = useDispatch();

  const logoutOfApp = () =>{
    setProfileDropdownOpen(false);
    dispatch(logout())
    auth.signOut();
  }
  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const closeProfileDropdown = () => {
    setProfileDropdownOpen(false);
  };

  const profileDropDown = () =>{

  }

  return (
    <div className='header'> 

    <div className="header__left">
      <Link to={"/"}>
        <img src = {FindmeIcon}  alt="" />
        </Link>

        <div className="header__search">
            {/** Search Icon */}
            <SearchIcon/>
           
        
            <input type="text" />
        </div>

    </div>

    <div className="header__right">
{/*         <Link to = "/profilepage">
        <HeaderOption Icon = {PeopleIcon} title ="Home"/>
        <HeaderOption Icon = {HomeIcon} title = "My network"/>
        <HeaderOption Icon = {WorkIcon} title = "Jobs"/>
        <HeaderOption Icon = {ChatIcon} title = "Messaging"/>
        <HeaderOption Icon = {NotificationsIcon} title = "Notifications"/>
  **/}
        

        <HeaderOption
        avatar = {true}
        title = "Me"
        photoUrl = {user?.photoUrl}
        onClick={toggleProfileDropdown}
        onMouseLeave={closeProfileDropdown}
        />

       {isProfileDropdownOpen && (
        <div className="dropdown">
          {/* Add notification content here */}
          <div className="profile-info">
          <p className="major"> {user?.displayName} {/**Checks if there is user or not */} </p>



        </div>

        <button className="signout-btn"  onClick={logoutOfApp}>Sign Out</button>
        </div>
      )}


    </div>
    
    </div>
  )
}

export default Header


/**
 * <HeaderOption
        avatar = {true}
        title = "Me"
        onClick={logoutOfApp}
        />
 */