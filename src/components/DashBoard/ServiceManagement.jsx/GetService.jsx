// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import axios from "axios";


const GetService = () => {

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios
      .get("https://666019545425580055b22b56.mockapi.io/BookingService")
      .then((response) => {
        setBookings(response.data);
      })
      .catch((error) => {
        console.error("Error fetching bookings:", error);
      });
  }, []);


  return (
    <div>
      <h1>Booking List</h1>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Full Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone Number</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time Slot</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service Type</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pet ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pet Weight</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id} className="border-b border-gray-200">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{booking.id}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{booking.fullname}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{booking.phonenumber}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{booking.date}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{booking.timeSlot}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{booking.servicetype}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{booking.message}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{booking.petId}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{booking.petWeight}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GetService;
