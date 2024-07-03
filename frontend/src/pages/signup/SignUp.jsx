import { useState } from 'react'
import GenderCheckbox from './GenderCheckbox'
import { Link } from 'react-router-dom'
import useSignup from '../../hooks/useSignup';

const SignUp = () => {

  const[inputs, setInputs] = useState({
    fullname: "",
    username: "",
    password:"",
    confirmPassword:"",
    gender:"",
  });

  const {loading,signup} = useSignup(); //signup hook i made. Initially only the first line i.e the loading variable useState line is executed in the useSignup.js file inside the hooks folder. then in line 24, after the submit button is pressed, onsignup function which is in this hook gets executed which also gets the details object

  const handleCheckboxChange = (gender) => {
    setInputs({...inputs, gender})
  }

  const handleSubmit = async (e) => {
    e.preventDefault(); //this prevents many default characterstics from happening browser stuff from happening. for instance, refershing the browser
    await signup(inputs)
  }

  return (
    <div className='flex flex-col items-center min-w-96 mx-auto'>
      <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter
        backdrop-blur-lg bg-opacity-0'>
          <h1 className='text-3xl font-semibold text-center text-gray-300'>
            Sign Up <span className='text-blue-500'> ChatApp</span>
          </h1>

          <form onSubmit={handleSubmit}>
            <div>
              <label className='label p-2'>
                <span className='text-base label-text'> Full Name</span>
              </label>
              <input type='text' placeholder='John Doe' className='w-full input input-bordered h-10'
                value={inputs.fullname}
                onChange={(e) => {setInputs({...inputs, fullname : e.target.value})}}
              />
            </div>

            <div>
              <label className='label p-2'>
                <span className='text-base label-text'> Username</span>
              </label>
              <input type='text' placeholder='johndoe' className='w-full input input-bordered h-10' 
                value={inputs.username}
                onChange={(e) => {setInputs({...inputs, username: e.target.value})}}
              />
            </div>

            <div>
              <label className='label'>
                <span className='text-base label-text'>Password</span>
              </label>
              <input 
                type='password' 
                placeholder='Enter Password' 
                className='w-full input input-bordered h-10'
                value={inputs.password}
                onChange={(e) => {setInputs({...inputs, password: e.target.value})}}
                />
            </div>

            <div>
              <label className='label'>
                <span className='text-base label-text'>Confirm Password</span>
              </label>
              <input 
                type='password' 
                placeholder='Enter Password' 
                className='w-full input input-bordered h-10' 
                value={inputs.confirmPassword}
                onChange={(e) => {setInputs({...inputs, confirmPassword: e.target.value})}}
              />
            </div>

            <GenderCheckbox onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender}/>

            <Link
              className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block'
              to='/login'
            >
              Already have an account?
            </Link>


            <div>
              <button className='btn btn-block btn-sm mt-2 border border-slate-700'
                disabled={loading}
              >
                {loading? <span className='loading loading-spinner'></span>: "Sign Up"}
              </button>
            </div>
          </form>
      </div>
      
    </div>
  )
}

export default SignUp

//Starter Code for the signup component
/* 
import React from 'react'
import GenderCheckbox from './GenderCheckbox'

const SignUp = () => {
  return (
    <div className='flex flex-col items-center min-w-96 mx-auto'>
      <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter
        backdrop-blur-lg bg-opacity-0'>
          <h1 className='text-3xl font-semibold text-center text-gray-300'>
            Sign Up <span className='text-blue-500'> ChatApp</span>
          </h1>

          <form>
            <div>
              <label className='label p-2'>
                <span className='text-base label-text'> Full Name</span>
              </label>
              <input type='text' placeholder='John Doe' className='w-full input input-bordered h-10' />
            </div>

            <div>
              <label className='label p-2'>
                <span className='text-base label-text'> Username</span>
              </label>
              <input type='text' placeholder='johndoe' className='w-full input input-bordered h-10' />
            </div>

            <div>
              <label className='label'>
                <span className='text-base label-text'>Password</span>
              </label>
              <input 
                type='password' 
                placeholder='Enter Password' 
                className='w-full input input-bordered h-10' />
            </div>

            <div>
              <label className='label'>
                <span className='text-base label-text'>Confirm Password</span>
              </label>
              <input 
                type='password' 
                placeholder='Enter Password' 
                className='w-full input input-bordered h-10' />
            </div>

            <GenderCheckbox/>

            <a
              className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block'
              href='#'
            >
              Already have an account?
            </a>


            <div>
              <button className='btn btn-block btn-sm mt-2 border border-slate-700'>
                Sign Up
              </button>
            </div>
          </form>
      </div>
      
    </div>
  )
}

export default SignUp
 */
