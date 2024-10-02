import React, { Suspense } from 'react'
import './App.css'
import { AppRouter } from './routers/AppRouter'
import './styles/global.css';
import { Loading } from './components';

function App() {

  return (
    <>
      <Suspense fallback={<Loading/>}>
        <AppRouter />
      </Suspense>
    </>
  )
}

export default App
