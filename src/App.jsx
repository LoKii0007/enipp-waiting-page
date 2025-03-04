import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ComingSoonPage from './comonents/ComingSoon'
import './css/home.css'
import './App.css'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ComingSoonPage />} />
        <Toaster position='top-right'/>
      </Routes>
    </Router>
  )
}

export default App
