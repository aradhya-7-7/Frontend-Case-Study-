import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProfilePage from './components/ProfilePage';
import AdminPanel from './components/AdminPanel/AdminPanel';
import { ProfileProvider } from './context/ProfileContext';

function App() {
  return (
    <ProfileProvider>
      <Router>
        <Routes>
          <Route path="/" element={<ProfilePage />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </Router>
    </ProfileProvider>
  );
}

export default App;