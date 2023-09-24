import React from 'react'
import './HeaderOption.css'
import { Avatar } from '@mui/material'
import { useSelector } from 'react-redux'
import {selectUser } from './features/userSlice';

const HeaderOption = ({avatar, Icon, title, onClick}) => {
  const user = useSelector(selectUser);
  return (
    <div onClick = {onClick} className='headerOption'>
        {Icon && <Icon className = "headerOption__icon"/>}
        {avatar && (
            <Avatar className='headerOption__icon' >
              {user?.email[0]} {/**Checks if there is user or not */}
           </Avatar>
        )}
        <h3 className='headerOption__title'> {title}</h3>

    </div>
  )
}

export default HeaderOption