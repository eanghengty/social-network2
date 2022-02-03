import {GoogleLogin} from 'react-google-login'
import { useNavigate } from 'react-router-dom'
import {FcGoogle} from 'react-icons/fc'
import logo from '../../assets/whitelogo.png'
import backgroud from '../../assets/background.mp4'
import {client} from '../../sanity'


const Login=()=>{

  const navigate = useNavigate();
  const responseGoogle = (response) => {
    localStorage.setItem('user', JSON.stringify(response.profileObj));
    const { googleId,name, imageUrl } = response.profileObj;
    
    const doc = {
      _id: googleId,
      _type: 'user',
      userName: name,
      image: imageUrl,
    };
    client.createIfNotExists(doc).then(() => {
      navigate('/', { replace: true });
    });
  };

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className=" relative w-full h-full">
        <video
          src={backgroud}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />

        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
          <div className="p-5">
            <img src={logo} width="130px" />
          </div>

          <div className="shadow-2xl">
            <GoogleLogin
              clientId='704232463180-185r906jm9s84o9p6kbvp07slok04so1.apps.googleusercontent.com'
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
          <h1 className="text-xl text-white mt-3">We get to live in the time that we get to use social media as a tool.</h1>
        </div>
      </div>
    </div>
  )
}

export default Login