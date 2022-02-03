import Navbar from "../../components/Navbar/Navbar"
import {userQuery} from "../../utils/data"
import Sidebar from "../../components/sidebar/Sidebar"
import Posts from "../../components/post/Posts"
import RightSideBar from "../../components/rightSideBar/RightSideBar"
import { useEffect, useState, useRef } from "react"
import User from "../../components/user/User"
import {client} from '../../sanity'
import logo from '../../assets/logo.jpeg'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars, faHamburger, faTimes } from "@fortawesome/free-solid-svg-icons"
import {Link} from 'react-router-dom'
import './Home.css'
import {Routes, Route} from 'react-router-dom'
import UserProfile from "../../profile/UserProfile"

const Home =()=>{
    const [toggleSidebar, setToggleSidebar] = useState(false);
  const [user, setUser] = useState();
  const scrollRef = useRef(null);
//get data from localstorage
  const userInfo = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();

  useEffect(() => {
    const query = userQuery(userInfo?.googleId);

    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }, []);

  useEffect(() => {
    scrollRef.current.scrollTo(0, 0);
  });

  return (
    <div className="flex bg-gray-50 md:flex-row flex-col h-screen transition-height duration-75 ease-out">
      <div className="hidden md:flex h-screen flex-initial">
        <Sidebar users={user && user} />
      </div>
      <div className="flex md:hidden flex-row bg-gray-200">
        <div className="p-2 w-full flex flex-row justify-between items-center shadow-md">
          <FontAwesomeIcon icon={faBars} fontSize={40} className="cursor-pointer" onClick={() => setToggleSidebar(true)} />
          <Link to="/">
          <span className="color-1 font text-xl">ដើរ</span><span className="color-2 font text-xl"> ញុាំ</span>
          </Link>
          <Link to={`user-profile/${user?._id}`}>
            <img src={user?.image} alt="user-pic" className="w-9 h-9 rounded-full border-2" />
          </Link>
        </div>
        {toggleSidebar && (
        <div className="fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
          <div className="absolute w-full flex justify-end items-center p-2">
            <FontAwesomeIcon icon={faTimes} fontSize={30} className="cursor-pointer text-red-300" onClick={() => setToggleSidebar(false)} />
          </div>
          <Sidebar closeToggle={setToggleSidebar} users={user && user} />
        </div>
        )}
      </div>
      <div className="pb-2 flex-1 h-screen overflow-y-scroll" ref={scrollRef}>
        <Routes>
          <Route path="/user-profile/:userId" element={<UserProfile />} />
          <Route path="/*" element={<Posts user={user && user} />} />
        </Routes>
      </div>
    </div>
  );
};


export default Home