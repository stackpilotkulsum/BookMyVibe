import { useNavigate } from "react-router-dom";

function Success() {
  const navigate = useNavigate();

  const email = localStorage.getItem("email");
  const txnId = localStorage.getItem("lastTransactionId");

  const printTicket = () => {
    window.print();
  };

  return (
    <div className="container">
      <h2>Ticket Confirmed</h2>

      <p><b>Status:</b> Confirmed</p>
      <p><b>Transaction ID:</b> {txnId}</p>
      <p><b>Email:</b> {email}</p>

      <hr />

      <button onClick={printTicket}>Download / Print Ticket</button>
      <br /><br />
      <button onClick={() => navigate("/mybookings")}>Go to My Bookings</button>
    </div>
  );
}

export default Success;
