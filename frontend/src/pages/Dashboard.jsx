import React from 'react';
import { useNavigate } from 'react-router-dom';
import LogoutButton from '../components/LogoutButton';

function Dashboard ({ token, setTokenFunc }) {
  const navigate = useNavigate();
  if (token === null) {
    navigate('/login');
  }
  return <>
    <LogoutButton token = {token} setTokenFunc = {setTokenFunc}/>
    Dashboard
  </>;
}

export default Dashboard;
