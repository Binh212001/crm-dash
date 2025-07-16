import { useNavigate, useParams } from "react-router-dom";
import InputText from "../../components/InputText";

const UpdateUser = () => {
  const { id } = useParams<{ id: string }>();
  console.log("🚀 ~ UpdateUser ~ id:", id);
  const navigate = useNavigate();
  const handleSubmit = () => {};

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full mx-9 bg-white border border-gray-300 rounded-lg shadow p-6 flex flex-col md:flex-row gap-6">
        {/* Main Form */}
        <form onSubmit={handleSubmit} className="flex-1">
          <h2 className="text-lg font-semibold mb-4">Update User</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputText
              label="First Name"
              name="firstName"
              required
              placeholder="First Name"
            />
            <InputText
              label="Last Name"
              name="lastName"
              required
              placeholder="Last Name"
            />
            <InputText
              label="Email"
              name="email"
              type="email"
              required
              placeholder="Email"
            />
            <InputText
              label="Phone Number"
              name="phoneNumber"
              placeholder="Phone Number"
            />
            <InputText label="Address" name="address" placeholder="Address" />
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Date of Birth
              </label>
              <input
                type="date"
                name="dateOfBirth"
                className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-2 focus:ring-blue-200"
                placeholder="Date of Birth"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Bio
              </label>
              <textarea
                name="bio"
                className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-2 focus:ring-blue-200"
                placeholder="Bio"
                rows={2}
              />
            </div>
          </div>
          <div className="flex items-center justify-between mt-4">
            <button
              type="submit"
              className="px-4 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-xs font-medium disabled:opacity-60"
            ></button>
            <button
              type="button"
              className="px-3 py-1.5 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition text-xs"
              onClick={() => navigate("/user")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateUser;
