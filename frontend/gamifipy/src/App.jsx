import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './view/home/home.jsx'
import Auth from './view/auth/auth.jsx'
import Register from './view/auth/register.jsx';
import Profile from './view/profile/profile.jsx';
import Levels from './view/levels/levels.jsx';
import LevelView from './view/LevelView/LevelView.jsx';
import GoogleCallback from './components/GoogleCallback.jsx';
import './App.css'

function App() {
  return (
    <>
      <div>
        <Router>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/auth' element={<Auth />} />
            <Route path='/register' element={<Register />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/levels' element={<Levels />} />
            <Route path='/level/:levelId' element={<LevelView />} />
            <Route path='/auth/callback' element={<GoogleCallback />} />
          </Routes>
        </Router>
      </div>
    </>
  )
}

export default App
