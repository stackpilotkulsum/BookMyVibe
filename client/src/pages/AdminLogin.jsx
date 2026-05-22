import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API_BASE from "../api";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  const adminLogin = (e) => {
    e.preventDefault();

    fetch(`${API_BASE}/adminlogin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          localStorage.setItem("token", "admin-token");
          localStorage.setItem("role", "admin");
          localStorage.setItem("email", email);
          setMsg("Admin Login Successful");
          setTimeout(() => navigate("/admin"), 1000);
        } else {
          setMsg(data.message || "Invalid Admin Credentials");
        }
      })
      .catch(() => setMsg("Error connecting to server"));
  };

  return (
    <div className="container">
      <h2>Admin Login</h2>

      <form onSubmit={adminLogin}>
        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login as Admin</button>
      </form>

      <p>{msg}</p>
    </div>
  );
}

export default AdminLogin;
