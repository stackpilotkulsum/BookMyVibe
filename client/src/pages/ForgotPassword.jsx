import { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // ✅ added Link
import API_BASE from "../api";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  const resetPassword = () => {
    if (!email || !newPassword) {
      setMsg("Please fill all fields");
      return;
    }

    fetch(`${API_BASE}/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, newPassword })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setMsg("Password updated! Redirecting to login...");
          setTimeout(() => navigate("/login"), 1500);
        } else {
          setMsg(data.message || "Failed to reset password");
        }
      })
      .catch(() => setMsg("Server error"));
  };

  return (
    <div className="container">
      <h2>Forgot Password</h2>

      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Enter new password"
        value={newPassword}
        onChange={e => setNewPassword(e.target.value)}
      />

      <button onClick={resetPassword}>Reset Password</button>

      <p>{msg}</p>

      {/* ✅ Added navigation link */}
      <p>
        Back to <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default ForgotPassword;