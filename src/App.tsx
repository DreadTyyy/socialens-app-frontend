import { Route, Routes, useLocation } from 'react-router';
import Dashboard from './pages/Dashboard';
import NavbarDashboard from './components/NavbarDashboard';
import NavbarGeneral from './components/NavbarGeneral';
import HomePage from './pages/HomePage';
import Analytics from './pages/Analytics';
import Login from './pages/Login';
import Register from './pages/Register';
import { useEffect, useState } from 'react';
import { getAuthUser } from './utils/api';

import { User } from "./utils/models/user";
import ContainerDashboard from './components/ContainerDashboard';

const App = () => {
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [isDashboard, setIsDashboard] = useState<boolean>(false);
  const [showNav, setShowNav] = useState<boolean>(true);
  const [initialization, setInitialization] = useState<boolean>(true);

  const location = useLocation();

  useEffect(() => {
    async function getUser() {
      if (location.pathname.includes("dashboard") || location.pathname.includes("login") || location.pathname.includes("register")) {
        const {data} = await getAuthUser();
        setShowNav(false);

        if (data) {
          setAuthUser(data);

          setIsDashboard(true)
          setInitialization(false);
        } else {
          if (!location.pathname.includes("login") && !location.pathname.includes("register")) {
            window.location.href = "/login";
          }
          setInitialization(false);
        }
      } else {
        setIsDashboard(false);
        setInitialization(false)
      }
    }
    
    getUser()
  }, [location.pathname, setInitialization]);

  if (initialization) {
    return null;
  }

  return (
    <>
      {!isDashboard && showNav && <NavbarGeneral />}
      {isDashboard && authUser && <NavbarDashboard authUser={authUser}/>}

      <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path='/login' element={<Login authUser={authUser}/>}/>
        <Route path='/register' element={<Register authUser={authUser}/>}/>
        {authUser &&
        <>
          <Route path='/dashboard' element={
            <ContainerDashboard path="dashboard">
              <Dashboard authUser={authUser}/>
            </ContainerDashboard>
            }/>
          <Route path='/dashboard/analytics' element={
            <ContainerDashboard path="analytics">
              <Analytics authUser={authUser}/>
            </ContainerDashboard>
            }/>
        </>
        }
      </Routes>
    </>
  )
}

export default App
