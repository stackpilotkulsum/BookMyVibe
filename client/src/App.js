import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Events from "./pages/Events";
import Dashboard from "./pages/Dashboard";
import Payment from "./pages/Payment";
import MyBookings from "./pages/MyBookings";
import AdminLogin from "./pages/AdminLogin";
import Admin from "./pages/Admin";
import Success from "./pages/Success";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('/blended_background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        position: "relative",
      }}
    >
      {/* LEFT BANNER */}
      <div className="side-banner left-banner">
        <div className="banner-track">
          <div> Music Night</div>
          <div> Comedy Show</div>
          <div> Live Concert</div>
          <div> Tech Conference</div>
          <div> Drama Theatre</div>
          <div> Music Night</div>
          <div> Comedy Show</div>
          <div> Live Concert</div>
          <div> Tech Conference</div>
          <div> Drama Theatre</div>
        </div>
      </div>

      {/* RIGHT BANNER */}
      <div className="side-banner right-banner">
        <div className="banner-track reverse">
          <div> Book Now</div>
          <div> Limited Seats</div>
          <div> Easy Payment</div>
          <div> Hurry Up</div>
          <div> Top Events</div>
          <div> Book Now</div>
          <div> Limited Seats</div>
          <div> Easy Payment</div>
          <div> Hurry Up</div>
          <div> Top Events</div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="main-content">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/events" element={<Events />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/mybookings" element={<MyBookings />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/success" element={<Success />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
