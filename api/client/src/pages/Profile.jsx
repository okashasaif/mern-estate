import React, { useState, useEffect } from 'react';
import { useRef } from 'react';
import Sidebar from "../Components/Sidebar/Sidebar.jsx";
import {useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage';
// import { app } from '../firebase';
import { Link } from 'react-router-dom';
import Navbar from '../Components/Navbar/Header.jsx'
import { updateUserStart, updateUserSuccess, updateUserFailure, deleteUserStart, deleteUserSuccess, deleteUserFailure, signOutUserStart, signOutUserFailure, signOutUserSuccess } from '../redux/user/userSlice';
import PreloaderComponent from '../Components/Pre-loader/Pre-loader.jsx';
const Profile = () => {

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

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

    return (


      <div>
      {isLoading ? (
        <PreloaderComponent />
      ) : (
        <div>
             <div className="home">
       <Sidebar/>
       <div className="homeContainer">
        <Navbar/>
        <div class="flex">
  </div>
  <div class="w-1/2 bg-white-300 absolute right-60">
  <div className='p-3 max-w-lg mx-auto'>  
           
           <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
           <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
               <input onChange={(e)=>setFile(e.target.files[0])} hidden accept='image/*' type="file"  ref={fileRef}/>
               <img
         onClick={() => fileRef.current.click()}
         src={formData?.avatar || currentUser.avatar}
         alt='profile'
         className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'
       />
               <p className='text-sm self-center'>
         {fileUploadError ? (
           <span className='text-red-700'>
             Error Image upload (image must be less than 2 mb)
           </span>
         ) : filePerc > 0 && filePerc < 100 ? (
           <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
         ) : filePerc === 100 ? (
           <span className='text-green-700'>Image successfully uploaded!</span>
         ) : (
           ''
         )}
       </p>
               <input type="text" placeholder='username' onChange={handlechange}  defaultValue={currentUser.username} id='username' className='border p-3 rounded-lg'/>
               <input type="email"  placeholder='email' onChange={handlechange} defaultValue={currentUser.email} id='email' className='border p-3 rounded-lg'/>
               <input type="password" placeholder='password' onChange={handlechange} id='password' className='border p-3 rounded-lg'/>
               <button disabled={loading} className='bg-slate-700 text-white rounded-lg p-3 
               uppercase hover:opacity-98 disabled:opacity-80'>{loading ? 'loading......':'Update'}</button>
               <Link className='bg-green-700 text-white p-3 
               rounded-lg uppercase text-center hover: opacity-95' to={"/create-listing"}>
                 Create Listings
               </Link>
<div className='flex justify-between mt-5'> 
<span onClick={handleDeleteUser} className='text-red-700 cursor-pointer '>Delete Account</span>
               <span onClick={handleSignOut} className='text-red-700 cursor-pointer '>Signout</span>
</div>
           </form>
           <p className='text-red-700 mt-5'>{error ? error : ''}</p>
           <p className='text-green-700 mt-5'>
       {updateSuccess ? 'User is updated successfully!' : ''}
     </p>
       </div>
  </div>
</div>
       </div>
      </div>
      )}
    </div>




     
    );
}
export default Profile;