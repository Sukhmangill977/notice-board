import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <ul>
        <Link to="https://edconnect-dashboard-blond.vercel.app/">
          <li>Dashboard</li>
        </Link>

        <Link to="https://event-calender-edconnect.vercel.app/">
          <li>Event Calender</li>
        </Link>
        
        <a href="https://edconnect-meeting.vercel.app/" target="_blank" rel="noopener noreferrer">
          <li>Online Session </li>
        </a>
        <Link to="https://chat-psi-jet.vercel.app/">
          <li>Chat-App</li>
        </Link>
        <Link to="https://ed-connect.vercel.app/student">
          <li>My Account</li>
        </Link>
        
        {/* <Link to="/examination">
          <li>Examinations</li>
        </Link>

        <Link to="/attendance">
          <li>Attendance</li>
        </Link> */}

        <Link to="https://ed-connect.vercel.app/settings">
          <li>Settings</li>
        </Link>

        <Link to="https://ed-connect.vercel.app/startpage">
          <li>Logout</li>
        </Link>
        {/* Add more links as needed */}
      </ul>
    </nav >
  );
}

export default Navbar;
