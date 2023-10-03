import React, { useEffect } from 'react';
import './css/App.css';
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Feed from './components/Feed'
import Widget from './components/Widget';
import { useAutocomplete } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {login, logout, selectUser } from './features/userSlice';
import { db, auth } from './components/Firebase'; 
import Login from './components/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProfilePage from './components/Profilepage'; 
import Leftsidebar from './components/Leftsidebar';
import Project from './components/projects';

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();


  useEffect(()=>{
    auth.onAuthStateChanged(userAuth =>{
      if(userAuth){
        //user is logged in
        dispatch(login({
          email: userAuth.email,
          uid: userAuth.uid,
          displayName: userAuth.displayName,
          photoUrl: userAuth.photoURL,
        }))

      }else{
        //user is logged out
        dispatch(logout());
      }
    }
    );
  },[]);
  
 
  return (
    <div className="app">
    
      {/** Header */}
      <Router> 
      <Header/>
      <Leftsidebar/>

      <Routes>
      <Route
    path="/"
    element={
      !user ? (
        <Login /> 
      ) : (
        <div className="app__body">
          {/**<Sidebar /> **/}
          <Feed />
          {/**  <Widget /> */}
        </div>
      )
    }
  />
     <Route path="/profile" element={<ProfilePage />} /> 
     <Route path="/projects" element={<Project />} /> 
</Routes>


      </Router>

      {/** App Body */}

    </div>
  );
}

export default App;
