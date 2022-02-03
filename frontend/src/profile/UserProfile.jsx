import React, { useEffect, useState } from 'react';
import { AiOutlineLogout } from 'react-icons/ai';
import { useParams, useNavigate } from 'react-router-dom';
import { GoogleLogout } from 'react-google-login';

import { userCreatedpostsQuery, userQuery, userSavedpostsQuery } from '../utils/data';
import { client } from '../sanity';
import MasonryLayout from '../layout/MasonryLayout';
import Spinner from '../components/loading/Spinner';

const activeBtnStyles = 'bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none';
const notActiveBtnStyles = 'bg-primary mr-4 text-black font-bold p-2 rounded-full w-20 outline-none';

const UserProfile = () => {
  const [user, setUser] = useState();
  const [posts, setposts] = useState();
  const [text, setText] = useState('Created');
  const [activeBtn, setActiveBtn] = useState('created');
  const navigate = useNavigate();
  const { userId } = useParams();

  const User = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();

  useEffect(() => {
    const query = userQuery(userId);
    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }, [userId]);

  useEffect(() => {
    if (text === 'Created') {
      const createdpostsQuery = userCreatedpostsQuery(userId);

      client.fetch(createdpostsQuery).then((data) => {
        setposts(data);
      });
    } else {
      const savedpostsQuery = userSavedpostsQuery(userId);

      client.fetch(savedpostsQuery).then((data) => {
        setposts(data);
      });
    }
  }, [text, userId]);

  const logout = () => {
    localStorage.clear();

    navigate('/login');
  };

  if (!user) return <Spinner message="Loading profile" />;

  return (
    <div className="relative pb-2 h-full justify-center items-center">
      <div className="flex flex-col pb-5">
        <div className="relative flex flex-col mb-7">
          <div className="flex flex-col justify-center items-center">
            <img
              className=" w-full h-370 2xl:h-510 shadow-lg object-cover"
              src="https://source.unsplash.com/1600x900/?nature,photography,technology"
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
          <div className="absolute top-0 z-1 right-0 p-2">
            {userId === User.googleId && (
              <GoogleLogout
                clientId='704232463180-185r906jm9s84o9p6kbvp07slok04so1.apps.googleusercontent.com'
                render={(renderProps) => (
                  <button
                    type="button"
                    className=" bg-white  rounded-full cursor-pointer outline-none shadow-md p-3"
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                  >
                    Logout
                  </button>
                )}
                onLogoutSuccess={logout}
                cookiePolicy="single_host_origin"
              />
            )}
          </div>
        </div>
        <div className="text-center mb-7">
          <button
            type="button"
            onClick={(e) => {
              setText(e.target.textContent);
              setActiveBtn('Posted');
            }}
            className={`${activeBtn === 'created' ? activeBtnStyles : notActiveBtnStyles}`}
          >
            Created
          </button>
          <button
            type="button"
            onClick={(e) => {
              setText(e.target.textContent);
              setActiveBtn('Liked');
            }}
            className={`${activeBtn === 'saved' ? activeBtnStyles : notActiveBtnStyles}`}
          >
            Saved
          </button>
        </div>

        <div className="px-2">
          <MasonryLayout posts={posts} />
        </div>

        {posts?.length === 0 && (
        <div className="flex justify-center font-bold items-center w-full text-1xl mt-2">
          No posts Found!
        </div>
        )}
      </div>

    </div>
  );
};

export default UserProfile;