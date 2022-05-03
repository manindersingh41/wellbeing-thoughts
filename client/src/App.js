import React from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Home from'./Routes/Home'
import Signup from'./Routes/Register'
import Login from'./Routes/Login'
import Dashboard from'./Routes/Dashboard'
import ProtectedRoutes from './Components/ProtectedRoutes'
import { BrowserRouter as Router, Routes , Route } from 'react-router-dom';


function App() {
  return (
    <Router>
      <div className="App bg-dark">
        
          
          <Routes>
            
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/register' element={<Signup/>} />
            <Route exact path="/" element={<Home />} />
            <Route element={<ProtectedRoutes />}>
              <Route exact path='/dashboard' element={<Dashboard/>} />

            </Route>
          </Routes>
   
        
      </div>
    </Router>
  );
}

export default App;
