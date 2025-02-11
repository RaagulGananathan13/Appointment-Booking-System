import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BookAppointment() {
  const [slots, setSlots] = useState([]);
  const [formData, setFormData] = useState({ slot_id: '', user_name: '', user_contact: '' });

  useEffect(() => {
    axios.get('http://localhost:5000/slots').then((response) => setSlots(response.data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/appointments', formData).then(() => alert('Appointment booked!'));
  };

  return (
    <div>
      <h1>Book an Appointment</h1>
      <form onSubmit={handleSubmit}>
        <select value={formData.slot_id} onChange={(e) => setFormData({ ...formData, slot_id: e.target.value })}>
          {slots.map((slot) => (
            <option key={slot.id} value={slot.id}>
              {slot.date} {slot.start_time} - {slot.end_time}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Your Name"
          value={formData.user_name}
          onChange={(e) => setFormData({ ...formData, user_name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Your Contact"
          value={formData.user_contact}
          onChange={(e) => setFormData({ ...formData, user_contact: e.target.value })}
        />
        <button type="submit">Book</button>
      </form>
    </div>
  );
}

export default BookAppointment;