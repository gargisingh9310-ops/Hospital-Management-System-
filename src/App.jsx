import React, { useState } from 'react'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import Dashboard from './components/Dashboard'
import "./stylesheet/App.css"

export default function App() {
  const [activeModule, setActiveModule]= useState("patients")
  return (
    <div className='app-container'>
      <Sidebar setActiveModule={setActiveModule}/>
      <div className='main-container'>
        <Navbar/>
        <div className='dashboard-container'>
          <Dashboard activeModule={activeModule}/>
        </div>
      </div>
    </div>
  )
}
