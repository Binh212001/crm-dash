import React, { useEffect, useState } from "react";
import InputText from "../../components/InputText";
import { useNavigate, useParams } from "react-router";
import axiosInstance from "@/app/axiosInstance";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  address: string;
  city: string;
  postalCode: string;
  totalSpent: number;
  lastSeen: number;
  lastOrder: number;
}

const UpdateCustomer = () => {
  const { id } = useParams<{ id?: string }>();

  const navigate = useNavigate();

  const [customer, setCustomer] = useState<Customer>({
    id: "",
    name: "",
    email: "",
    phone: "",
    country: "",
    address: "",
    city: "",
    postalCode: "",
    totalSpent: 0,
    lastSeen: 0,
    lastOrder: 0,
  });

  useEffect(() => {
    async function fetchCustomerById() {
      try {
        const respone = await axiosInstance.get<Customer>("/customer/" + id);
        console.log("🚀 ~ fetchCustomerById ~ respone:", respone);
        setCustomer(respone.data);
      } catch (error) {
        if (error instanceof Error) {
          alert(error.message);
        } else {
          alert("An unknown error occurred");
        }
      }
    }
    fetchCustomerById();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axiosInstance.put<Customer>(`/customer/${id}`, {
        ...customer,

        totalSpent: Number(customer.totalSpent),
      });
      setCustomer({
        id: "",
        name: "",
        email: "",
        phone: "",
        country: "",
        address: "",
        city: "",
        postalCode: "",
        totalSpent: 0,
        lastSeen: 0,
        lastOrder: 0,
      });
      alert("Success");
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("An unknown error occurred");
      }
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full mx-9 bg-white border border-gray-300 rounded-lg shadow p-6 flex flex-col md:flex-row gap-6">
        {/* Main Form */}
        <form className="flex-1" onSubmit={(e) => handleSubmit(e)}>
          <h2 className="text-lg font-semibold mb-4">Update Customer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputText
              label="Name"
              name="name"
              required
              placeholder="Full Name"
              value={customer.name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setCustomer((prev) => ({ ...prev, name: e.target.value }))
              }
            />

            <InputText
              label="Email"
              name="email"
              type="email"
              required
              placeholder="Email"
              value={customer.email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setCustomer((prev) => ({ ...prev, email: e.target.value }))
              }
            />
            <InputText
              label="Phone"
              name="phone"
              placeholder="Phone Number"
              value={customer.phone || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setCustomer((prev) => ({ ...prev, phone: e.target.value }))
              }
            />
            <InputText
              label="Address"
              name="address"
              placeholder="Address"
              value={customer.address || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setCustomer((prev) => ({ ...prev, address: e.target.value }))
              }
            />
            <InputText
              label="Country"
              name="country"
              placeholder="Country"
              value={customer.country || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setCustomer((prev) => ({ ...prev, country: e.target.value }))
              }
            />
            <InputText
              label="City"
              name="city"
              placeholder="City"
              value={customer.city || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setCustomer((prev) => ({ ...prev, city: e.target.value }))
              }
            />
            <InputText
              label="Postal Code"
              name="postalCode"
              placeholder="Postal Code"
              value={customer.postalCode || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setCustomer((prev) => ({ ...prev, postalCode: e.target.value }))
              }
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
              onClick={() => {
                navigate("/customer");
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCustomer;
