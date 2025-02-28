import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login.jsx";
import { ClerkProvider } from "@clerk/clerk-react";
import Home from "./pages/Home.jsx"; // Import Home

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const router = createBrowserRouter([
  {
    element: <App />,
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/auth/login",
    element: <Login />,
  },
]);

createRoot(document.getElementById('root')).render(
 
    <StrictMode>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl='/'>
        <RouterProvider router={router} />
      </ClerkProvider>
    </StrictMode>
)
