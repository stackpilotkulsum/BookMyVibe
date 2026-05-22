import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/">Home</Link>
        <Link to="/events">Events</Link>
        <Link to="/register">Register</Link>
        <Link to="/login">User Login</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/mybookings">My Tickets</Link>
      </div>
      <div className="nav-right">
        <Link to="/adminlogin">Admin Login</Link>
      </div>
    </nav>
  );
}

export default Navbar;
