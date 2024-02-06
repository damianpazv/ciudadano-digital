import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
//import './App.css'
import { Registro } from './components/Registro'
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom/dist';
import Login from './components/Login/Login';

function App() {
  
  return (
    <div>

<BrowserRouter>

<Routes>

{/* <Route  path='/'  element={ <Login />   } /> */}
<Route  path='/login'  element={ <Login />   } />

<Route  path='/'  element={ <Registro />   } />

</Routes>
</BrowserRouter>











    </div>
  )





}

export default App
