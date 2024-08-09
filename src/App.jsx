import React from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import GeneraLayout from './components/generaLayout'
import HomePage from './pages/Home'
import LoginPage from './components/Login'
import UpdatePage from './pages/Update'
import CreatePage from './pages/Create'
import ReadPage from './pages/Read'
import Products from './Products'

function App() {

  return (
    <BrowserRouter>
      <React.Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path='/' element={<GeneraLayout />}>
            <Route index element={<HomePage />} />
            <Route path='/update/:id' element={<UpdatePage />} />
            <Route path='/read/:id' element={<ReadPage />} />
            <Route path='/create' element={<CreatePage />} />
            <Route path='/products' element={<Products />} />
          </Route>
          <Route path='/login' element={<LoginPage />} />
        </Routes>
      </React.Suspense>
    </BrowserRouter>
  )
}

export default App
