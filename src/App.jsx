import React, { Suspense } from 'react'
import './App.css'
import { AppRouter } from './routers/AppRouter'
import './styles/global.css';

function App() {

  return (
    <>
      <Suspense>
      <AppRouter />
      </Suspense>
    </>
  )
}

export default App
