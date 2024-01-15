import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import user_icon from '../images/user_icon.png';
import '../css/Header.css';

function Header() {
    const [userData, setUserData] = useState(null);
    const [isUserMenuOpen, setUserMenuOpen] = useState(false);
    const navigate = useNavigate();
    const userMenuRef = useRef(null);

    const toggleUserMenu = () => {
        setUserMenuOpen(!isUserMenuOpen);
    };

    const closeUserMenu = (e) => {
        // Close the user menu if clicked outside of it
        if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
            setUserMenuOpen(false);
        }
    };

    const logout = async () => {
      try {
        // Clear user data immediately upon initiating logout
        setUserData(null);
  
        const response = await fetch('http://localhost/Biletes-php/logout.php', {
          method: 'GET',
          credentials: 'include',
        });
  
        const data = await response.json();
  
        if (data.success) {
          navigate('/authForm');
        } else {
          console.error('Logout failed:', data.message);
        }
      } catch (error) {
        console.error('Error during logout:', error);
      }
    };

    const getUserData = async () => {
    try {
      const response = await fetch('http://localhost/Biletes-php/getUserData.php', {
        method: 'GET',
        credentials: 'include',
      });

      const data = await response.json();

      console.log('User data response:', data);

      if (data.sessionId) {
        // Debug statements to log session and user data
        console.log('Session ID:', data.sessionId);
        console.log('User ID:', data.user ? data.user.id : 'N/A');
        console.log('Username:', data.user ? data.user.username : 'N/A');
        console.log('Email:', data.user ? data.user.email : 'N/A');

        if (data.user) {
          setUserData(data.user);
        } else {
          console.warn('User data retrieval failed:', data.message);
        }
      } else {
        // Session ID not available yet, try again after a delay
        setTimeout(getUserData, 500);
      }
    } catch (error) {
      console.error('Error getting user data:', error);
    }
  };
  


    useEffect(() => {
        // Add event listener to close user menu when clicking outside of it
        document.addEventListener('mousedown', closeUserMenu);

        // Cleanup the event listener
        return () => {
            document.removeEventListener('mousedown', closeUserMenu);
        };
    }, []);

    useEffect(() => {
        getUserData(); // Invoke the function immediately after mounting
    }, []);

    return (
        <div className="header">
            <div className="buttonCont">
                <Link to="/allEvents" className="button">
                    All Events
                </Link>
                <Link to="/addEvent" className="button">
                    Add Event
                </Link>
            </div>
            <div className="user_icon" onClick={toggleUserMenu}>
                <img src={user_icon} alt="User Icon" />
            </div>
            <div className={`userMenuContainer ${isUserMenuOpen ? 'open' : ''}`} ref={userMenuRef}>
                <div className="userMenuContent">
                    {userData ? (
                        <>
                            <p>{userData.username}</p>
                            <p>{userData.email}</p>
                            <button onClick={logout}>Logout</button>
                        </>
                    ) : (
                        <>
                            <Link className="userMenuButton" to="/authForm">
                                Sign In
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Header;
