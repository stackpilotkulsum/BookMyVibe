import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <marquee className="marquee-text">
        Book Tickets for Concerts, Sports, Movies and More!
      </marquee>

      <div className="container">
        <div className="hero">
          <h1>Welcome to Ticket Reservation System</h1>
          <p>Book tickets for concerts, sports, movies and more – instantly!</p>

          {/* ✅ FIXED ROUTING */}
          <Link to="/events">
            <button className="main-btn">Explore Events</button>
          </Link>
        </div>

        <h2 className="section-title">Featured Events</h2>

        <div className="modern-gallery">
          <div className="card">
            <img src="/images/concert.jpg" alt="concert" />
            <div className="overlay">Live Concerts</div>
          </div>

          <div className="card">
            <img src="/images/sports.jpg" alt="sports" />
            <div className="overlay">Sports Matches</div>
          </div>

          <div className="card">
            <img src="/images/comedy.jpg" alt="comedy" />
            <div className="overlay">Comedy Shows</div>
          </div>

          <div className="card">
            <img src="/images/movie.jpg" alt="movie" />
            <div className="overlay">Movie Premieres</div>
          </div>

          <div className="card">
            <img src="/images/festival.jpg" alt="festival" />
            <div className="overlay">Food Festivals</div>
          </div>

          <div className="card">
            <img src="/images/conference.jpg" alt="conference" />
            <div className="overlay">Tech Conferences</div>
          </div>
        </div>
      </div>

      <div className="container">
        <h2>Book My Vibe</h2>
        <p style={{ color: "yellow" }}>Book the vibe. Live the moment.</p>
        <p>Book events, reserve seats, and manage tickets with ease.</p>
      </div>
    </>
  );
}

export default Home;