import { faHome, faPizzaSlice, faSchool } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {NavLink,Link } from 'react-router-dom';
import {categories} from '../../utils/data'
import { GoogleLogout } from 'react-google-login';
import {useNavigate} from 'react-router-dom'
//style when each category select
const isNotActiveStyle = 'flex items-center px-5 gap-3 text-gray-500 hover:text-green-300  transition-all duration-200 ease-in-out capitalize';
const isActiveStyle = 'flex items-center px-5 gap-3 font-extrabold text-blue-300 border-r-2 border-indigo-300 transition-all duration-200 ease-in-out capitalize';

const Sidebar = ({ closeToggle, users }) => {
  const navigate = useNavigate();
  //function toggle to close 
  const handleCloseSidebar = () => {
    if (closeToggle) closeToggle(false);
  };
  //clear localStorage when logout
  const logout = () => {
    localStorage.clear();

    navigate('/login');
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
          {categories.slice(0, categories.length -3).map((category) => (
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
          {categories.slice(7, categories.length).map((category) => (
            <NavLink
              to={`/category/${category.name}`}
              className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}
              onClick={handleCloseSidebar}
              key={category.name}

            >
              <FontAwesomeIcon icon={faSchool}></FontAwesomeIcon>{category.name}
            </NavLink>
            
          ))}
           <h3 className="mt-2 px-5 text-xl">Most Posted User</h3>
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
      <div className="top-0 z-1 right-0 p-2">
            {/* logoutbtn */}
            {(
              <GoogleLogout
                clientId={`${process.env.REACT_APP_GOOGLE_API_TOKEN}`}
                render={(renderProps) => (
                  <button
                    type="button"
                    className=" bg-slate-300 px-5 py-2 rounded-full cursor-pointer outline-none shadow-md "
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
  );
};

export default Sidebar;