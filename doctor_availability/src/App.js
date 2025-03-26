import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Patient from './Patient';
import LoginRegister from './login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginRegister />} />
        <Route path="/patient" element={<Patient />} />
      </Routes>
    </Router>
  );
}

export default App;
