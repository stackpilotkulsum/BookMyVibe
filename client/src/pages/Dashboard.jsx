import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API_BASE from "../api";

function Dashboard() {
  const [eventName, setEventName] = useState("");
  const [date, setDate] = useState("");
  const [selectedSeat, setSelectedSeat] = useState("");
  const [bookedSeats, setBookedSeats] = useState([]);
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  const seats = ["A1","A2","A3","A4","B1","B2","B3","B4"];

  const events = [
    "Music Night",
    "Tech Conference",
    "Comedy Show",
    "Drama Theatre",
    "Food Festival",
    "Sports Match",
    "Startup Meetup",
    "Movie Premiere"
  ];

  useEffect(() => {
    if (eventName && date) {
      fetch(`${API_BASE}/seats?eventName=${eventName}&date=${date}`)
        .then(res => res.json())
        .then(data => setBookedSeats(data))
        .catch(() => setBookedSeats([]));
    }
  }, [eventName, date]);

  const bookTicket = () => {
    if (!eventName || !date || !selectedSeat) {
      setMsg("Please select event, date and seat");
      return;
    }

    localStorage.setItem("selectedEvent", eventName);
    localStorage.setItem("selectedSeat", selectedSeat);
    localStorage.setItem("selectedDate", date);

    navigate("/payment");
  };

  return (
    <div className="container">
      <h2>Book Ticket</h2>

      <select value={eventName} onChange={e => setEventName(e.target.value)}>
        <option value="">-- Select Event --</option>
        {events.map(ev => (
          <option key={ev} value={ev}>{ev}</option>
        ))}
      </select>

      <input
        type="date"
        value={date}
        onChange={e => setDate(e.target.value)}
      />

      <h3>Select Seat</h3>

      <div>
        {seats.map(seat => {
          const isBooked = bookedSeats.includes(seat);
          return (
            <span
              key={seat}
              onClick={() => !isBooked && setSelectedSeat(seat)}
              style={{
                margin: "8px",
                padding: "10px 14px",
                borderRadius: "8px",
                cursor: isBooked ? "not-allowed" : "pointer",
                background: isBooked
                  ? "#f1c40f"
                  : selectedSeat === seat
                  ? "#ff7675"
                  : "rgba(255,255,255,0.2)",
                color: isBooked ? "#000" : "white",
                opacity: isBooked ? 0.8 : 1
              }}
            >
              {seat}
            </span>
          );
        })}
      </div>

      <br />
      <button onClick={bookTicket}>Proceed to Payment</button>
      <p>{msg}</p>
    </div>
  );
}

export default Dashboard;
