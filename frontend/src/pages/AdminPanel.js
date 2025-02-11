import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdminPanel() {
  const [appointments, setAppointments] = useState([]);
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/admin/appointments', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }).then((response) => setAppointments(response.data));
  }, []);

  const addSlot = () => {
    axios.post('http://localhost:5000/admin/slots', { date, start_time: startTime, end_time: endTime }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }).then(() => alert('Slot added!'));
  };

  return (
    <div>
      <h1>Admin Panel</h1>
      <div>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
        <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
        <button onClick={addSlot}>Add Slot</button>
      </div>
      <h2>Appointments</h2>
      <ul>
        {appointments.map((appointment) => (
          <li key={appointment.id}>
            {appointment.user_name} - {appointment.date} {appointment.start_time}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminPanel;