"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface Venue {
  id: number;
  name: string;
}

interface Booking {
  id: number;
  requesterName: string;
  venue: Venue;
  startTime: string;
  endTime: string;
  approved: boolean;
}

export default function AdminDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await axios.get<Booking[]>(
        "http://localhost:8080/api/bookings"
      );
      setBookings(response.data);
      setMessage("");
    } catch (error) {
      setMessage("Error fetching bookings. Please try again.");
      console.error("Fetch bookings error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApproval = async (id: number) => {
    try {
      await axios.put<Booking>(
        `http://localhost:8080/api/bookings/approve/${id}`
      );
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking.id === id ? { ...booking, approved: true } : booking
        )
      );
      setMessage(`Booking ${id} approved successfully.`);
    } catch (error) {
      setMessage("Error approving booking. Please try again.");
      console.error("Approval error:", error);
    }
  };

  const handleRejection = async (id: number) => {
    try {
      await axios.put<Booking>(
        `http://localhost:8080/api/bookings/reject/${id}`
      );
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking.id === id ? { ...booking, approved: false } : booking
        )
      );
      setMessage(`Booking ${id} rejected successfully.`);
    } catch (error) {
      setMessage("Error rejecting booking. Please try again.");
      console.error("Rejection error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <h1 className="text-3xl md:text-4xl font-bold text-blue-600 mb-4 text-center">
        Admin Dashboard
      </h1>

      {message && <p className="text-red-500 text-center">{message}</p>}
      {loading && (
        <p className="text-blue-500 text-center">Loading bookings...</p>
      )}

      <div className="mt-6 shadow-lg rounded-lg overflow-hidden bg-white">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-4 md:px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Requester Name
                </th>
                <th className="py-3 px-4 md:px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Venue
                </th>
                <th className="py-3 px-4 md:px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Start Time
                </th>
                <th className="py-3 px-4 md:px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  End Time
                </th>
                <th className="py-3 px-4 md:px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {bookings.length > 0 ? (
                bookings.map((booking) => (
                  <tr key={booking.id}>
                    <td className="py-4 px-4 md:px-6 whitespace-nowrap">
                      {booking.requesterName}
                    </td>
                    <td className="py-4 px-4 md:px-6 whitespace-nowrap">
                      {booking.venue.name}
                    </td>
                    <td className="py-4 px-4 md:px-6 whitespace-nowrap">
                      {booking.startTime}
                    </td>
                    <td className="py-4 px-4 md:px-6 whitespace-nowrap">
                      {booking.endTime}
                    </td>
                    <td className="py-4 px-4 md:px-6 whitespace-nowrap">
                      {!booking.approved ? (
                        <>
                          <button
                            onClick={() => handleApproval(booking.id)}
                            className="bg-green-500 text-white px-2 md:px-4 py-1 md:py-2 rounded hover:bg-green-600 transition duration-200"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleRejection(booking.id)}
                            className="bg-red-500 text-white px-2 md:px-4 py-1 md:py-2 rounded hover:bg-red-600 transition duration-200 ml-2"
                          >
                            Reject
                          </button>
                        </>
                      ) : (
                        <span className="text-green-600 font-bold">
                          Approved
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-4 text-center text-gray-500">
                    No bookings found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
