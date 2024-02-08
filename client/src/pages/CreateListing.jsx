import React from 'react';
import { getStorage, uploadBytesResumable, ref, getDownloadURL } from 'firebase/storage';
import { useState } from 'react';
import { app } from '../firebase';
const CreateListing = () => {
    const [files, setFiles] = useState([])
    const [formData, setFormData]= useState({
        imageUrls: [],
    });
    const [imageUploadError, setImageUploadError]= useState(false);
    const [uploading, setUploading] = useState(false);
    console.log(formData);
    const handleImageSubmit =  (e) =>{
        if (files.length>0 && files.length +formData.imageUrls.length <7){
            setUploading(true);
            setImageUploadError(false);
            const promises =[];
            for (let i=0; i<files.length; i++){
                promises.push(storeImage(files[i]));
            }
            Promise.all(promises).then((urls)=>{
                setFormData({...formData, 
                    imageUrls: formData.imageUrls.concat(urls),});
                    setImageUploadError(false);
                    setUploading(false);
            }).catch ((err)=>{
                setImageUploadError('image upload failed (2mb per image)');
                setUploading(false);
            });
        }else{
            setImageUploadError('you can only upload 6 six images');
            setUploading(false);
        }
    };
    const storeImage = async (file) => {
        return new Promise((resolve, reject) => {
          const storage = getStorage(app);
          const fileName = new Date().getTime() + file.name;
          const storageRef = ref(storage, fileName);
          const uploadTask = uploadBytesResumable(storageRef, file);
          uploadTask.on(
            "state_changed",
            (snapshot)=>{
                const progress = 
                (snapshot.bytesTransferred/snapshot.totalBytes)*100;
                console.log(`Upload is ${progress}% done`);
            },
            (error) =>{
                reject(error);
            },
            ()=>{
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
                    resolve(downloadURL);
                });
            }
            );
        });
    };
    const handleRemoveImage = (index)=>{
        setFormData ({
            ...formData,
            imageUrls: formData.imageUrls.filter((_,i)=> i !==index),
        });
    }
return (
<main className='p-3 max-w-4xl mx-auto'>
    <h1 className='text-3xl font-semibold text-center my-7 '>Create a listing</h1>
    <form className='flex flex-col sm:flex-row gap-4'>
        <div className='flex flex-col gap-4 flex-1'>
            <input type="text" placeholder='name' className='border p-3 rounded-lg' id='name' maxLength='62' minLength='10' required />
            <input type="text" placeholder='Description' className='border p-3 rounded-lg' id='description'  required />
            <input type="text" placeholder='Address' className='border p-3 rounded-lg' id='address' required />
            <div className='flex gap-6 flex-wrap'>
                <div className='flex gap-2'>
                <input type="checkbox"  id="sale" className='w-5' />
                <span>Sell</span>
                </div>
                <div className='flex gap-2'>
                <input type="checkbox"  id="rent" className='w-5' />
                <span>Rent</span>
                </div>
                <div className='flex gap-2'>
                <input type="checkbox"  id="parking" className='w-5' />
                <span>Parking Spot</span>
                </div>
                <div className='flex gap-2'>
                <input type="checkbox"  id="furnished" className='w-5' />
                <span>Furnished</span>
                </div>
                <div className='flex gap-2'>
                <input type="checkbox"  id="offer" className='w-5' />
                <span>Offer</span>
                </div>
            </div>
            <div className='flex flex-wrap gap-6'>
                <div className='flex items-center gap-2'>
                    <input type="number" name="" id="bedrooms" min='1' max='10' className='p-3 border border-gray-300 rounded-lg ' required/>
                    <p>Beds</p>
                </div>
                <div className='flex items-center gap-2'>
                    <input type="number" name="" id="bathrooms" min='1' max='10' className='p-3 border border-gray-300 rounded-lg ' required/>
                    <p>Baths</p>
                </div>                <div className='flex items-center gap-2'>
                    <input type="number" name="" id="regularprice" min='1' max='10' className='p-3 border border-gray-300 rounded-lg ' required/>
                    <div className='flex flex-col items-center'> 
                    <p>Regular Price</p>
                    <span className='text-xs'>($/month)</span>
                    </div>
                </div>
                <div className='flex items-center gap-2'>
                    <input type="number" name="" id="discountedprice" min='1' max='10' className='p-3 border border-gray-300 rounded-lg ' required/>
                    <div className='flex flex-col items-center'>
                    <p>Discounted Price</p>
                    <span className='text-xs'>($/month)</span>
                    </div>
                </div>
            </div>
        </div>
        <div className='flex flex-col flex-1 gap-4'>
            <p className='font-semibold '>Images:
            <span className='font-normal text-gray-600 ml-2'>The first image will be cover (max-6)</span></p>
            <div className="flex gap-4"><input onChange={(e)=>setFiles(e.target.files)} type="file" name="" id="images" accept='image/*'className='p-3 border-gray-300 rounded w-full' multiple/>
            <button type='button'
              onClick={handleImageSubmit} disabled={uploading} className='p-3 text-green-700 border border-green-700
            rounded uppercase hover:shadow-lg disabled:opacity-80'>{ uploading ? 'uploading......': 'upload'}</button>
            </div>
            <p className='text-red-700 text-sm'>
        {
            imageUploadError &&  imageUploadError
        }
      </p>
      {
        formData.imageUrls.length>0 && formData.imageUrls.map((url, index)=>(
            <div key={url} className="flex justify-between p-3 border items-center ">
                <img src={url} alt="listing image" className='w-20 h-20 object-contain rounded-lg'/>
                <button type='button' onClick={() => handleRemoveImage(index)} className='p-3 text-red-700 rounded-lg uppercase hover:opacity-95'>Delete</button>
            </div>
        ))
      }
            <button className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:80'>Create Listings</button>
        </div>
    </form>
</main>
    );
}
export default CreateListing;