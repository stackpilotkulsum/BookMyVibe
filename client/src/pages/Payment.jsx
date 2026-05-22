import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API_BASE from "../api";

function Payment() {
  const [card, setCard] = useState("");
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1); // 1 = card details, 2 = otp
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const eventName = localStorage.getItem("selectedEvent");
  const seat      = localStorage.getItem("selectedSeat");
  const date      = localStorage.getItem("selectedDate");
  const email     = localStorage.getItem("email");

  const isCardFormValid =
    card.trim() !== "" &&
    name.trim() !== "" &&
    expiry.trim() !== "" &&
    cvv.trim() !== "";

  const proceedToOtp = () => {
    if (!isCardFormValid) {
      setMsg("Please fill all card details correctly");
      return;
    }
    setMsg("OTP sent to your registered mobile (demo: 123456)");
    setStep(2);
  };

  const confirmPayment = async () => {
    if (otp.trim() === "") {
      setMsg("Please enter OTP");
      return;
    }

    if (otp !== "123456") {
      setMsg("Invalid OTP. Try 123456");
      return;
    }

    if (!eventName || !seat || !email) {
      setMsg("No booking data found!");
      return;
    }

    setLoading(true);
    setMsg("Processing payment via Razorpay...");

    setTimeout(async () => {
      try {
        const res = await fetch(`${API_BASE}/book`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ eventName, seat, date, userEmail: email }),
        });

        const data = await res.json();

        if (data.success) {
          const txnId = "TXN" + Date.now();
          localStorage.setItem("lastTransactionId", txnId);
          localStorage.removeItem("selectedEvent");
          localStorage.removeItem("selectedSeat");
          localStorage.removeItem("selectedDate");
          navigate("/success");
        } else {
          setMsg(data.message || "Payment failed");
        }
      } catch {
        setMsg("Server error during payment");
      } finally {
        setLoading(false);
      }
    }, 1500);
  };

  return (
    <div className="container">
      <h2>Payment</h2>

      <img
        src="/images/razorpay.png"
        alt="Razorpay"
        style={{ width: "180px", marginBottom: "15px" }}
      />

      <p>Secure payment powered by Razorpay</p>

      {step === 1 && (
        <>
          <input
            placeholder="Card Number"
            value={card}
            onChange={e => setCard(e.target.value)}
          />
          <input
            placeholder="Name on Card"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input
            placeholder="Expiry Date (MM/YY)"
            value={expiry}
            onChange={e => setExpiry(e.target.value)}
          />
          <input
            type="password"
            placeholder="CVV"
            value={cvv}
            onChange={e => setCvv(e.target.value)}
          />
          <button onClick={proceedToOtp} disabled={loading || !isCardFormValid}>
            Continue
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <input
            placeholder="Enter OTP (123456)"
            value={otp}
            onChange={e => setOtp(e.target.value)}
          />
          <button onClick={confirmPayment} disabled={loading}>
            {loading ? "Processing..." : "Pay with Razorpay"}
          </button>
        </>
      )}

      <p style={{ marginTop: "15px" }}>{msg}</p>

      <p style={{ fontSize: "12px", opacity: 0.8 }}>
        * This is a demo Razorpay payment gateway (no real money involved)
      </p>
    </div>
  );
}

export default Payment;
