import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Landing from './pages/Landing'
import Register from './pages/Register'
import { UserAuthContextProvider } from './authentication/UserAuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Teach from './pages/Teach'
import Message from './pages/Message'
import SamplePage2 from './pages/SamplePage2'
import InstructorsPage from './pages/InstructorsPage'
import Navbar from './components/Navbar'
import Portfolio from './pages/Portfolio'
import Scroll from './components/Scroll'

function App() {
  
  return (
    <>
      <UserAuthContextProvider>
        <BrowserRouter>
          <Navbar/>
          <Scroll>
            <Routes>
              <Route path="/landing" element={<Landing />} />
              <Route path="/register" element={<Register />} />
              <Route path="/page2" element={<ProtectedRoute><SamplePage2 /></ProtectedRoute>} />
              <Route path="/teach" element={<ProtectedRoute><Teach /></ProtectedRoute>} />
              <Route path="/message" element={<ProtectedRoute><Message /></ProtectedRoute>} />
              <Route path="/instructors/:skill" element={<ProtectedRoute><InstructorsPage/></ProtectedRoute>} />
              <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
              <Route path="/portfolio/:name" element={<ProtectedRoute><Portfolio /></ProtectedRoute>} />
              <Route
                path="*"
                element={<Navigate to="/landing" replace />}
              />
            </Routes>
          </Scroll>
        </BrowserRouter>
      </UserAuthContextProvider>
    </>
  )
}

export default App;