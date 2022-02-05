import Home from "./pages/homepage/Home"
import Login from "./components/Login/Login"
import {Routes,Route,useNavigate} from 'react-router-dom'
import {useEffect} from 'react'
import './i18n'
import LoginEmail from "./components/emailAuth/LoginEmail"
import SignupEmail from "./components/emailAuth/SignupEmail"
const  App=()=>{
  const navigate = useNavigate();

  useEffect(() => {
    const User = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();
    //protected route void no user can navigate through all route beside login
    if (!User) navigate('/login','/loginwithemail','/signupwithemail');
  }, []);
    return (
      //switch path
      <Routes>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/loginwithemail" element={<LoginEmail/>}></Route>
        <Route path="/signupwithemail" element={<SignupEmail/>}></Route>
        <Route path="/*" element={<Home></Home>}></Route>
      </Routes>
       
    )
}
export default App