import {GoogleLogin} from 'react-google-login'
import { useNavigate } from 'react-router-dom'
import {FcGoogle, FcKey} from 'react-icons/fc'
import logo from '../../assets/whitelogo.png'
import backgroud from '../../assets/background.jpg'
import {client} from '../../sanity'
import {Link} from 'react-router-dom'

const Login=()=>{

  const navigate = useNavigate();
  //request and destruct object for document
  const responseGoogle = (response) => {
    localStorage.setItem('user', JSON.stringify(response.profileObj));
    const { name} = response.profileObj
    const {googleId} = response.profileObj
    const {imageUrl} = response.profileObj
    
    const doc = {
      _id: googleId,
      _type: 'user',
      userName: name,
      image: imageUrl,
    };
    //if there is no user then navigate to login page
    client.createIfNotExists(doc).then(() => {
      navigate('/', { replace: true });
    });
  };

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className=" relative w-full h-full">
        <img
          src={backgroud}
          
           
          className="w-full h-full object-cover"
        ></img>

        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
          <div className="p-5">
            <img src={logo} width="130px" />
          </div>

          <div className="shadow-2xl">
            <GoogleLogin
              clientId={`${process.env.REACT_APP_GOOGLE_API_TOKEN}`}
              render={(renderProps) => (
                <button
                  type="button"
                  className="bg-slate-800 flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <FcGoogle className="mr-4" /> <span className="text-xl text-white">Sign in with google</span>
                </button>
              )}
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy="single_host_origin"
            />
          </div>
          <div className="shadow-2xl mt-3">
          <Link to="/loginwithemail" className="bg-slate-800 flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none">
                  <FcKey className="mr-4" /> <span className="text-xl text-white">Sign in with email</span>
                </Link>
          </div>
          <h1 className="text-xl text-white mt-3">We get to live in the time that we get to use social media as a tool.</h1>
        </div>
      </div>
    </div>
  )
}

export default Login