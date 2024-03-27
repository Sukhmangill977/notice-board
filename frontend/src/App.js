import React, { useState } from 'react';
import NoticeBoard from './components/NoticeBoard';
import AddNotice from './components/AddNotice';
import './App.css'; // Import CSS file for styling

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false); // Initially hidden

  const handleLogin = (username, password) => {
    if (username === 'gundeep' && password === 'qwerty') {
      setLoggedIn(true);
      setShowLoginForm(false); // Hide form on successful login
    } else {
      alert('Invalid username or password');
    }
  };

  const toggleLoginForm = () => {
    setShowLoginForm(!showLoginForm); // Toggle visibility
  };

  return (
    <div className="App">
      <NoticeBoard loggedIn={loggedIn} />
      <div className="login-button">
        {!loggedIn && ( // Show login button if not logged in
          <button className="login-button-text" onClick={toggleLoginForm}>Login</button>
        )}
      </div>
      {showLoginForm && ( // Show login form if button pressed
        <div className="login-container">
          <h2>Login</h2>
          <form onSubmit={(e) => {
            e.preventDefault();
            const username = e.target.username.value;
            const password = e.target.password.value;
            handleLogin(username, password);
          }}>
            <label>
              Username:
              <input type="text" name="username" />
            </label>
            <label>
              Password:
              <input type="password" name="password" />
            </label>
            <button type="submit" className="login-button-text">Login</button>
          </form>
        </div>
      )}
      {loggedIn && <AddNotice />} {/* Render AddNotice only if logged in */}
    </div>
  );
}

export default App;
