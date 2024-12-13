import { useState } from 'react';
import LoginForm from './LoginForm';
import Dashboard from './Dashboard';
import './AdminPanel.css';

const AdminPanel = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className="admin-container">
      {!isAuthenticated ? (
        <LoginForm setIsAuthenticated={setIsAuthenticated} />
      ) : (
        <Dashboard />
      )}
    </div>
  );
};

export default AdminPanel;
