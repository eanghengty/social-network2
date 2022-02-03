import React from 'react';

import  { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { urlFor, client } from '../../sanity';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const Post = ({post}) => {
  const [postHovered, setPostHovered] = useState(false);
  const [savingPost, setSavingPost] = useState(false);

  const navigate = useNavigate();

  const { postedBy, image, _id, destination } = post;

  const user = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();

  const deletePost = (id) => {
    client
      .delete(id)
      .then(() => {
        window.location.reload();
      });
  };

  let alreadySaved = post?.save?.filter((item) => item?.postedBy?._id === user?.googleId);

  alreadySaved = alreadySaved?.length > 0 ? alreadySaved : [];

  const savePost = (id) => {
    if (alreadySaved?.length === 0) {
      setSavingPost(true);

      client
        .patch(id)
        .setIfMissing({ save: [] })
        //insert add the end of the save array
        .insert('after', 'save[-1]', [{
          _key: uuidv4(),//get unique id 
          userId: user?.googleId,
          postedBy: {
            _type: 'postedBy',
            _ref: user?.googleId,
          },
        }])
        .commit()
        .then(() => {
          window.location.reload();
          setSavingPost(false);
        });
    }
  };

  return (
    <div className="m-2">
      <div
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
        onClick={() => navigate(`/post-detail/${_id}`)}
        className=" relative cursor-pointer w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out"
      >
        <img className="rounded-lg w-full " src={(urlFor(image).width(250).url())} alt="user-post" />
        {postHovered && (
          <div
            className="absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50"
            style={{ height: '100%' }}
          >
             <div className=" flex justify-between items-center gap-2 w-full">
              {destination?.slice(8).length > 0 ? (
                <a
                  href={destination}
                  target="_blank"
                  className="bg-white flex items-center gap-2 text-black font-bold p-2 pl-4 pr-4 rounded-full opacity-70 hover:opacity-100 hover:shadow-md"
                  rel="noreferrer"
                >
                  {' '}
                 
                  {destination?.slice(8, 17)}...
                </a>
              ) : <p className="bg-white flex items-center gap-2 text-black font-bold p-2 pl-4 pr-4 rounded-full opacity-70 hover:opacity-100 hover:shadow-md" >None</p>}
              {
           postedBy?._id === user?.googleId && (
           <button
             type="button"
             onClick={(e) => {
               e.stopPropagation();
               deletePost(_id);
             }}
             className="bg-white p-2 rounded-full w-8 h-8 flex items-center justify-center text-dark opacity-75 hover:opacity-100 outline-none"
           >
              <FontAwesomeIcon icon={faTrash} className="text-black"></FontAwesomeIcon>
           </button>
           )
        }
            </div>
            <div className="flex items-center justify-between">
              
              {alreadySaved?.length !== 0 ? (
                <button type="button" className="bg-blue-300 opacity-100 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none" >
                  {post?.save?.length}  💗
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    savePost(_id);
                  }}
                  type="button"
                  className="bg-white opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none"
                >
                  {post?.save?.length}   {savingPost ? 'Loading' : '🤍'}
                </button>
              )}
              
              
            </div>
            
           
          </div>
        )}
      </div>
      <Link to={`/user-profile/${postedBy?._id}`} className="flex gap-2 mt-2 items-center border-2 border-indigo-300 rounded-lg p-1">
        <img
          className="w-8 h-8 rounded-full object-cover"
          src={postedBy?.image}
          alt="user-profile"
        />
        <p className="font-semibold capitalize">{postedBy?.userName}</p>
        {postedBy?._id !== user?.googleId && (<p className="text-green-500 text-left"> Follow</p>)}
      </Link>
      
    </div>
  );
};

export default Post;
