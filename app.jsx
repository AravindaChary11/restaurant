import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [reservations, setReservations] = useState([]);
  const [seatsLeft, setSeatsLeft] = useState(143);
  const [form, setForm] = useState({ name: '', phone: '', guestCount: '' });
  const [menuVisible, setMenuVisible] = useState(false);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const guestCount = parseInt(form.guestCount, 10);
    if (guestCount > seatsLeft) {
      alert('Not enough seats available!');
      return;
    }
    const now = new Date().toLocaleTimeString();
    const newReservation = {
      ...form,
      guestCount,
      checkInTime: now,
      checkoutTime: null,
    };
    setReservations([...reservations, newReservation]);
    setSeatsLeft(seatsLeft - guestCount);
    setForm({ name: '', phone: '', guestCount: '' });
  };

  const handleCheckout = (index) => {
    const updatedReservations = [...reservations];
    updatedReservations[index].checkoutTime = new Date().toLocaleTimeString();
    setReservations(updatedReservations);
  };

  const handleDelete = (index) => {
    const reservation = reservations[index];
    if (!reservation.checkoutTime) {
      setSeatsLeft(seatsLeft + reservation.guestCount);
    }
    setReservations(reservations.filter((_, i) => i !== index));
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <div className="app">
      <div className="container">
        <h1>Restaurant Reservation System</h1>

        {/* Seats Left */}
        <div className="seats">
          Seats Left: <span>{seatsLeft}</span>
        </div>

        {/* Reservation Form */}
        <form className="reservation-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="guestCount"
            placeholder="Guest Count"
            value={form.guestCount}
            onChange={handleInputChange}
            required
            min="1"
          />

          {/* Menu Toggle Button */}
          <div className="menu-section">
            <button className="menu-toggle" type="button" onClick={toggleMenu}>
              {menuVisible ? 'Hide Menu ▲' : 'Show Menu ▼'}
            </button>
          </div>

          {/* Collapsible Menu */}
          {menuVisible && (
            <div className="menu-card">
              <h2>Menu</h2>
              <h3>Veg Dishes</h3>
              <ul>
                <li>Paneer Butter Masala</li>
                <li>Vegetable Biryani</li>
                <li>Dal Tadka</li>
              </ul>
              <h3>Non-Veg Dishes</h3>
              <ul>
                <li>Chicken Curry</li>
                <li>Mutton Biryani</li>
                <li>Fish Fry</li>
              </ul>
              <h3>Beverages</h3>
              <ul>
                <li>Fresh Lime Soda</li>
                <li>Masala Chai</li>
                <li>Cold Coffee</li>
              </ul>
            </div>
          )}

          {/* Book Button */}
          <button type="submit">Book</button>
        </form>

        {/* Reservations Table */}
        <table className="reservation-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Guest Count</th>
              <th>Check-in Time</th>
              <th>Checkout Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation, index) => (
              <tr key={index}>
                <td>{reservation.name}</td>
                <td>{reservation.phone}</td>
                <td>{reservation.guestCount}</td>
                <td>{reservation.checkInTime}</td>
                <td>{reservation.checkoutTime || '-'}</td>
                <td>
                  {!reservation.checkoutTime && (
                    <button
                      className="checkout-btn"
                      onClick={() => handleCheckout(index)}
                    >
                      Checkout
                    </button>
                  )}
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
