import React, { useState } from 'react';
import '../css/Login.css';
import { auth } from './Firebase';
import { login } from '../features/userSlice';
import { useDispatch } from 'react-redux';
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from 'firebase/auth';

const Login = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profilePic, setProfilepic] = useState('');
  const dispatch = useDispatch();
  const [signupemail, setSignupemail] = useState('');
  const [signuppassword, setSignuppassword] = useState('');

  const fetchUserProfileFromDatabase = async (userId) => {
    // Implement the function to fetch user profile from the database
  };

  const toggleBox = (value) => {
    setActiveTab(value);
  };

  const loginToApp = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        if (!user.displayName || !user.photoURL) {
          fetchUserProfileFromDatabase(user.uid)
            .then((profileData) => {
              if (profileData) {
                updateProfile(user, {
                  displayName: profileData.displayName,
                  photoURL: profileData.photoURL,
                }).then(() => {
                  dispatch(
                    login({
                      email: user.email,
                      uid: user.uid,
                      displayName: profileData.displayName,
                      photoUrl: profileData.photoURL,
                    })
                  );
                });
              } else {
                console.log('Profile data not found');
              }
            })
            .catch((error) => {
              console.error('Error fetching profile data:', error);
            });
        } else {
          dispatch(
            login({
              email: user.email,
              uid: user.uid,
              displayName: user.displayName,
              photoUrl: user.photoURL,
            })
          );
        }
      })
      .catch((error) => alert(error.message));
  };

  // const register = () => {
  //   if (!name) {
  //     return alert('Please enter a full name');

  //   }
  //   createUserWithEmailAndPassword(auth, signupemail, signuppassword)
  //   .then((userCredential) => {
  //     const user = userCredential.user;
  //     console.log('User created:', user);

  //     return updateProfile(user, {
  //       displayName: name,
  //       photoURL: profilePic,
  //     }).then(() => {
  //       console.log('Profile updated');
  //       dispatch(
  //         login({
  //           email: user.email,
  //           uid: user.uid,
  //           displayName: name,
  //           photoUrl: profilePic,
  //         })
  //       );
  //     });
  //   })
  //   .catch((error) => {
  //     console.error('Error during signup:', error);
  //     alert(error.message);
  //   });

  // };


  const signup = (e) => {
    e.preventDefault();

    if (!name || !signupemail || !signuppassword || !profilePic ) {
      return alert('Please enter all required information');
    }

    createUserWithEmailAndPassword(auth, signupemail, signuppassword)
      .then((userCredential) => {
        const user = userCredential.user;
        return updateProfile(user, {
          displayName: name,
          photoURL: profilePic,
        }).then(() => {
          dispatch(
            login({
              email: user.email,
              uid: user.uid,
              displayName: name,
              photoUrl: profilePic,
            })
          );
        });
      })
      .catch((error) => {
        console.error('Error during signup:', error);
        alert(error.message);
      });
  };


  return (
    <div className='login'>
      <img src='' alt='' />

      <div className='log__header'>
        <div
          className={`log__head ${activeTab === 'login' ? 'active' : ''}`}
          onClick={() => toggleBox('login')}
        >
          Login
          {activeTab === 'login' && <div className='horizontal-line'></div>}
        </div>
        <div
          className={`log__head ${activeTab === 'signup' ? 'active' : ''}`}
          onClick={() => toggleBox('signup')}
        >
          Signup
          {activeTab === 'signup' && <div className='horizontal-line'></div>}
        </div>
      </div>

      {activeTab === 'login' && (
        <form>
          {/* Login form fields */}
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Email'
            type='email'
          />
          <input
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type='password'
          />
          <button type='submit' onClick={loginToApp}>
            Sign In
          </button>
        </form>
      )}

      {activeTab === 'signup' && (
        <form>
          {/* Signup form fields */}
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Full name'
            type='text'
          />
          <input
            value={profilePic}
            onChange={(e) => setProfilepic(e.target.value)}
            placeholder='Profile Pic URL'
            type='text'
          />
          <input
            value={signupemail}
            onChange={(e) => setSignupemail(e.target.value)}
            placeholder='Email'
            type='email'
          />
          <input
            placeholder='Password'
            value={signuppassword}
            onChange={(e) => setSignuppassword(e.target.value)}
            type='password'
          />
          <button type='submit' onClick={signup}>
            Sign Up
          </button>
        </form>
      )}

      {activeTab === 'login' && (
        <p>
          Not a member?{' '}
          <span className='login__register' onClick={() => toggleBox('signup')}>
            Register Now
          </span>
        </p>
      )}
    </div>
  );
};

export default Login;
