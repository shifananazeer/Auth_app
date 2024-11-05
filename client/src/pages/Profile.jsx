import React, { useEffect, useState } from 'react'
import {useSelector} from 'react-redux'
import { useRef } from 'react'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import {app} from '../firebase'
import { useDispatch } from 'react-redux'
import { deleteUserFailure , deleteUserStart, deleteUserSuccess, signout,   updateUserFailure, updateUserStart , updateUserSuccess } from '../redux/user/userSlice'


const Profile = () => {
  const {currentuser , loading , error} = useSelector((state) => state.user)
  const [image , setImage] = useState(undefined)
  const [imagePercentage , setImagePercentage] = useState(0)
  const [imageError , setImageError] = useState(false)
  const [formData , setFormData] = useState({})
  const [updateSuccess , setUpdateSuccess] = useState(false)
 

  const dispatch = useDispatch()
  const fileRef = useRef(null)
  useEffect(()=> {
    if(image) {
      handleFileUpload (image)
    }
  }, [image])

  const handleFileUpload = async (image) => {
    const storage = getStorage(app)
    const fileName = new  Date().getTime() + image.name;
    const storageRef = ref(storage , fileName)
    const uploadTask = uploadBytesResumable(storageRef , image);
    uploadTask.on(
      'state_changed' ,
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercentage(Math.round(progress))
      
      },
      (error)=>{
        setImageError(true)
      },
   () => {
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      setFormData({...formData , profilePicture:downloadURL})
    });
   })
  };

  const handleChange = (e) => {
     setFormData ({...formData , [e.target.id]: e.target.value})
  }


  const handleSubmit = async(e) => {
   e.preventDefault();
   try{
    dispatch(updateUserStart())
    const res = await fetch(`/api/user/update/${currentuser._id}` , {
      method: "POST",
      headers: {
        "Content-Type" : 'application/json'
      },
      body : JSON.stringify(formData)
    });

  const data = await res.json();
  if(data.success === false) {
    dispatch(updateUserFailure (data))
    return;
  }
  dispatch(updateUserSuccess(data))
  setUpdateSuccess(true)
   }catch (error) {
    dispatch(updateUserFailure (error))
     
   }
  } 
 

 const  handleDeleteAccount = async() => {
  try{
    dispatch(deleteUserStart())
   const res = await fetch(`/api/user/delete/${currentuser._id}`, {
    method:'DELETE',
   });
   const data = await res.json();
   if(data.success === false){
    dispatch(deleteUserFailure (data))
    return
   }
   dispatch(deleteUserSuccess(data))
  }catch(error) {
    dispatch(deleteUserFailure (error))
  }
 }

 const handleSignout = async() => {
  try {
   await fetch('api/auth/sigout');
   dispatch(signout())
  }catch(error) {
   console.log(error)
  }
 }
  return (
    // allow read;
    // allow write : if
    // request.resource.size < 2 * 1024 * 1024 && 
    // request.resource.contentType.matches('image/.*')
    <div className='p-3 max-w-lg mx-auto'>
    <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
    <form action="" onSubmit={handleSubmit} className='flex flex-col gap-4'>
      <input type="file" ref={fileRef} hidden accept='image/*' 
      onChange={(e) => setImage(e.target.files[0])}/>

<img
  src={formData.profilePicture || currentuser.profilePicture}
  alt="profile"
  onClick={() => fileRef.current.click()}
  className="h-24 w-24 self-center mt-2 object-cover rounded-full cursor-pointer"
/>

<p className="text-sm self-center">
  {imageError ? (
    <span className="text-red-700">Error Uploading Image</span>
  ) : imagePercentage > 0 && imagePercentage < 100 ? (
    <span className="text-slate-700">{`Uploading: ${imagePercentage} %`}</span>
  ) : imagePercentage === 100 ? (
    <span className="text-green-700">Image upload Successfully</span>
  ) : (
    " "
  )}
</p>

      <input type="text" id='username' defaultValue={currentuser.username} placeholder='Username' className='bg-slate-100 rounded-lg p-3' onChange={handleChange}/>
      <input type="email" id='email' placeholder='Email' defaultValue={currentuser.email} className='bg-slate-100 rounded-lg p-3' onChange={handleChange} />
      <input type="password" id='password' placeholder='Password' className='bg-slate-100 rounded-lg p-3' onChange={handleChange} />
      <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{loading ? 'Loading...' : 'Update' }</button>
    </form>
    <div className='flex justify-between mt-5'>
      <span className='text-red-700 cursor-pointer' onClick={handleDeleteAccount}>Delete Account</span>
      <span className='text-red-700 cursor-pointer' onClick={handleSignout}>Sign Out</span>
    </div>
    <p className='text-red-700 mt-5'>{error && "Something went to error!"}</p>
    <p className='text-green-700 mt-5'>{updateSuccess && "User is Updated Successfully!"}</p>
    </div>
  )
}

export default Profile
