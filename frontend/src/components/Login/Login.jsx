import {GoogleLogin} from 'react-google-login'
import { useNavigate } from 'react-router-dom'
import {FcGoogle} from 'react-icons/fc'
import logo from '../../assets/whitelogo.png'
import backgroud from '../../assets/background.mp4'
import {client} from '../../sanity'


const Login=()=>{

    const route= useNavigate()

    const responseGoogle=(response)=>{

        const {name,googleId,imageUrl} = response.profileObj

        localStorage.setItem('user', JSON.stringify(response.profileObj))

        //sanity doc new user
        const doc={
          _id:googleId,
          _type: 'user',
          userName:name,
          image:imageUrl,

        }
        client.createIfNotExists(doc).then(()=>{
          route('/',{replace:true})
        })

    }

    return(
        <div className="flex justify-start items-center flex-col h-screen">
                <div className="relative w-full h-full">
                    <video className="w-full h-full object-cover" src={backgroud} type="video/mp4" loop controls={false} muted autoPlay></video>
                </div>
                
                <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
                    <div className="p-5">
                        <img src={logo} width="130px"></img>
                    </div>
                    <div className="shadow-2xl">
                    <GoogleLogin
              clientId="704232463180-185r906jm9s84o9p6kbvp07slok04so1.apps.googleusercontent.com"
              render={(renderProps) => (
                <button
                  type="button"
                  className="bg-slate-800 text-white flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <FcGoogle className="mr-4" /> Sign in with google
                </button>
              )}
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy="single_host_origin"
            />
                    </div>
                    <div className="mt-5">
                        <h1 className="text-white text-2xl">We get to live in a time that we get to use social media as a tool.</h1>
                    </div>
                </div>
        </div>
    )
}

export default Login