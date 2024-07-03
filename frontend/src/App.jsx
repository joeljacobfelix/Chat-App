import React from 'react'
import Home from './pages/home/Home.jsx'
import Login from "./pages/login/Login.jsx"
import SignUp from "./pages/signup/SignUp.jsx"
import { Routes, Route, Navigate} from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
import { useAuthContext } from './context/AuthContext.jsx'
//Note that i have installed react-hot-toast for animations that approves when successful and gives animations for error when errors come up
//I have added daisy ui to tailwindcss
const App = () => {
  const {authUser} = useAuthContext(); //from /context/AuthContext.jsx

  return (
    <div className='p-4 h-screen flex items-center justify-center'>
      <Routes>
        <Route path='/' element={authUser ? <Home/> : <Navigate to={"/login"}/>}/>
        <Route path='/login' element={authUser ? <Navigate to="/"/> : <Login/>}/>
        <Route path='/signup' element={authUser ? <Navigate to="/" /> : <SignUp/> }/> {/* Basically If the authUser is logged in then go to the home page else go back to signup page*/}
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App
