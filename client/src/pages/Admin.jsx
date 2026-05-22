import { useEffect, useState } from "react";
import API_BASE from "../api";

function Admin() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE}/allbookings`)
      .then(res => res.json())
      .then(data => setBookings(data))
      .catch(() => setBookings([]));
  }, []);

  const totalTickets = bookings.length;
  const revenue = totalTickets * 150; // demo price

  return (
    <div className="container">
      <h2>Admin Dashboard</h2>

      <p>Tickets Sold: {totalTickets}</p>
      <p>Revenue: ₹{revenue}</p>

      <hr />

      {bookings.map((b, i) => (
        <div key={i} style={{ marginBottom: "10px" }}>
          <b>{b.eventName}</b> | Seat: {b.seat} | {b.userEmail}
        </div>
      ))}
    </div>
  );
}

export default Admin;
