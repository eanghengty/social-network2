import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';


import { userCreatedpostsQuery, userQuery, userSavedpostsQuery } from '../utils/data';
import { client } from '../sanity';
import MasonryLayout from '../layout/MasonryLayout';
import Spinner from '../components/loading/Spinner';

const activeBtnStyles = 'bg-green-500 text-white font-bold p-3 rounded-full w-30 outline-none';
const notActiveBtnStyles = 'bg-primary mr-4 text-black font-bold p-3 rounded-full w-20 outline-none';
//profile section
const UserProfile = () => {
  const [user, setUser] = useState();
  const [posts, setposts] = useState();
  //default showing text is Posted
  const [text, setText] = useState('Posted');
  //default value posted
  const [activeBtn, setActiveBtn] = useState('posted');
  //navigate the route
  const navigate = useNavigate();
  const { userId } = useParams();
  //to get the user info fir queries
  const User = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();
  //do the query only when userid change
  useEffect(() => {
    const query = userQuery(userId);
    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }, [userId]);
  //query only when the text and userid change
  useEffect(() => {
    if (text === 'Posted') {
      //pass the user id and see if it true
      const createdpostsQuery = userCreatedpostsQuery(userId);
      //if it then fetch the data
      client.fetch(createdpostsQuery).then((data) => {
        setposts(data);
      });
    } else {
      //pass user id to the 
      const savedpostsQuery = userSavedpostsQuery(userId);
      //if it then fetch the data
      client.fetch(savedpostsQuery).then((data) => {
        setposts(data);
      });
    }
  }, [text, userId]);
  

  //if no user infinite time spinner or loading
  if (!user) return <Spinner message="Loading profile" />;
  //else
  return (
    <div className="relative pb-2 h-full justify-center items-center">
      <div className="flex flex-col pb-5">
        <div className="relative flex flex-col mb-7">
          <div className="flex flex-col justify-center items-center">
            <img
              className=" w-full h-370 2xl:h-510 shadow-lg object-cover"
              src="https://images.pexels.com/photos/296282/pexels-photo-296282.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
              alt="user-pic"
            />
            <img
              className="rounded-full w-40 h-40 -mt-10 shadow-xl object-cover border-4 border-blue-300"
              src={user.image}
              alt="user-pic"
            />
          </div>
          <h1 className="font-bold text-3xl text-center mt-3">
            {user.userName}
          </h1>
         
        </div>
        <div className="text-center mb-7">
          <button
            type="button"
            onClick={(e) => {
              setText(e.target.textContent);
              setActiveBtn('posted');
            }}
            // dynamic style to the btn post , like and following base on select
            className={`${activeBtn === 'posted' ? activeBtnStyles : notActiveBtnStyles}`}
          >
            Posted
          </button>
          <button
            type="button"
            onClick={(e) => {
              setText(e.target.textContent);
              setActiveBtn('liked');
            }}
            // dynamic style to the btn post , like and following base on select
            className={`${activeBtn === 'liked' ? activeBtnStyles : notActiveBtnStyles}`}
          >
            Liked
          </button>
          <button
            type="button"
            onClick={(e) => {
              setText(e.target.textContent);
              setActiveBtn('followed');
            }}
            // dynamic style to the btn post , like and following base on select
            className={`${activeBtn === 'followed' ? activeBtnStyles : notActiveBtnStyles}`}
          >
            Following
          </button>
        </div>
        {/* render all post as masonry layout by pass all data info to */}

        
        <div className="px-2">
        <MasonryLayout posts={posts} />
      </div>
        
        {/* if no post then it return statement */}
        {posts?.length === 0 && activeBtn !== 'followed' && (
           <div className="flex justify-center font-bold items-center w-full text-1xl mt-2">
          No posts Found!
        </div>
        )  
        }
        
        
      </div>

    </div>
  );
};

export default UserProfile;