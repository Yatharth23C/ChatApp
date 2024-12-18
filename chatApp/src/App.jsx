import { useState } from 'react'
import NavBar from './components/NavBar'
import './App.css'
import {Outlet} from 'react-router-dom'

function App() {


  return (
    <> 
      <div className='w-screen h-screen flex-col'>
      <NavBar />
      <Outlet />
      </div>
      </>
      )
    
}

export default App
