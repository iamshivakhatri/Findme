import React, { useEffect } from 'react';
import './App.css';
import Header from './Header'
import Sidebar from './Sidebar'
import Feed from './Feed'
import Widget from './Widget';
import { useAutocomplete } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {login, logout, selectUser } from './features/userSlice';
import { db, auth } from './Firebase'; 
import Login from './Login';

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
      <Header/>
      {!user ? <Login/> : (
         <div className="app__body">
         <Sidebar/>
         <Feed/>
         <Widget/>
          {/** Sidebar*/}
          {/** Feed */}
          {/** Widgets */}
        </div>


      )}

      {/** App Body */}

    </div>
  );
}

export default App;
