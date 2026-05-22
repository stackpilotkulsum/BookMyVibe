# BookMyVibe - Ticket Reservation System

A full-stack web application for booking and managing event tickets with user authentication, admin dashboard, and real-time booking management.

## 🎯 Features

- **User Authentication**: Secure registration and login with password hashing
- **Event Management**: Browse and search events
- **Ticket Booking**: Reserve tickets for events with payment integration
- **Admin Dashboard**: Manage events, users, and bookings
- **User Dashboard**: View booking history and manage reservations
- **Payment Processing**: Integrated payment system for ticket purchases
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🛠 Tech Stack

### Frontend
- **React.js** - UI library
- **CSS3** - Styling and responsive design
- **JavaScript (ES6+)** - Client-side logic

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **bcryptjs** - Password encryption
- **express-session** - Session management

### Additional Tools
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variables management

## 📋 Prerequisites

Before running the application, ensure you have:
- Node.js (v14 or higher)
- npm (v6 or higher)
- MongoDB (local or Atlas cloud instance)

## ⚙️ Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/stackpilotkulsum/BookMyVibe.git
cd BookMyVibe
```

### 2. Install Backend Dependencies
```bash
npm install
```

### 3. Install Frontend Dependencies
```bash
cd client
npm install
cd ..
```

### 4. Configure Environment Variables

Create a `.env` file in the root directory:
```env
MONGO_URI=mongodb://localhost:27017/ticket-reservation
PORT=5000
NODE_ENV=development
SESSION_SECRET=your_session_secret_key
```

For MongoDB Atlas, use:
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/ticket-reservation
```

## 🚀 Running the Application

### Development Mode (Concurrently)

#### Option 1: Run both servers separately in different terminals

Terminal 1 - Backend:
```bash
npm start
```

Terminal 2 - Frontend:
```bash
cd client
npm start
```

#### Option 2: Install concurrently (optional)
```bash
npm install concurrently --save-dev
```

### Access the Application
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:5000`

## 📁 Project Structure

```
BookMyVibe/
├── server.js                 # Main server entry point
├── package.json             # Backend dependencies
├── models/
│   ├── User.js             # User schema
│   ├── Event.js            # Event schema
│   └── Booking.js          # Booking schema
├── routes/
│   ├── auth.js             # Authentication routes
│   ├── booking.js          # Booking routes
│   └── userRoutes.js       # User routes
├── public/                  # Static files
│   ├── index.html
│   ├── js/
│   ├── css/
│   └── images/
├── views/                   # View templates
└── client/
    ├── package.json
    ├── public/
    ├── src/
    │   ├── components/     # React components
    │   ├── pages/          # Page components
    │   ├── App.js
    │   ├── index.js
    │   └── api.js          # API calls
    └── README.md
```

## 🔑 API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `POST /auth/logout` - Logout user

### Events
- `GET /events` - Get all events
- `GET /events/:id` - Get event details
- `POST /events` - Create event (admin only)
- `PUT /events/:id` - Update event (admin only)
- `DELETE /events/:id` - Delete event (admin only)

### Bookings
- `POST /bookings` - Create booking
- `GET /bookings` - Get user bookings
- `GET /bookings/:id` - Get booking details
- `PUT /bookings/:id` - Update booking
- `DELETE /bookings/:id` - Cancel booking

### Users
- `GET /users/profile` - Get user profile
- `PUT /users/profile` - Update user profile

## 🔐 Security Features

- Password encryption using bcryptjs
- Session-based authentication
- CORS protection
- Environment variable protection for sensitive data

## 🐛 Common Issues & Solutions

### MongoDB Connection Error
- Ensure MongoDB is running locally or check your Atlas connection string
- Verify `MONGO_URI` in `.env` file

### Port Already in Use
```bash
# Change PORT in .env file
PORT=5001
```

### Frontend Not Connecting to Backend
- Check CORS settings in `server.js`
- Verify backend is running on the correct port
- Check API endpoints in `client/src/api.js`

## 📝 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/ticket-reservation` |
| `PORT` | Server port | `5000` |
| `NODE_ENV` | Environment mode | `development` or `production` |
| `SESSION_SECRET` | Session encryption key | `your_secret_key` |

## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License - see the LICENSE file for details.

## 👤 Author

**Kulsum Malik**
- GitHub: [@stackpilotkulsum](https://github.com/stackpilotkulsum)

## 📞 Support

For support, email support@bookmyvibe.com or create an issue in the repository.

## 🎓 Learning Resources

- [React Documentation](https://react.dev)
- [Node.js Documentation](https://nodejs.org/docs/)
- [MongoDB Documentation](https://docs.mongodb.com)
- [Express.js Guide](https://expressjs.com)

---

**Last Updated**: May 2026
