import Home from "./pages/homepage/Home"
import Login from "./components/Login/Login"
import {Routes,Route,useNavigate} from 'react-router-dom'
import {useEffect} from 'react'
const  App=()=>{
  const navigate = useNavigate();

  useEffect(() => {
    const User = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();

    if (!User) navigate('/login');
  }, []);
    return (
      //switch path
      <Routes>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/*" element={<Home></Home>}></Route>
      </Routes>
       
    )
}
export default App