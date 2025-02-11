import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Welcome to the Appointment Booking System</h1>
      <Link to="/book">Book an Appointment</Link>
      <br />
      <Link to="/appointments">View My Appointments</Link>
    </div>
  );
}

export default Home;