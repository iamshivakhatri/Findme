import React, { useEffect, useState } from "react";
import Coverphoto from "../icons/cover_photo.jpg";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { db } from "./Firebase";
import {
  getDocs,
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import Post from "./Post";
import FlipMove from "react-flip-move";
import "../css/profile.css";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import MenuIcon from '@mui/icons-material/Menu';
import DeleteIcon from '@mui/icons-material/Delete';
import ProfileModal from "./ProfileModal";
import { Edit } from "@mui/icons-material";
import BioEditModal from './BioEditModal';

const Profile = () => {
  const user = useSelector(selectUser);
 
  console.log("This is the user from the prop",user);
  const [posts, setPosts] = useState([]); // Initialize with an empty array

  const [editMode, setEditMode] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({ ...user }); // Initialize with user data

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [profileInfo, setProfileInfo] = useState({
    name: "Shiva Khatri",
    email: "shivakhatri@example.com",
    location: "City, Country",
    interests: "Web Development, Reading, Fitness",
    university: "ABC University",
    major: "Computer Science",
    graduationDate: "May 2023",
    // Add other fields as needed
  });
  
  const [bio, setBio] = useState("This is my bio");
  const [isBioEditModalOpen, setIsBioEditModalOpen] = useState(false);

  const handleOpenBioEditModal = () => {
    setIsBioEditModalOpen(true);
  };

  const handleCloseBioEditModal = () => {
    setIsBioEditModalOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const q = query(
          collection(db, "posts"),
          where("description", "==", user.email), // Use user.email for the query
          orderBy("timestamp", "desc")
        );

        const snapshot = await getDocs(q);

        const postsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));

        setPosts(postsData);
      }
    };

    fetchData();
  }, [user]);


  // useEffect(() => {
  //   const fetchData = async () => {
  //     const q = query(
  //       collection(db, "posts"),
  //       where("description", "==", "khatrishiva@gmail.com"), // Filter by the user's email
  //       orderBy("timestamp", "desc")
  //     );

  //     const snapshot = await getDocs(q);

  //     const postsData = snapshot.docs.map((doc) => ({
  //       id: doc.id,
  //       data: doc.data(),
  //     }));


  //     setPosts(postsData);
  //   };
  //   console.log("This is user inside the useeffect", user);  

  //   fetchData(); // Call the asynchronous function to fetch data
  //   console.log("This is user after fetchdata", user);  

  //   // No need to unsubscribe, as this is not a real-time listener
  // }, [user]);

  // Wait for the data to be fetched before rendering
  if (posts.length === 0) {
    return <p>No posts found.</p>;
  }
  

  const handleModalSave = (editedProfileInfo) => {
    setProfileInfo(editedProfileInfo);
    setUpdatedUser({ ...updatedUser, ...editedProfileInfo });
    // Save changes to the database if needed
  };

  

  return (
    <div className="profile">
      <div className="top__photo">
        <div className="cover__photo">
          {/* Your cover photo image goes here */}
          <img src={Coverphoto} alt="Cover Photo" />
        </div>
        <div className="profile__photo">
          {/* Your profile photo image goes here */}
          <img src={user.photoUrl} alt="Profile Photo" />
        </div>
      </div>

      <div className="profile__info">
         {/* ... (existing code) */}

        {/* Add an "Edit" button for other user information */}
        <ProfileModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleModalSave}
          profileInfo={profileInfo}
        />

        <div className="profile__info-left">
          <h1>{profileInfo.name}</h1>
          <p>{profileInfo.email}</p>
          <p>Location: {profileInfo.location}</p>

          <p>Interests/Hobbies: {profileInfo.interests}</p>
        </div>
        <div className="profile__info-right">
          <br />
          <p>School/University: {profileInfo.university}</p>
          <p>Major: {profileInfo.major}</p>
          <p>Graduation Year: {profileInfo.graduationDate}</p>
          <p>{user?.bio}</p>
        </div>
        <div className="profile__logo">
          
          <p>
            <a href={user?.linkedin} target="_blank" rel="noopener noreferrer">
              <LinkedInIcon />
            </a>
          </p>
          <p>
            <a href={user?.github} target="_blank" rel="noopener noreferrer">
              <GitHubIcon />
            </a>
          </p>
          
        </div>
        <div>
           <MenuIcon onClick={() => setIsModalOpen(true)} />
          </div>

      </div>

      <div className="profile__bio">
  <p>{bio}</p>
  <div>
    <MenuIcon onClick={handleOpenBioEditModal} />
    <DeleteIcon onClick={() => setBio("Please Write Your Bio")} />
  </div>
</div>

{/* Bio Edit Modal */}
<BioEditModal
  isOpen={isBioEditModalOpen}
  onClose={handleCloseBioEditModal}
  onSave={(newBio) => setBio(newBio)}
  initialBio={bio}
/>


      <div className="profile__posts">
        {posts === null ? (
          // Display a loading spinner while fetching data
          <div className="loading-spinner"></div>
        ) : posts.length === 0 ? (
          // Display a message if no posts are found
          <p>No posts found.</p>
        ) : (
          // Display posts when data is available
          <FlipMove>
            {posts.map(({ id, data }) => {
              const { name, description, message, photoUrl } = data || {};
              return (
                <Post
                  key={id}
                  name={name || ""}
                  description={description || ""}
                  message={message || ""}
                  photoUrl={photoUrl || ""}
                />
              );
            })}
          </FlipMove>
        )}
      </div>
    </div>
  );
};

export default Profile;
