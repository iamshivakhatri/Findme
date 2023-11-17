// import React, { useState } from 'react'
// import '../css/Login.css'
// import {auth } from './Firebase'; 
// import {login} from '../features/userSlice'
// import { Photo } from '@mui/icons-material';
// import { useDispatch } from 'react-redux';
// import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword  } from 'firebase/auth';
// import { collection, doc, getDoc } from 'firebase/firestore';
// import { db } from './Firebase'; // Assuming you have Firebase initialized in Firebase.js



// const Login = () => {
//     const [activeTab, setActiveTab] = useState('login'); // Set 'login' as the default active tab
//     const[showSignup, setShowSignup] = useState(false);
//     const[showLogin, setShowLogin] = useState(true);

//     const fetchUserProfileFromDatabase = async (userId) => {
//       try {
//         // Fetch the user document from Firestore
//         const userDocRef = doc(db, 'users', userId); // 'users' is the name of your Firestore collection
//         const userDocSnapshot = await getDoc(userDocRef);
    
//         if (userDocSnapshot.exists()) {
//           const userData = userDocSnapshot.data();
//           return {
//             displayName: userData.displayName,
//             photoURL: userData.photoURL,
//           };
//         } else {
//           return null;
//         }
//       } catch (error) {
//         console.error('Error fetching user profile:', error);
//         throw error;
//       }
//     };
    



//     const toggleBox = (value)=>{
//         setActiveTab(value)
//         if (value == "login"){
//             setShowLogin(true);
//             setShowSignup(false);
//         }else if(value == "signup"){
//             setShowSignup(true);
//             setShowLogin(false);
//         }

//     }


//     const [name, setName ] = useState("");
//     const [email, setEmail ] = useState("");
//     const [password, setPassword ] = useState("");
//     const [profilePic, setProfilepic ] = useState("");
//     const dispatch = useDispatch();

//     const loginToApp = (e) => {
//       e.preventDefault();
//       signInWithEmailAndPassword(auth, email, password)
//         .then((userCredential) => {
//           const user = userCredential.user;
    
//           // Check if the user has a displayName and photoURL
//           if (!user.displayName || !user.photoURL) {
//             // If not, fetch profile data from the database
//             fetchUserProfileFromDatabase(user.uid)
//               .then((profileData) => {
//                 if (profileData) {
//                   updateProfile(user, {
//                     displayName: profileData.displayName,
//                     photoURL: profileData.photoURL,
//                   }).then(() => {
//                     dispatch(
//                       login({
//                         email: user.email,
//                         uid: user.uid,
//                         displayName: profileData.displayName,
//                         photoUrl: profileData.photoURL,
//                       })
//                     );
//                   });
//                 } else {
//                   // Handle the case where profile data couldn't be fetched
//                   console.log('Profile data not found');
//                 }
//               })
//               .catch((error) => {
//                 console.error('Error fetching profile data:', error);
//               });
//           } else {
//             // If the user already has displayName and photoURL, dispatch the login action
//             dispatch(
//               login({
//                 email: user.email,
//                 uid: user.uid,
//                 displayName: user.displayName,
//                 photoUrl: user.photoURL,
//               })
//             );
//           }
//         })
//         .catch((error) => alert(error.message));
//     };
    
//     /** 
//     const loginToApp = (e) => {
//         e.preventDefault();
//         signInWithEmailAndPassword(auth, email, password) // Use signInWithEmailAndPassword function with auth instance
//           .then((userCredential) => {
//             const user = userCredential.user;
//             dispatch(
//               login({
//                 email: user.email,
//                 uid: user.uid,
//                 displayName: name,
//                 photoUrl: profilePic,
//               })
//             );
//           })
//           .catch((error) => alert(error.message)); // Access error message using error.message
//       };

//  */


  
//     const register = () => {
//         if (!name) {
//           return alert('Please enter a full name');
//         }
      
//         createUserWithEmailAndPassword(auth, email, password)
//           .then((userCredential) => {
//             const user = userCredential.user;
//             return updateProfile(user, {
//               displayName: name,
//               photoURL: profilePic,
//             }).then(() => {
//               dispatch(
//                 login({
//                   email: user.email,
//                   uid: user.uid,
//                   displayName: name,
//                   photoUrl: profilePic,
//                 })
//               );
//             });
//           })
//           .catch((error) => alert(error));
//       };


//   return (
//     <div className='login'>
//         <img src="" alt="" />
        
//         <div className='log__header'>
//       <div
//         className={`log__head ${activeTab === 'login' ? 'active' : ''}`}
//         onClick={() => toggleBox('login')}
//       >
//         Login
//         {activeTab === 'login' && <div className='horizontal-line'></div>}
//       </div>
//       <div
//         className={`log__head ${activeTab === 'signup' ? 'active' : ''}`}
//         onClick={() => toggleBox('signup')}
//       >
//         Signup
//         {activeTab === 'signup' && <div className='horizontal-line'></div>}
//       </div>
//     </div>
//         {showLogin && 
//         (
//             <form action="">
        
//             <input
//             value={email}
//             onChange={(e)=>{setEmail(e.target.value)}}
//             placeholder='Email' 
//             type="email" />

//             <input
//             placeholder='Password' 
//             value={password}
//             onChange={(e)=>{setPassword(e.target.value)}}
//             type="password" />      

//             <button type='submit' onClick={loginToApp}>
//                 Sign In
//             </button>


//         </form> 
//         )
        
//         }
//         {showSignup && 
//         (
//             <form action="">
//             <input 
//             value = {name}
//             onChange={(e)=>{setName(e.target.value)}}
//             placeholder='Full name'
//             type="text" />

//             <input 
//             value={profilePic}
//             onChange = {(e)=>{setProfilepic(e.target.value)}}
           
//             placeholder='Profile Pic URL'
//             type="text" />

//             <input
//             value={email}
//             onChange={(e)=>{setEmail(e.target.value)}}
//             placeholder='Email' 
//             type="email" />

//             <input
//             placeholder='Password' 
//             value={password}
//             onChange={(e)=>{setPassword(e.target.value)}}
//             type="password" />      

//             <button type='submit' onClick={register}>
//                 Sign UP
//             </button>


//         </form> 
//         )
        
//         }

//       {showLogin && (
//             <p> Not a member? {"  "}
//             <span className='login__register' onClick={()=>{toggleBox("signup")}}> 
                
//                 Register Now
//             </span>
            
//         </p>

//       )}
        
//     </div>
//   )
// }

// export default Login