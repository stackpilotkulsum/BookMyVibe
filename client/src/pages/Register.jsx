import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";  // ✅ added Link
import API_BASE from "../api";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  const register = () => {
    fetch(`${API_BASE}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, password })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setMsg("Registration successful! Please login.");
          setTimeout(() => navigate("/login"), 1500);
        } else {
          setMsg(data.message || "Registration failed");
        }
      })
      .catch(() => setMsg("Server error"));
  };

  return (
    <div className="container">
      <h2>Create Account</h2>

      <input
        placeholder="Full Name"
        value={name}
        onChange={e => setName(e.target.value)}
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      <button onClick={register}>Register</button>

      <p id="msg">{msg}</p>

      <p>
        Already registered?{" "}
        <Link to="/login">Login</Link> {/* ✅ FIXED */}
      </p>
    </div>
  );
}

export default Register;