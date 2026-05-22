import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Events() {
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const events = [
    { id: 1, name: "Music Night",      price: 150, defaultSeat: "A1" },
    { id: 2, name: "Tech Conference",  price: 200, defaultSeat: "B1" },
    { id: 3, name: "Comedy Show",      price: 120, defaultSeat: "C1" },
    { id: 4, name: "Drama Theatre",    price: 180, defaultSeat: "D1" },
    { id: 5, name: "Food Festival",    price: 100, defaultSeat: "E1" },
    { id: 6, name: "Sports Match",     price: 250, defaultSeat: "F1" },
    { id: 7, name: "Startup Meetup",   price: 80,  defaultSeat: "G1" },
    { id: 8, name: "Movie Premiere",   price: 220, defaultSeat: "H1" }
  ];

  const book = (event) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first to book tickets");
      navigate("/login");
      return;
    }

    localStorage.setItem("selectedEvent", event.name);
    localStorage.setItem("selectedSeat", event.defaultSeat);
    localStorage.setItem("selectedPrice", event.price);

    setMsg("Event selected: " + event.name + ". Redirecting to payment...");

    setTimeout(() => navigate("/payment"), 1000);
  };

  return (
    <div className="container">
      <h2>Available Events</h2>

      {events.map((event) => (
        <div key={event.id} className="ticket-card">
          <span>
            {event.name} – ₹{event.price}
          </span>
          <button onClick={() => book(event)}>Book Now</button>
        </div>
      ))}

      <p id="msg">{msg}</p>
    </div>
  );
}

export default Events;
