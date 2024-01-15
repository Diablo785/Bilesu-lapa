import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header.jsx';
import AuthForm from './components/AuthForm.jsx';
import AllEvents from './components/AllEvents.jsx';
import AddEvent from './components/AddEvent.jsx';

function App() {
  return (
    <Router>
      <Header />
        <Routes>
          <Route path="/authForm" element={<AuthForm />} />
          <Route path="/allEvents" element={<AllEvents />} />
          <Route path="/addEvent" element={<AddEvent />} />
        </Routes>
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));