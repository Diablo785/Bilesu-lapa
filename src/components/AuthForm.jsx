import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../images/wallpaper.jpg';
import '../css/AuthForm.css';

function LoginForm({ onSubmit, onSwitchToRegister }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username && !password) {
      setError('Username and Password are required.');
      setSuccessMessage('');
      return;
    }

    if (!username) {
      setError('Username is required.');
      setSuccessMessage('');
      return;
    }

    if (!password) {
      setError('Password is required.');
      setSuccessMessage('');
      return;
    }

    try {
      const response = await fetch('http://localhost/Biletes-php/login.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({ username, password }),
        credentials: 'include', // Include this line
      });

      const data = await response.json();

      console.log('Response Status:', response.status);
      console.log('Response Text:', JSON.stringify(data));

      if (data.success) {
        setSuccessMessage('Login successful!');
        setError('');

        setTimeout(() => {
          navigate('/allEvents');
          window.location.reload();
        }, 1000);
      } else {
        setError(data.message);
        setSuccessMessage('');
      }

      setUsername('');
      setPassword('');
    } catch (error) {
      console.error('Error during login:', error);
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
        <div className="messageCont">
          {successMessage && <p className="success-message">{successMessage}</p>}
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
  const [successMessage, setSuccessMessage] = useState('');

  const handleRegistration = async (e) => {
    e.preventDefault();

    if (!username || !email || !password || !verifyPassword) {
      setError('All fields are required.');
      setSuccessMessage('');
      return;
    }

    if (username.length < 5) {
      setError('Username must be at least 6 characters long.');
      setSuccessMessage('');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Enter a valid email address.');
      setSuccessMessage('');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      setSuccessMessage('');
      return;
    }

    if (password !== verifyPassword) {
      setError('Password and Verify Password must match.');
      setSuccessMessage('');
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
          setSuccessMessage('Registration successful! You can now Log In');
          setError('');
        } else {
          setError(data.message);
          setSuccessMessage('');
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
        <div className="messageCont">
          {successMessage && <p className="success-message">{successMessage}</p>}
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
    } else {
      console.error('Login failed:', data.message);
    }
  };

  const handleRegisterSubmit = async (data) => {
    if (data.success) {
      console.log('Registration successful');
    } else {
      console.error('Registration failed:', data.message);
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
