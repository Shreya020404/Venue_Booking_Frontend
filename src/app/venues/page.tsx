"use client";

import { useEffect, useState } from "react";
import axios from "axios";

// Define a type for the Venue
interface Venue {
  id: number;
  name: string;
  capacity: number;
}

export default function Venues() {
  const [venues, setVenues] = useState<Venue[]>([]); // Use the Venue type for the state
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string>(""); // Error message

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await axios.get<Venue[]>(
          "http://localhost:8080/api/venues"
        );
        setVenues(response.data);
      } catch (error) {
        setError("Error fetching venues. Please try again later.");
        console.error("Error fetching venues:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchVenues();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <h1 className="text-3xl md:text-4xl font-bold text-blue-600 mb-6 text-center">
        Available Venues
      </h1>

      {loading ? (
        <p className="text-center text-blue-500">Loading venues...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {venues.map((venue) => (
            <li key={venue.id} className="bg-white p-4 shadow-md rounded-md">
              <h2 className="text-xl font-semibold text-gray-800">
                {venue.name}
              </h2>
              <p className="text-gray-600">Capacity: {venue.capacity}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
