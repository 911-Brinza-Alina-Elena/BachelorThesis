import { Panel } from '@fluentui/react';
import { useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import { UserMenu } from './components/user-menu/user-menu';
import { UserPanel } from './components/user-panel/user-panel';
import { JournalPage } from './pages/journal-page/journal-page';
import LoginPage from './pages/login-page/login-page';
import { logoStyle } from './pages/login-page/login-page-style';
import { PatientDashboard } from './pages/patient-dashboard/patient-dashboard';
import { TherapistDashboard } from './pages/therapist-dashboard/therapist-dashboard';
import { logoutUser } from './services/auth-service';
import { LoggedIn } from './utils/logged-in';
import { ProtectedRoute } from './utils/protected-route';
import { AddJournalPage } from './pages/add-journal-page/add-journal-page';
import { UserPage } from './pages/user-page/user-page';

const App = () => {
  const [showPanel, setShowPanel] = useState(false);
  const navigate = useNavigate();
  const handleUsernameClick = () => {
    navigate('/user');
  };

  const handleLogout = () => {
    logoutUser().then((response) => {
        if (response) {
          setShowPanel(false);
            navigate('/login');
        }
    }).catch((error) => {
      setShowPanel(false);
        console.log(error);
        navigate('/login');
    });
  };
  
  const handleLogoClick = () => { 
    if (localStorage.getItem("token") !== null) {
      if (localStorage.getItem("userType") === "patient") {
        navigate("/patient");
      } else if (localStorage.getItem("userType") === "therapist") {
        navigate("/therapist");
      } else {
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <img
        src="/therapease-low-resolution-logo-color-on-transparent-background.png"
        alt="Therapease Logo"
        className={logoStyle}
        onClick={handleLogoClick}
      />
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route
          path="/login"
          element={
            <LoggedIn>
              <LoginPage />
            </LoggedIn>
          }
        />
        <Route
          path="/patient"
          element={
            <ProtectedRoute>
              <UserMenu
                username={localStorage.getItem("username")!}
                handleUsernameClick={handleUsernameClick}
                setShowPanel={setShowPanel}
              />
              <PatientDashboard />
              <Panel
                isOpen={showPanel}
                onDismiss={() => setShowPanel(false)}
                headerText="Menu"
                isBlocking={false}
                closeButtonAriaLabel="Close"
              >
                <UserPanel
                  userType={localStorage.getItem("userType")!}
                  onLogout={handleLogout}
                />
              </Panel>
            </ProtectedRoute>
          }
        />
        <Route
          path="/therapist"
          element={
            <ProtectedRoute>
              <UserMenu
                username={localStorage.getItem("username")!}
                handleUsernameClick={handleUsernameClick}
                setShowPanel={setShowPanel}
              />
              <TherapistDashboard />
              <Panel
                isOpen={showPanel}
                onDismiss={() => setShowPanel(false)}
                headerText="Menu"
                isBlocking={false}
                closeButtonAriaLabel="Close"
              >
                <UserPanel
                  userType={localStorage.getItem("userType")!}
                  onLogout={handleLogout}
                />
              </Panel>
            </ProtectedRoute>
          }
        />
        <Route
          path="/patient/journal/:id"
          element={
            <ProtectedRoute>
              <UserMenu
                username={localStorage.getItem("username")!}
                handleUsernameClick={handleUsernameClick}
                setShowPanel={setShowPanel}
              />
              <JournalPage />
              <Panel
                isOpen={showPanel}
                onDismiss={() => setShowPanel(false)}
                headerText="Menu"
                isBlocking={false}
                closeButtonAriaLabel="Close"
              >
                <UserPanel
                  userType={localStorage.getItem("userType")!}
                  onLogout={handleLogout}
                />
              </Panel>
            </ProtectedRoute>
          }
        />
        <Route
          path="/patient/add-journal"
          element={
            <ProtectedRoute>
              <UserMenu
                username={localStorage.getItem("username")!}
                handleUsernameClick={handleUsernameClick}
                setShowPanel={setShowPanel}
              />
              <AddJournalPage />
              <Panel
                isOpen={showPanel}
                onDismiss={() => setShowPanel(false)}
                headerText="Menu"
                isBlocking={false}
                closeButtonAriaLabel="Close"
              >
                <UserPanel
                  userType={localStorage.getItem("userType")!}
                  onLogout={handleLogout}
                />
              </Panel>
            </ProtectedRoute>
          }
        />
        <Route 
          path="/user"
          element={
            <ProtectedRoute>
              <UserMenu
                username={localStorage.getItem("username")!}
                handleUsernameClick={handleUsernameClick}
                setShowPanel={setShowPanel} />
              <UserPage />
              <Panel
                isOpen={showPanel}
                onDismiss={() => setShowPanel(false)}
                headerText="Menu"
                isBlocking={false}
                closeButtonAriaLabel="Close" >
                <UserPanel
                  userType={localStorage.getItem("userType")!}
                  onLogout={handleLogout} />
                </Panel>
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;


