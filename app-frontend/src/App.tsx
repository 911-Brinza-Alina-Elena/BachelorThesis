import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/login-page/login-page';
import { LoggedIn } from './utils/logged-in';
import { ProtectedRoute } from './utils/protected-route';
import { PatientDashboard } from './pages/patient-dashboard/patient-dashboard';
import { TherapistDashboard } from './pages/therapist-dashboard/therapist-dashboard';
import { logoStyle } from './pages/login-page/login-page-style';
import { JournalPage } from './pages/journal-page/journal-page';

const App = () => {
  // logic to check if the user is a patient or therapist and if they are logged in
  // if they are a patient and logged in, render the patient dashboard
  // if they are a therapist and logged in, render the therapist dashboard
  // if they are not logged in, render the login page
  
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
          <PatientDashboard />
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
