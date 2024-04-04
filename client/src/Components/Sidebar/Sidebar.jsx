import "./sidebar1.css"
import DashboardIcon from '@mui/icons-material/Dashboard';
import EventNoteIcon from '@mui/icons-material/EventNote';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import LogoutIcon from '@mui/icons-material/Logout';
import {useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { useRef } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import {Link} from "react-router-dom"
import { updateUserStart, updateUserSuccess, updateUserFailure, deleteUserStart, deleteUserSuccess, deleteUserFailure, signOutUserStart, signOutUserFailure, signOutUserSuccess } from '../../redux/user/userSlice';
// import { DarkModeContext } from "../../context/darkModeContext.jsx";
import logo from '../../pages/icons/iesco3.png';
import { useContext } from "react";
const Sidebar = () => {

  const fileRef = useRef(null);
  const {currentUser, loading, error} = useSelector((state) => state.user)
  const [file, setFile] = useState(undefined)
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState
  (false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const dispatch = useDispatch();
  useEffect(()=>{
  if(file){
      handleFileUpload(file);
  }
  },[file]);
  const handleFileUpload = (file) => {
      const storage = getStorage(app); 
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on('state_changed',
      (snapshot)=>{
          const progress = (snapshot.bytesTransferred / 
          snapshot.totalBytes) *100;
          setFilePerc(Math.round(progress));
      },
      (error) =>{
          setFileUploadError(true);
      },
      ()=>{
          getDownloadURL(uploadTask.snapshot.ref).then
          ((downloadURL)=>
              setFormData({  ...formData, avatar:downloadURL}));  
      }
      );
  };
  const handlechange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    dispatch(updateUserStart());
    const res = await fetch(`/api/user/update/${currentUser._id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (data.success === false) {
      dispatch(updateUserFailure(data.message));
      return;
    }
    dispatch(updateUserSuccess(data));
    setUpdateSuccess(true);
  } catch (error) {
    dispatch(updateUserFailure(error.message));
  }
};

const handleDeleteUser = async () => {
  try {
    dispatch(deleteUserStart());
    const res = await fetch(`/api/user/delete/${currentUser._id}`, {
      method: 'DELETE',
    });
    const data = await res.json();
    if (data.success === false) {
      dispatch(deleteUserFailure(data.message));
      return;
    }
    dispatch(deleteUserSuccess(data));
  } catch (error) {
    dispatch(deleteUserFailure(error.message));
  }
};

const handleSignOut = async () => {
  try {
    dispatch(signOutUserStart());
    const res = await fetch('/api/auth/signout');
    const data = await res.json();
    if (data.success === false) {
      dispatch(deleteUserFailure(data.message));
      return;
    }
    dispatch(deleteUserSuccess(data));
  } catch (error) {
    dispatch(deleteUserFailure(data.message));
  }
};

  // const {dispatched}=useContext(DarkModeContext);
  return (
    <div className='sidebar'>
        <div className="top">
        <Link to="/" style={{textDecoration:"none"}}>
            <img src={logo} alt="Logo" className="logo"/>
                    
                  
            </Link>
        </div>
        <hr/>
        <div className="center">
        
            <ul>
               <li>
               <DashboardIcon className="icon"/>
               <Link to="/" style={{textDecoration:"none"}}>
               <span>Dashboard</span></Link>
               </li>
               <li>
               <PersonIcon className="icon"/>
               <Link to="/alluser" style={{textDecoration:"none"}}>
               <span>All Users</span>
               </Link>
               </li>
               <li>
               <EventNoteIcon className="icon"/>
               <Link to="/create-listing" style={{textDecoration:"none"}}><span>Bills Payment</span></Link>
               </li>
               <li>
               <CircleNotificationsIcon className="icon"/>
               <Link to="/Complains" style={{textDecoration:"none"}}><span>Register Your Complain</span></Link>
               </li>
               <li>
               <LogoutIcon className="icon"/>
               <Link to="/Signin" style={{textDecoration:"none"}}><span onClick={handleSignOut} className='text-red-700 cursor-pointer '>Signout</span></Link>
               </li>
            </ul>
            </div>
        <div className="bottom">
          {/* <div className="colorOption" onClick={()=>dispatched({type:"LIGHT"})}></div>
          <div className="colorOption" onClick={()=>dispatched({type:"DARK"})}></div> */}
        </div>
    </div>
  )
}

export default Sidebar