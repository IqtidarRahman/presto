import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App () {
  let storageToken = null;

  if (localStorage.getItem('token')) {
    storageToken = localStorage.getItem('token');
  }
  const [token, setToken] = React.useState(storageToken);

  const updateToken = (token) => {
    setToken(token);
    localStorage.setItem('token', token);
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route path="/register" element={<Register setTokenFunc = {updateToken}/>} />
          <Route path="/login" element={<Login setTokenFunc = {updateToken}/>} /> {/* Pass the setToken function as a variable in Login */}
          <Route path="/dashboard" element={<Dashboard token = {token} setTokenFunc = {updateToken} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
