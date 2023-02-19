import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Landing from './pages/Landing'
import Register from './pages/Register'
import { UserAuthContextProvider } from './authentication/UserAuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import SamplePage1 from './pages/SamplePage1'
import SamplePage2 from './pages/SamplePage2'
import Navbar from './components/Navbar'
import Portfolio from './pages/Portfolio'

function App() {
  
  return (
    <>
      <UserAuthContextProvider>
        <BrowserRouter>
          <Navbar/>
          <Routes>
            <Route path="/page2" element={<ProtectedRoute><SamplePage2 /></ProtectedRoute>} />
            <Route path="/page1" element={<ProtectedRoute><SamplePage1 /></ProtectedRoute>} />
            <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/landing" element={<Landing />} />
            <Route path="/register" element={<Register />} />
            <Route path="/portfolio/:name" element={<Portfolio />} />
            <Route
              path="*"
              element={<Navigate to="/landing" replace />}
            />
          </Routes>
        </BrowserRouter>
      </UserAuthContextProvider>
    </>
  )
}

export default App;