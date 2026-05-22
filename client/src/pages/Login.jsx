import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API_BASE from "../api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  const login = () => {
    fetch(`${API_BASE}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    })
      .then(res => res.json())
      .then(data => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("role", data.role);
          localStorage.setItem("email", email);
          setMsg("Login successful!");
          setTimeout(() => navigate("/dashboard"), 1000);
        } else {
          setMsg(data.message || "Login failed");
        }
      })
      .catch(() => setMsg("Error connecting to server"));
  };

  return (
    <div className="container">
      <h2>Login</h2>

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

      <button onClick={login}>Login</button>

      <p>
        <a href="/forgot-password">Forgot Password?</a>
      </p>

      <p id="msg">{msg}</p>

      <p>
        Are you an admin? <a href="/adminlogin">Login as Admin</a>
      </p>
    </div>
  );
}

export default Login;
