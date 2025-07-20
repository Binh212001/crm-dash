import { useNavigate } from "react-router-dom";
import Dropdown from "./Dropdown";
import axiosInstance from "@/app/axiosInstance";

function Header() {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await axiosInstance.post("/auth/logout");
    } catch {
      // Optionally handle error
    } finally {
      // Remove tokens and user info from localStorage
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      // Redirect to login page
      navigate("/auth/login");
    }
  };

  return (
    <header className="flex items-center justify-between h-16 px-4 bg-white border-b border-gray-200">
      <div className="flex items-center space-x-3">
        <button className="md:hidden p-2 rounded hover:bg-gray-100 focus:outline-none">
          <svg
            className="h-5 w-5 text-gray-500"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        {/* Search bar */}
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg
              className="h-4 w-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="7" />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35"
              />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search"
            className="pl-9 pr-3 py-1.5 rounded-full bg-gray-100 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition w-48"
          />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        {/* Notification Dropdown */}
        <Dropdown
          trigger={
            <button className="relative p-2 rounded-full hover:bg-gray-100 focus:outline-none">
              <svg
                className="h-5 w-5 text-primary"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500 border-2 border-white"></span>
            </button>
          }
          align="right"
        >
          <div className="px-4 py-3 border-b border-gray-100">
            <h3 className="text-sm font-medium text-gray-900">Notifications</h3>
          </div>
          <div className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              </div>
              <div>
                <p className="font-medium">New order received</p>
                <p className="text-xs text-gray-500">
                  Order #12345 has been placed
                </p>
                <p className="text-xs text-gray-400">2 minutes ago</p>
              </div>
            </div>
          </div>
          <div className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              </div>
              <div>
                <p className="font-medium">Payment successful</p>
                <p className="text-xs text-gray-500">
                  Payment for order #12344 completed
                </p>
                <p className="text-xs text-gray-400">1 hour ago</p>
              </div>
            </div>
          </div>
          <div className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
              </div>
              <div>
                <p className="font-medium">Low stock alert</p>
                <p className="text-xs text-gray-500">
                  Product "Widget X" is running low
                </p>
                <p className="text-xs text-gray-400">3 hours ago</p>
              </div>
            </div>
          </div>
          <div className="px-4 py-2 text-center border-t border-gray-100">
            <span className="text-sm text-primary hover:text-primary-dark cursor-pointer">
              View all notifications
            </span>
          </div>
        </Dropdown>

        {/* Language Dropdown */}
        <Dropdown
          trigger={
            <div className="flex items-center space-x-1 cursor-pointer px-2 py-1 rounded hover:bg-gray-100">
              <img
                src="https://flagcdn.com/gb.svg"
                alt="English"
                className="h-5 w-7 rounded object-cover"
              />
              <span className="text-sm text-gray-700">English</span>
              <svg
                className="h-3 w-3 text-gray-400 ml-1"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          }
          align="right"
        >
          <div className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
            <div className="flex items-center space-x-2">
              <img
                src="https://flagcdn.com/gb.svg"
                alt="English"
                className="h-4 w-6 rounded object-cover"
              />
              <span>English</span>
            </div>
          </div>
          <div className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
            <div className="flex items-center space-x-2">
              <img
                src="https://flagcdn.com/es.svg"
                alt="Spanish"
                className="h-4 w-6 rounded object-cover"
              />
              <span>Español</span>
            </div>
          </div>
          <div className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
            <div className="flex items-center space-x-2">
              <img
                src="https://flagcdn.com/fr.svg"
                alt="French"
                className="h-4 w-6 rounded object-cover"
              />
              <span>Français</span>
            </div>
          </div>
        </Dropdown>

        {/* User Profile Dropdown */}
        <Dropdown
          trigger={
            <div className="flex items-center space-x-2 cursor-pointer px-2 py-1 rounded hover:bg-gray-100">
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="User"
                className="h-8 w-8 rounded-full object-cover"
              />
              <div className="flex flex-col items-start">
                <span className="text-sm font-medium text-gray-900">
                  Meet Roy
                </span>
                <span className="text-xs text-gray-500">Admin</span>
              </div>
            </div>
          }
          align="right"
        >
          <div className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
            Profile
          </div>
          <div className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
            Settings
          </div>
          <div className="border-t border-gray-100">
            <div
              className="px-4 py-2 text-sm text-red-600 hover:bg-gray-100 cursor-pointer"
              onClick={handleSignOut}
            >
              Sign out
            </div>
          </div>
        </Dropdown>
      </div>
    </header>
  );
}

export default Header;
