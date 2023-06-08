import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/login-page/login-page';
import { LoggedIn } from './utils/logged-in';
import { ProtectedRoute } from './utils/protected-route';
import { PatientDashboard } from './pages/patient-dashboard/patient-dashboard';
import { TherapistDashboard } from './pages/therapist-dashboard/therapist-dashboard';
import { logoStyle } from './pages/login-page/login-page-style';
import { JournalPage } from './pages/journal-page/journal-page';
import { Icon, Panel, Persona } from '@fluentui/react';
import { useState } from 'react';
import { UserPanel } from './components/user-panel/user-panel';
import { logoutUser } from './services/auth-service';
import { UserMenu } from './components/user-menu/user-menu';

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
  
  return (
    <>
    <img src="/therapease-low-resolution-logo-color-on-transparent-background.png" alt="Therapease Logo" className={logoStyle}/>
    <Routes>
      <Route path="/" element={<Navigate to='/login' replace/>} />
      <Route path="/login" element={
        <LoggedIn>
          <LoginPage />
        </LoggedIn>
      } />
      <Route path="/patient" element={
        <ProtectedRoute>
          <UserMenu username={localStorage.getItem('username')!} handleUsernameClick={handleUsernameClick} setShowPanel={setShowPanel} />
          <PatientDashboard />
          <Panel
                    isOpen={showPanel}
                    onDismiss={() => setShowPanel(false)}
                    headerText="Menu"
                    isBlocking={false}
                    closeButtonAriaLabel="Close"
                >
                    <UserPanel userType={localStorage.getItem('userType')!} onLogout={handleLogout} />
                </Panel>
        </ProtectedRoute>
      } />
      <Route path="/therapist" element={
        <ProtectedRoute>
          <TherapistDashboard />
        </ProtectedRoute>
      } />
      <Route path='/patient/journal/:id' element={
        <ProtectedRoute>
          <JournalPage />
        </ProtectedRoute>
      } />
    </Routes>
    </>
  );
}

export default App;
