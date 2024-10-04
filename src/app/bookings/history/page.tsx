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
          setBookings([]); // Clear bookings on error
          setMessage(
            "Error fetching bookings. Please check your name and try again."
          );
          console.error(error);
        })
        .finally(() => {
          setLoading(false); // Set loading to false regardless of success or failure
        });
    } else {
      setBookings([]); // Clear bookings if no name is entered
    }
  }, [requesterName]);

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <h1 className="text-3xl md:text-4xl font-bold text-blue-600 mb-6 text-center">
        Your Bookings
      </h1>

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

      {message && <p className="text-red-500 text-center">{message}</p>}
      {loading && <p className="text-center text-blue-500">Loading...</p>}

      <div className="mt-6">
        {bookings.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 rounded-lg">
              <thead>
                <tr className="bg-gray-200">
                  <th className="py-2 border-b text-left">Venue</th>
                  <th className="py-2 border-b text-left">Start Time</th>
                  <th className="py-2 border-b text-left">End Time</th>
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
          </div>
        ) : (
          !loading && <p className="text-center">No bookings found.</p>
        )}
      </div>
    </div>
  );
}
