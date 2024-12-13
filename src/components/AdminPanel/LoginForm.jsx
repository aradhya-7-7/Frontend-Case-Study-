import { useState } from 'react';

const LoginForm = ({ setIsAuthenticated }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // In production, use proper authentication
    if (password === 'admin123') {
      setIsAuthenticated(true);
    } else {
      setError('Invalid password');
    }
  };

  return (
    <div className="login-container">
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          className="password-input"
        />
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="login-btn">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
