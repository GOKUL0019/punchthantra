import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Patient from './Patient';
import LoginRegister from './login';
import DoctorDashboard from './doctor';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginRegister />} />
        <Route path="/patient" element={<Patient />} />
        <Route path="/doctor" element={<DoctorDashboard />}/>
      </Routes>
    </Router>
  );
}

export default App;
