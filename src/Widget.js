import React from 'react'
import "./Widget.css"

import CircleIcon from '@mui/icons-material/Circle';
import InfoIcon from '@mui/icons-material/Info';

const Widget = () => {
  const newsArticle = (heading, subtitle) => (
    <div className="widgets__article">
      <div className="widgets__articleLeft">
        <CircleIcon className='bulletIcon'/>
      </div>
      <div className="widgets__articleRight">
        <h4> {heading} </h4>
        <p> {subtitle} </p>
      </div>
    </div>
  )
  return (
    <div className='widget'> 
     <div className="widgets__header">
      <h2>LinkedIn News</h2>
      <InfoIcon/>

     </div>
     {newsArticle("New linkedin", "Shiva Khatri made new linkedin app")}
    </div>
  )
}

export default Widget