
import "../css/profile.css"
import React, { useState } from 'react';

const Profilepage = () => {
  const [userData, setUserData] = useState({
    username: '',
    displayName: '',
    bio: '',
    contactInfo: '',
    location: '',
    socialMediaLinks: '',
    projectShowcase: [],
    connectionStatus: {
      followers: 0,
      following: 0,
      mutualConnections: 0,
    },
    projectStats: {
      projectsPosted: 0,
      collaborationsInitiated: 0,
      projectViews: 0,
    },
    privacySettings: {},
    collaborationHistory: [],
    interests: [],
    skills: [],
    activityFeed: [],
    achievements: [],
    notifications: [],
    messages: [],
    customizationOptions: {},
  });

  return (
    <div className="profile-section">
      <div className="profile-header">
        <img src="profile-image-url" alt="Profile" />
        <h1>{userData.displayName}</h1>
        <p>@{userData.username}</p>
      </div>
      <div className="profile-details">
        <div className="profile-bio">
          <h2>Bio</h2>
          <p>{userData.bio}</p>
        </div>
        <div className="profile-contact">
          <h2>Contact Information</h2>
          <p>{userData.contactInfo}</p>
        </div>
        <div className="profile-location">
          <h2>Location</h2>
          <p>{userData.location}</p>
        </div>
        <div className="profile-social-media">
          <h2>Social Media Links</h2>
          <p>{userData.socialMediaLinks}</p>
        </div>
        {/* Add more sections for project showcase, connection status, project stats, etc. */}
      </div>
    </div>
  );
};

export default Profilepage;
