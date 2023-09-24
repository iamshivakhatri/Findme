import React from 'react'
import '../css/HeaderOption.css'
import { Avatar } from '@mui/material'
import { useSelector } from 'react-redux'
import {selectUser } from '../features/userSlice';

const HeaderOption = ({avatar, Icon, title, onClick, photoUrl}) => {
  const user = useSelector(selectUser);
  return (
    <div onClick = {onClick} className='headerOption'>
        {Icon && <Icon className = "headerOption__icon"/>}

        {photoUrl ? (
        <Avatar className='headerOption__icon' src={photoUrl} />
      ) : avatar ? (
        <Avatar className='headerOption__icon'>
          {user?.email[0]} {/* Checks if there is a user or not */}
        </Avatar>
      ) : null /* Added null as fallback */}

       



        <h3 className='headerOption__title'> {title}</h3>

    </div>
  )
}

export default HeaderOption