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
import { doc, getDoc, setDoc } from 'firebase/firestore';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'; 
import ClipLoader from "react-spinners/ClipLoader";



const Profile = () => {
  const user = useSelector(selectUser);
  const [loading, setLoading] = useState(true);
 
  console.log("This is the user from the prop",user);
  const [posts, setPosts] = useState([]); // Initialize with an empty array

  const [editMode, setEditMode] = useState(false);


  const [isModalOpen, setIsModalOpen] = useState(false);

  const [profileInfo, setProfileInfo] = useState({
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
    const fetchBio = async () => {
      if (user){
        const userBioRef = doc(db, 'userBio', user.uid);
        try{
          const bioSnapshot = await getDoc(userBioRef);
          if (bioSnapshot.exists()){
            const bioData = bioSnapshot.data();
            setBio(bioData.bio);
          }else{
            console.log('User bio does not exist.');
          }

        }catch(error){
          console.error('Error fetching user bio:', error);
        }
      }

    };
    const fetchProfileInfo = async () => {
      if (user) {
        const userProfileRef = doc(db, 'userProfiles', user.uid);
  
        try {
          const profileSnapshot = await getDoc(userProfileRef);
  
          if (profileSnapshot.exists()) {
            // Document exists, update the state with the data
            const profileData = profileSnapshot.data();
            setProfileInfo(profileData);
          } else {
            // Document doesn't exist, handle accordingly
            console.log('User profile does not exist.');
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
          // Handle the error, e.g., show an error message to the user
        }
      }
    };

    const fetchData = async () => {
      setLoading(true); // Set loading to true when fetching data
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

        setTimeout(() => {
          setPosts(postsData);
          setLoading(false);
        }, 2000);

        



      }
    };

    fetchData();
    fetchProfileInfo();
    fetchBio();
  }, [user]);




  const handleModalSave = async (editedProfileInfo) => {
    setProfileInfo(editedProfileInfo);



    // Save changes to the database if needed
    const userProfileRef = doc(db, 'userProfiles', user.uid);

  try {
    await setDoc(userProfileRef, editedProfileInfo);
    // Close the modal or perform any other actions
    // (e.g., setIsModalOpen(false) if you have a modal open)
  } catch (error) {
    console.error('Error updating profile document: ', error);
    // Handle the error, e.g., show an error message to the user
  }
  };

  const handleBioSave = async (editedBio) => {
    setBio(editedBio);
    const data = {
      bio: editedBio,
    }

    const userBioRef = doc(db, 'userBio', user.uid);

    try {
      await setDoc(userBioRef, data);
    }catch(error){
      console.error('Error updating bio document: ', error);

    }
  };

  

  return (
    <div className="profile">
      
 
      <div className="top__photo">
        <div className="cover__photo">
          {/* Your cover photo image goes here */}
          <img src={Coverphoto} alt="Cover Photo" />
         {/** <MoreHorizIcon onClick={handleCoverPhotoUpload} /> */} 
        </div>
        <div className="profile__photo">
          {/* Your profile photo image goes here */}
          <img src={user?.photoUrl} alt="Profile Photo" />
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
          <p>{user?.email}</p>
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
            <a href={profileInfo?.linkedin} target="_blank" rel="noopener noreferrer">
              <LinkedInIcon />
            </a>
          </p>
          <p>
            <a href={profileInfo?.github} target="_blank" rel="noopener noreferrer">
              <GitHubIcon />
            </a>
          </p>
          
        </div>
        <div>
           <MoreHorizIcon onClick={() => setIsModalOpen(true)} />
          </div>

      </div>

      <div className="profile__bio">
        <div className="profile__bio-left">
        <p>{bio}</p>
        </div>
  
      <div className="profile__bio-right">
        <div>
        <MoreHorizIcon onClick={handleOpenBioEditModal} />
        </div>
       
      </div>
</div>

{/* Bio Edit Modal */}
<BioEditModal
  isOpen={isBioEditModalOpen}
  onClose={handleCloseBioEditModal}
  onSave={handleBioSave}
  initialBio={bio}
/>


<div className="profile__posts">
        {loading ? (
          // Display the loading spinner
          <div className="loading-spinner">
            <ClipLoader color="#36D7B7" loading={loading} size={50} />
          </div>
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
