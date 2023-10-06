import React from 'react';
import { FcGoogle } from "react-icons/fc";
import {useContext} from 'react';
import { authContext } from '@/lib/store/auth-context';

function SignIn() {
    const { googleLoginHandler } = useContext(authContext);
  return (
    <div className='login-component min-h-screen flex flex-col items-center justify-center'>
    <main className=' container max-w-2xl px-6 mx-auto '>
      <div className='flex flex-col overflow-hidden shadow-md shadow-slate-500 bg-slate-800 rounded-2xl'>
        <div className='h-100'>
          <img
            className='object-contain'
            src='https://i.imgur.com/7FlDLac.png'
          />
        </div>
        <div className='px-4 py-4'>
        <h3 className='mb-6 text-3xl font-bold text-center'>Sign In</h3>
        
        <button onClick = {googleLoginHandler} className="flex self-start gap-2 p-4 mx-auto mt-6 font-medium text-white align-middle bg-gray-700 rounded-lg">
        <FcGoogle className="text-2xl" /> Google
        </button>
        </div>
      </div>
    </main>

    </div>
  );
}

export default SignIn;
