import React, { useState } from 'react';
import backgroundImage from '../images/wallpaper.jpg';
import '../css/AuthForm.css';

function LoginForm({ onSubmit, onSwitchToRegister }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData(e.target);
    const username = formData.get('username');
    const password = formData.get('password');
  
    try {
      const response = await fetch('http://localhost/Biletes-php/login.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      const textResponse = await response.text(); // Get response as text
  
      // Check if response contains JSON
      const jsonStartIndex = textResponse.indexOf('{');
      const jsonEndIndex = textResponse.lastIndexOf('}');
      const jsonResponse = textResponse.substring(jsonStartIndex, jsonEndIndex + 1);
  
      try {
        const data = JSON.parse(jsonResponse);
        onSubmit(data); // Handle the response in your app
      } catch (jsonError) {
        console.error('Error parsing JSON:', jsonError);
        console.log('Text Response:', textResponse); // Log the response for debugging
      }
  
      setUsername('');
      setPassword('');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="auth-form-container">
      <h2>Login</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
        <p>
          Don't have an account?{' '}
          <span className="link" onClick={onSwitchToRegister}>
            Sign Up
          </span>
        </p>
      </form>
    </div>
  );
}

function RegisterForm({ onSubmit, onSwitchToLogin }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ username, email, password, verifyPassword });
    setUsername('');
    setEmail('');
    setPassword('');
    setVerifyPassword('');
  };

  return (
    <div className="auth-form-container">
      <h2>Register</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="verifyPassword">Verify Password:</label>
          <input
            type="password"
            id="verifyPassword"
            value={verifyPassword}
            onChange={(e) => setVerifyPassword(e.target.value)}
          />
        </div>
        <button type="submit">Register</button>
        <p>
          Already have an account?{' '}
          <span className="link" onClick={onSwitchToLogin}>
            Sign In
          </span>
        </p>
      </form>
    </div>
  );
}

function App() {
  const [showLogin, setShowLogin] = useState(true);

  const handleLoginSubmit = (data) => {
    console.log('Logging in user:', data);
  };

  const handleRegisterSubmit = (data) => {
    console.log('Registering user:', data);
  };

  return (
    <div className="background">
      <div className="blur" style={{ backgroundImage: `url(${backgroundImage})` }}></div>
      <div className="auth-container">
        {showLogin ? (
          <LoginForm
            onSubmit={handleLoginSubmit}
            onSwitchToRegister={() => setShowLogin(false)}
          />
        ) : (
          <RegisterForm
            onSubmit={handleRegisterSubmit}
            onSwitchToLogin={() => setShowLogin(true)}
          />
        )}
      </div>
      <div className="footer"></div>
    </div>
  );
}

export default App;
