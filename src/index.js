import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthForm from './components/AuthForm.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthForm />} />
      </Routes>
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
