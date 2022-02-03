import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {categories} from '../../utils/data'
import { client } from '../../sanity';
import Spinner from '../loading/Spinner';
import { faTrash, faUpload } from '@fortawesome/free-solid-svg-icons';

const CreatePost = ({ user }) => {
  const [title, setTitle] = useState('');
  const [about, setAbout] = useState('');
  const [loading, setLoading] = useState(false);
  const [destination, setDestination] = useState();
  const [fields, setFields] = useState();
  const [category, setCategory] = useState();
  const [imageAsset, setImageAsset] = useState();
  const [wrongImageType, setWrongImageType] = useState(false);

  const navigate = useNavigate();

  const uploadImage = (e) => {
    const selectedFile = e.target.files[0];
    // uploading asset to sanity
    if (selectedFile.type === 'image/png' || selectedFile.type === 'image/svg' || selectedFile.type === 'image/jpeg' || selectedFile.type === 'image/gif' || selectedFile.type === 'image/tiff') {
      setWrongImageType(false);
      setLoading(true);
      client.assets
        .upload('image', selectedFile, { contentType: selectedFile.type, filename: selectedFile.name })
        .then((document) => {
          setImageAsset(document);
          setLoading(false);
        })
        .catch((error) => {
          console.log('Upload failed:', error.message);
        });
    } else {
      setLoading(false);
      setWrongImageType(true);
    }
  };

  const createPost = () => {
    if (title && about && imageAsset?._id && category) {
      const doc = {
        _type: 'post',
        title,
        about,
        destination,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: imageAsset?._id,
          },
        },
        userId: user._id,
        postedBy: {
          _type: 'postedBy',
          _ref: user._id,
        },
        category,
      };
      client.create(doc).then(() => {
        navigate('/');
      });
    } else {
      setFields(true);

      setTimeout(
        () => {
          setFields(false);
        },
        2000,
      );
    }
  };
  return (
    <div className="flex flex-col justify-center items-center mt-5 lg:h-4/5">
      {fields && (
        <p className="text-red-500 mb-5 text-xl transition-all duration-150 ease-in ">input invalid</p>
      )}
      
      <div className=" flex lg:flex-row flex-col justify-center items-center bg-blue-200 rounded-lg lg:p-5 p-3 lg:w-4/5  w-full">
      <div className="flex flex-1 flex-col gap-6 lg:pl-5 mt-5 w-full mr-2">
      {user && (
            <div className="flex gap-2 mt-2 mb-2 items-center bg-white rounded-lg bg-transparent">
              <img
                src={user.image}
                className="w-10 h-10 rounded-full "
                alt="user-profile"
              />
              <p className="font-bold text-white">{user.userName}</p>
            </div>
          )}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add title"
            className=" text-white outline-none text-xl sm:text-xl  border-b-2 border-gray-200 p-2 bg-transparent"
          />
          
          <input
            type="text"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            placeholder="Add Caption . . ."
            className=" text-white outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2 bg-transparent"
          />
          <input
            type="url"
            vlaue={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Webiste link"
            className="text-white outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2 bg-transparent"
          />

          <div className="flex flex-col">
            <div>
              <p className="mb-2 font-semibold text:lg sm:text-xl text-white">Choose Post Category</p>
              <select
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
                className="outline-none w-4/5 text-base border-b-2 border-gray-200  rounded-md cursor-pointer p-3 mb-3 bg-transparent"
              >
                <option value="others" className="sm:text-bg bg-white ">Select Category</option>
                {categories.map((item) => (
                  <option className="text-base border-0 outline-none capitalize bg-white text-black " value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            
          </div>
        </div>
        {/* import image */}
        <div className="bg-white p-3 flex flex-0.7 w-full rounded-lg ">
          
          <div className=" flex justify-center items-center flex-col border-2 border-double border-gray-300 p-3 w-full h-420">
            {loading && (
              <Spinner />
            )}
            {
              wrongImageType && (
                <p>photo invalid</p>
              )
            }
            {!imageAsset ? (
              
              <label>
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="flex flex-col justify-center items-center">
                    <p className="font-bold text-2xl">
                      <FontAwesomeIcon icon={faUpload} className="text-green-300"></FontAwesomeIcon>
                    </p>
                    <p className="text-lg">Click to upload</p>
                  </div>

                  <p className="mt-32 text-gray-400">
                    upload and post :p
                  </p>
                </div>
                <input
                  type="file"
                  name="upload-image"
                  onChange={uploadImage}
                  className="w-0 h-0"
                />
              </label>
            ) : (
              <div className="relative h-full">
                <img
                  src={imageAsset?.url}
                  alt="uploaded-pic"
                  className="h-full w-full"
                />
                <button
                  type="button"
                  className="absolute bottom-3 right-3 p-3 rounded-full bg-white text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out"
                  onClick={() => setImageAsset(null)}
                >
                  <FontAwesomeIcon icon={faTrash} className="text-red-300"></FontAwesomeIcon>
                </button>
              </div>
            )}
          </div>
        </div>
        
        
      </div>
      <div className="flex justify-end items-end mt-5">
              <button
                type="button"
                onClick={createPost}
                className="bg-green-300  hover:bg-green-500 text-white font-bold p-2 rounded-full w-28 outline-none"
              >
                Create Post
              </button>
            </div>
    </div>
  );
};

export default CreatePost;
