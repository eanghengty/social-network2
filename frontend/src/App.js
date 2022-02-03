import Home from "./pages/homepage/Home"
import Login from "./components/Login/Login"
import {Routes,Route,userNavigation} from 'react-router-dom'

const  App=()=>{
    return (
      //switch path
      <Routes>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/*" element={<Home></Home>}></Route>
      </Routes>
       
    )
}
export default App