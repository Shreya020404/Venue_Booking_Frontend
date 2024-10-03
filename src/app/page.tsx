import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <div className="w-full max-w-4xl text-center mb-12">
        <h1 className="text-5xl font-bold text-blue-600 mb-4">
          Welcome to the College Venue Booking Portal
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          A centralized platform for booking and managing college venues
          seamlessly.
        </p>
      </div>

      <div className="w-full max-w-2xl mb-10 relative h-64">
        <Image
          src="/img/srm.jpg" // Ensure the image is placed in the public/img folder
          alt="College Event"
          layout="fill" // Use fill layout for responsive behavior
          objectFit="cover" // Cover the entire area
          className="rounded-lg shadow-lg mb-6"
        />
      </div>

      <div className="mb-12 text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Key Features
        </h2>
        <ul className="list-disc list-inside text-gray-600 mb-8">
          <li>Book venues easily with just a few clicks.</li>
          <li>Check availability in real-time to avoid conflicts.</li>
          <li>Manage your bookings and view history effortlessly.</li>
          <li>Receive notifications and updates about your bookings.</li>
          <li>Efficient tools for administrators to manage bookings.</li>
        </ul>
      </div>

      <div className="flex space-x-4 mb-8">
        <Link href="/venues">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-500 transition duration-200">
            View Venues
          </button>
        </Link>
        <Link href="/book">
          <button className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-500 transition duration-200">
            Book a Venue
          </button>
        </Link>
        <Link href="/bookings/history">
          <button className="bg-purple-600 text-white px-6 py-3 rounded-md hover:bg-purple-500 transition duration-200">
            View Booking History
          </button>
        </Link>
      </div>

      <div className="w-full max-w-2xl text-center mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          What Our Users Say
        </h2>
        <p className="text-gray-600 mb-4">
          &quot;This system made it so easy for us to book our event venue!
          Highly recommended!&quot;
        </p>
        <p className="text-gray-600 mb-4">
          &ldquo;The booking process was smooth, and the team was very helpful.
          Will use again!&quot;
        </p>
      </div>

      <div className="text-center mb-12">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Ready to get started?
        </h2>
        <Link href="/book">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-500 transition duration-200">
            Start Booking Now
          </button>
        </Link>
      </div>

      <footer className="w-full max-w-4xl text-center py-6">
        <p className="text-gray-600">
          © {new Date().getFullYear()} College Venue Booking Portal. All Rights
          Reserved.
        </p>
      </footer>
    </div>
  );
}
