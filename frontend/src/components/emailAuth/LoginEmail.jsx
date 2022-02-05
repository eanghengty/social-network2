import React from 'react';
import background from '../../assets/background.jpg'
import { Link } from 'react-router-dom';
const LoginEmail = () => {
  return <div className="flex justify-start items-center flex-col h-screen">
  <div className=" relative w-full h-full">
    <img
      src={background}
      
       
      className="w-full h-full object-cover"
    ></img>
    
    </div>
    
    <div className="absolute bg-white max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl">
        <section>
            <h3 className="font-bold text-2xl text-center">Welcome to ដើរ ញុាំ</h3>
            <p className="text-gray-600 pt-2">Sign in to your account.</p>
            <h2 className="text-red-500 text-xl"></h2>
        </section>

        <section className="mt-10">
            <div className="flex flex-col" >
                <div className="mb-6 pt-3 rounded bg-gray-200">
                    <label className="block text-gray-700 text-sm font-bold mb-2 ml-3" for="email">Email</label>
                    <input type="text" id="email" name="email" required className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"></input>
                </div>
                <div className="mb-6 pt-3 rounded bg-gray-200">
                    <label className="block text-gray-700 text-sm font-bold mb-2 ml-3" for="password">Password</label>
                    <input type="password" id="password" name="password"  required className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"></input>
                </div>
                <div className="flex justify-end">
                    <Link to="/signup" className="text-sm text-purple-600 hover:text-purple-700 hover:underline mb-6">Forgot your password?</Link>
                </div>
                
                <button  className="bg-slate-600 hover:bg-purple-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200" type="submit">Sign In</button>
                <div className="flex justify-end">
                    <Link to="/login" className="text-sm text-purple-600 hover:text-purple-700 hover:underline mb-6">Log in with google</Link>
                </div>
            </div>
            
        </section>
        <div className="max-w-lg mx-auto text-center mt-12 mb-6">
        <p className="text-slate-600">Don't have an account? <Link to="/signupwithemail" className="font-bold hover:underline">Sign up</Link>.</p>
    </div>
    </div>
    </div>;
};

export default LoginEmail;
