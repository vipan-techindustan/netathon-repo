import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation,
  Navigate,
  Outlet
} from 'react-router-dom';
import {ToastContainer} from 'react-toastify'

import './css/style.css';

import './charts/ChartjsConfig';

// Import pages
import Dashboard from './pages/Dashboard';
import Layout from './layout';
import Website from './pages/Website';
import Login from './pages/auth/Login';
import { getStorageData } from './utils/helper';
import VerifyEmail from './pages/auth/VerifyEmail';
import Users from './pages/Users';
import Screenshots from './pages/Screenshots';
import Hashtags from './pages/Hashtags';
import WebsiteDetails from './pages/WebsiteDetails';

const ProtectedRoute = ({ user, redirectPath = '/login', children }) => {
  if (!user.isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

const PublicRoute = ({ user, redirectPath = '/', children }) => {
  if (user.isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};


function App() {

  const location = useLocation();
  const user = {
    isAuthenticated: getStorageData('auth_token')
  }

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
      <Layout user={user}>
        <Routes>
          <Route element={<ProtectedRoute user={user} redirectPath='/login' />}>
            <Route exact path="/" element={<Dashboard />} />
            <Route exact path="/ecommerce/website" element={<Website />} />
            <Route exact path="/ecommerce/website/:id" element={<WebsiteDetails />} />
            <Route exact path="/users" element={<Users />} />
            <Route exact path="/screenshots" element={<Screenshots />} />
            <Route exact path="/hashtags" element={<Hashtags />} />

          </Route>
          <Route element={<PublicRoute user={user} redirectPath='/' />}>
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/verify-email" element={<VerifyEmail />} />
          </Route>

        </Routes>
      </Layout>

    </>
  );
}

export default App;
