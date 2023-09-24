import React from "react";
import "../css/leftsidebar.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";

const Leftsidebar = () => {
  const user = useSelector(selectUser);
  return (
    <div className="left-sidebar">
      <div className="main__container">
        <div className="profile-info">
          <img
            src={user?.photoUrl}
            alt="User Profile"
            className="user-picture"
          />
          <p className="major">
            {" "}
            {user?.displayName} {/**Checks if there is user or not */}{" "}
          </p>
        </div>




        {/* Sidebar content */}

        <Link to="./profile" className="company-name">
          PROFILE
        </Link>

        
      </div>
    </div>
  );
};

export default Leftsidebar;
