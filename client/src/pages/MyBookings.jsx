import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API_BASE from "../api";

function MyBookings() {
  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");

    if (!token || !email) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    fetch(`${API_BASE}/mybookings?email=${email}`)
      .then(res => res.json())
      .then(data => setTickets(data))
      .catch(() => setError("Error loading bookings"));
  }, [navigate]);

  const cancelBooking = (id) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;

    fetch(`${API_BASE}/cancelbooking/${id}`, {
      method: "DELETE",
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          alert("Booking cancelled successfully!");
          setTickets(prev => prev.filter(t => t._id !== id));
        } else {
          alert("Failed to cancel booking");
        }
      })
      .catch(() => alert("Server error"));
  };

  return (
    <div className="container">
      <h2>My Tickets</h2>

      {error && <p>{error}</p>}

      {tickets.length === 0 && !error && <p>No bookings found</p>}

      {tickets.map((b) => (
        <div className="ticket-card" key={b._id}>
          <b>Event:</b> {b.eventName} <br />
          <b>Date:</b> {b.date ? b.date : "Not Available"} <br />
          <b>Seat:</b> {b.seat} <br />

          <button
            style={{
              marginTop: "10px",
              padding: "8px 12px",
              borderRadius: "8px",
              border: "none",
              background: "#e74c3c",
              color: "white",
              cursor: "pointer"
            }}
            onClick={() => cancelBooking(b._id)}
          >
            Cancel Booking
          </button>
        </div>
      ))}
    </div>
  );
}

export default MyBookings;
