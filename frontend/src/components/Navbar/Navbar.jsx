import { faHome, faPizzaSlice, faSchool } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {NavLink } from 'react-router-dom';
import {categories} from '../../utils/data'

//style when each category select




////

import "./Navbar.css"
import { faBell, faChartBar, faComments, faPersonBooth, faSearch, faUser } from "@fortawesome/free-solid-svg-icons"

import {useTranslation} from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom';

import '../../i18n'



  
  
const Navbar = ({ searchTerm, setSearchTerm, user }) => {
  const navigate = useNavigate();
  const {t,i18n} = useTranslation()
  const handleClick=(lang)=>{
   
      
    i18n.changeLanguage(lang)
  
  
  
}
  if (user) {
    return (
        
      <div className="flex gap-2 md:gap-5 w-4/3 mt-5 p-5 bg-blue-300 rounded-lg mb-3">
       
        
        <div className="flex justify-start items-center w-2/4 px-2 rounded-md bg-white border-none outline-none focus-within:shadow-sm">
          
          <input
            type="text"
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t('Search place or food.1')}
            value={searchTerm}
            onFocus={() => navigate('/search')}
            className="p-2 w-full bg-white outline-green-300"
          />
          <FontAwesomeIcon icon={faSearch} className="ml-1 text-xl" />
        </div>
        <div className="flex w-1/3 items-center justify-center">
            <Link to="/" className="">
            <FontAwesomeIcon icon={faHome} className="text-white"/>
            </Link>
            {/* <FontAwesomeIcon icon={faBell} className="text-300 text-xl ml-2 text-white" />
            <FontAwesomeIcon icon={faComments} className="text-300 ml-2 text-xl text-white" /> */}
            
            <button id="en" onClick={()=>{handleClick('en')}} className="p-2 bg-green-300 text-white rounded-lg text-center ml-2">en</button>
            <button id="en" onClick={()=>{handleClick('kh')}} className="p-2 bg-red-300 text-white rounded-lg text-center ml-2">kh</button>
          
        </div>
        <div className="flex w-1/4 gap-3 justify-center items-center ">
        <Link to="/create-post" className="">
            <p className="p-2 bg-green-300 text-white rounded-lg text-center hover:bg-green-500">{t('Add.1')}{' '}{t('Post.1')}</p>
          </Link>
          <Link to={`user-profile/${user?._id}`} className="hidden md:block">
            <img src={user.image} alt="user-pic" className="w-11 h-11 rounded-full border-2 border-green-300 object-cover" />
          </Link>
          
      
        </div>
      </div>
    );
  }

  return null;
};


export default Navbar