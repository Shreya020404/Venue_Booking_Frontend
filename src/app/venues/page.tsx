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

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await axios.get<Venue[]>(
          "http://localhost:8080/api/venues",
        );
        setVenues(response.data);
      } catch (error) {
        console.error("Error fetching venues:", error);
      }
    };

    fetchVenues();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">
        Available Venues
      </h1>
      <ul className="space-y-4">
        {venues.map((venue) => (
          <li key={venue.id} className="bg-white p-4 shadow-md rounded-md">
            <h2 className="text-xl font-semibold text-gray-800">
              {venue.name}
            </h2>
            <p className="text-gray-600">Capacity: {venue.capacity}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
