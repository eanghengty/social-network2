import { faHome, faPizzaSlice, faSchool } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {NavLink,Link } from 'react-router-dom';
import {categories} from '../../utils/data'

const isNotActiveStyle = 'flex items-center px-5 gap-3 text-gray-500 hover:text-green-300  transition-all duration-200 ease-in-out capitalize';
const isActiveStyle = 'flex items-center px-5 gap-3 font-extrabold text-blue-300 border-r-2 border-indigo-300 transition-all duration-200 ease-in-out capitalize';

const Sidebar = ({ closeToggle, users }) => {

  const handleCloseSidebar = () => {
    if (closeToggle) closeToggle(false);
  };



  return (
    <div className="flex flex-col justify-between bg-white h-full overflow-y-scroll min-w-210 hide-scrollbar">
      <div className="flex flex-col">
        <Link
          to="/"
          className="flex px-5 gap-2 my-6 pt-5 w-190 items-center pb-5"
          onClick={handleCloseSidebar}
        >
          <span className="color-1 text-xl">ដើរ</span><span className="color-2 text-xl"> ញុាំ</span>
        </Link>
        <div className="flex flex-col gap-5">

          
        <NavLink to="/" className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)} onClick={handleCloseSidebar}  >
            <FontAwesomeIcon icon={faHome} clasName=""></FontAwesomeIcon> Home
          </NavLink>
          <h3 className="mt-2 px-5  text-xl">Food cateogries</h3>
          {categories.slice(0, categories.length -2).map((category) => (
            <NavLink
              to={`/category/${category.name}`}
              className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}
              onClick={handleCloseSidebar}
              key={category.name}

            >
              <FontAwesomeIcon icon={faPizzaSlice}/>{category.name}
            </NavLink>
            
          ))}
          <h3 className="mt-2 px-5 text-xl">Place categories</h3>
          {categories.slice(3, categories.length).map((category) => (
            <NavLink
              to={`/category/${category.name}`}
              className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}
              onClick={handleCloseSidebar}
              key={category.name}

            >
              <FontAwesomeIcon icon={faSchool}></FontAwesomeIcon>{category.name}
            </NavLink>
            
          ))}
           <h3 className="mt-2 px-5 text-xl">Popular Categories</h3>
          {categories.slice(0,1).map((category) => (
            <NavLink
              to={`/category/${category.name}`}
              className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}
              onClick={handleCloseSidebar}
              key={category.name}

            >
              <FontAwesomeIcon icon={faSchool}></FontAwesomeIcon> Coming soon
            </NavLink>
            
          ))}

        </div>
      </div>
      
    </div>
  );
};

export default Sidebar;