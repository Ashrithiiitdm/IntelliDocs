import { useState } from 'react';
import './App.css';
import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import Header from './components/Header.jsx';

function App() {
  
  const {user, isLoaded, isSignedIn} = useUser();

  if(!isSignedIn && isLoaded) {
    return <Navigate to = {'/auth/login'} />;
  }

  return (
    <>
      <Header />
    </>
  )
}

export default App;