import React, { useState } from 'react';
import backgroundImage from '../images/wallpaper.jpg';
import '../css/AuthForm.css';

function LoginForm({ onSubmit, onSwitchToRegister }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Front-end validation
    if (!username || !password) {
      setError('Username and password are required.');
      return;
    }

    try {
      const response = await fetch('http://localhost/Biletes-php/login.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({ username, password }),
      });

      const data = await response.json();

      console.log('Response Status:', response.status);
      console.log('Response Text:', JSON.stringify(data));

      if (data.success) {
        // Additional actions for successful login
      } else {
        setError(data.message);
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
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="errorCont">
          {error && <p className="error-message">{error}</p>}
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
  const [error, setError] = useState('');

  const handleRegistration = async (e) => {
    e.preventDefault();

    // Front-end validation
    if (!username || !email || !password || !verifyPassword) {
      setError('All fields are required.');
      return;
    }

    if (password !== verifyPassword) {
      setError('Password and Verify Password must match.');
      return;
    }

    try {
      const response = await fetch('http://localhost/Biletes-php/register.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({ username, password, email }),
      });

      const textResponse = await response.text();

      try {
        const data = JSON.parse(textResponse);
        console.log('Registration response:', data);
        if (data.success) {
          // Additional actions for successful registration
        } else {
          setError(data.message);
        }
      } catch (jsonError) {
        console.error('Error parsing JSON:', jsonError);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="auth-form-container">
      <h2>Register</h2>
      <form className="auth-form" onSubmit={handleRegistration}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="verifyPassword">Verify Password:</label>
          <input
            type="password"
            id="verifyPassword"
            name="verifyPassword"
            value={verifyPassword}
            onChange={(e) => setVerifyPassword(e.target.value)}
          />
        </div>
        <div className="errorCont">
          {error && <p className="error-message">{error}</p>}
        </div>
        <button type="submit" value="Register">Register</button>
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

  const handleLoginSubmit = async (data) => {
    if (data.success) {
      console.log('Login successful');
      // Redirect or perform other actions for a successful login
    } else {
      console.error('Login failed:', data.message);
      // Display an error message to the user
    }
  };
  
  const handleRegisterSubmit = async (data) => {
    if (data.success) {
      console.log('Registration successful');
      // Redirect or perform other actions for a successful registration
    } else {
      console.error('Registration failed:', data.message);
      // Display an error message to the user
    }
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
