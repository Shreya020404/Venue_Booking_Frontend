"use client";

import { useEffect, useState } from "react";
import axios from "axios";

// Define types for booking and response
interface Venue {
  id: number;
  name: string;
}

interface Booking {
  id: number;
  venue: Venue; // Assuming venue is an object with id and name
  startTime: string;
  endTime: string;
}

export default function BookingHistory() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [requesterName, setRequesterName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (requesterName) {
      setLoading(true);
      axios
        .get<Booking[]>(
          `http://localhost:8080/api/bookings/requester/${requesterName}`
        )
        .then((response) => {
          setBookings(response.data);
          setMessage(""); // Clear any previous messages
        })
        .catch((error) => {
          setMessage("Error fetching bookings.");
          console.error(error);
        })
        .finally(() => {
          setLoading(false); // Set loading to false regardless of success or failure
        });
    }
  }, [requesterName]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">Your Bookings</h1>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Enter Your Name
        </label>
        <input
          value={requesterName}
          onChange={(e) => setRequesterName(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="Enter your name to fetch bookings"
        />
      </div>

      {message && <p className="text-red-500">{message}</p>}
      {loading && <p>Loading...</p>}

      <div className="mt-6">
        {bookings.length > 0 ? (
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2">Venue</th>
                <th className="py-2">Start Time</th>
                <th className="py-2">End Time</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id}>
                  <td className="border px-4 py-2">{booking.venue.name}</td>
                  <td className="border px-4 py-2">
                    {new Date(booking.startTime).toLocaleString()}
                  </td>
                  <td className="border px-4 py-2">
                    {new Date(booking.endTime).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No bookings found.</p>
        )}
      </div>
    </div>
  );
}
