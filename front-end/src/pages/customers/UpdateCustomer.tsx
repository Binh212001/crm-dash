import React from "react";
import InputText from "../../components/InputText";

const UpdateCustomer = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full mx-9 bg-white border border-gray-300 rounded-lg shadow p-6 flex flex-col md:flex-row gap-6">
        {/* Main Form */}
        <form className="flex-1">
          <h2 className="text-lg font-semibold mb-4">Update Customer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputText
              label="Name"
              name="name"
              required
              placeholder="Full Name"
            />
            <InputText
              label="First Name"
              name="firstName"
              placeholder="First Name"
            />
            <InputText
              label="Last Name"
              name="lastName"
              placeholder="Last Name"
            />
            <InputText
              label="Email"
              name="email"
              type="email"
              required
              placeholder="Email"
            />
            <InputText label="Phone" name="phone" placeholder="Phone Number" />
            <InputText label="Address" name="address" placeholder="Address" />
            <InputText label="Country" name="country" placeholder="Country" />
            <InputText label="City" name="city" placeholder="City" />
            <InputText
              label="Postal Code"
              name="postalCode"
              placeholder="Postal Code"
            />
          </div>
          <div className="flex items-center justify-between mt-4">
            <button
              type="submit"
              className="px-4 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-xs font-medium disabled:opacity-60"
            >
              Update Customer
            </button>
            <button
              type="button"
              className="px-3 py-1.5 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition text-xs"
            >
              Cancel
            </button>
          </div>
        </form>
        {/* Sidebar: Avatar Upload */}
        <div className="w-full md:w-72 flex flex-col gap-4 mt-6 md:mt-0">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex flex-col items-center">
            <div className="w-28 h-28 rounded-lg bg-white border border-dashed border-gray-300 flex items-center justify-center mb-3">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <rect
                  x="3"
                  y="3"
                  width="18"
                  height="18"
                  rx="2"
                  strokeWidth="2"
                  stroke="currentColor"
                />
                <path
                  d="M8 15l2.5-3 2.5 3 3.5-4.5 4 6.5H4l4-6.5z"
                  strokeWidth="2"
                  stroke="currentColor"
                />
              </svg>
            </div>
            <input
              type="file"
              accept="image/*"
              id="avatar-upload"
              style={{ display: "none" }}
            />
            <button
              type="button"
              className="w-full px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition text-xs font-medium"
            >
              Upload Image
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateCustomer;
