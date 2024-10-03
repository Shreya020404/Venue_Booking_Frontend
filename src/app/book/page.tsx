"use client";

import { useEffect, useState } from "react";
import axios from "axios";

// Define the type for Venue
interface Venue {
  id: number;
  name: string;
  capacity: number;
}

// Define the props for the BookingForm component
const BookingForm: React.FC = () => {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [venueId, setVenueId] = useState<string>("");
  const [requesterName, setRequesterName] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await axios.get<Venue[]>(
          "http://localhost:8080/api/venues"
        );
        setVenues(response.data);
      } catch (error) {
        console.error("Error fetching venues:", error);
      }
    };

    fetchVenues();
  }, []);

  const handleBookingSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8080/api/bookings", null, {
        params: {
          venueId: venueId,
          requesterName: requesterName,
          startTime: startTime,
          endTime: endTime,
        },
      });
      setMessage("Booking successful!");
    } catch (error) {
      console.error("Error submitting booking:", error);
      setMessage("Booking failed.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">Book a Venue</h1>
      <form onSubmit={handleBookingSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Venue
          </label>
          {venues.length === 0 ? (
            <p className="text-red-500">
              No venues available. Please add venues first.
            </p>
          ) : (
            <select
              value={venueId}
              onChange={(e) => setVenueId(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select Venue</option>
              {venues.map((venue) => (
                <option key={venue.id} value={venue.id}>
                  {venue.name} (Capacity: {venue.capacity})
                </option>
              ))}
            </select>
          )}
        </div>

        {venues.length > 0 && (
          <>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Requester Name
              </label>
              <input
                value={requesterName}
                onChange={(e) => setRequesterName(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Your name"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Start Time
              </label>
              <input
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="datetime-local"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                End Time
              </label>
              <input
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="datetime-local"
                required
              />
            </div>

            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit Booking
            </button>
          </>
        )}
      </form>

      {message && <p className="mt-4 text-red-500">{message}</p>}
    </div>
  );
};

export default BookingForm;
