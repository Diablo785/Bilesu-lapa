import React, { useState } from 'react';
import '../css/AuthForm.css';

function LoginForm({ onSubmit, onSwitchToRegister }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ username, password });
        setUsername('');
        setPassword('');
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
        <div>
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
    );
}

export default App;
