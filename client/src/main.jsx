// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import Login from "./pages/Login.jsx";
// import { ClerkProvider } from "@clerk/clerk-react";
// import Home from "./pages/Home.jsx"; // Import Home

// const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// const router = createBrowserRouter([
//   {
//     element: <App />,
//   },
//   {
//     path: "/",
//     element: <Home />,
//   },
//   {
//     path: "/auth/login",
//     element: <Login />,
//   },
// ]);

// createRoot(document.getElementById('root')).render(
 
//     <StrictMode>
//       <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl='/'>
//         <RouterProvider router={router} />
//       </ClerkProvider>
//     </StrictMode>
// )
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import { ClerkProvider, useAuth } from "@clerk/clerk-react";
import Home from "./pages/Home.jsx";
// Import all the pages for the routes
import Files from "./pages/Files.jsx";
import Starred from "./pages/Starred.jsx";
import CollabEdit from "./pages/CollabEdit.jsx";
import FileConvertor from "./pages/FileConvertor.jsx";
import Recent from "./pages/Recent.jsx";
import Settings from "./pages/Settings.jsx";
import Loading from './components/Loading';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { isSignedIn, isLoaded } = useAuth();
  
  // Show loading state while auth is being checked
  if (!isLoaded) {
    return <Loading />
  }
  
  // Redirect to login if not signed in
  if (!isSignedIn) {
    return <Navigate to="/auth/login" replace />;
  }
  
  // If signed in, render the children
  return children;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/files",
        element: <Files />,
      },
      {
        path: "/starred",
        element: <Starred />,
      },
      {
        path: "/collab",
        element: <CollabEdit />,
      },
      {
        path: "/convertor",
        element: <FileConvertor />,
      },
      {
        path: "/recent",
        element: <Recent />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
    ],
  },
  {
    path: "/auth/login",
    element: <Login />,
  },
  // Catch-all redirect to login
  {
    path: "*",
    element: <Navigate to="/auth/login" replace />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl='/auth/login'>
      <RouterProvider router={router} />
    </ClerkProvider>
  </StrictMode>
)