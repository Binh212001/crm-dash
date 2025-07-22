import React, { useState, useEffect } from "react";
import axiosInstance from "@/app/axiosInstance";
import { toast } from "react-toastify";

interface EmailOtherConfig {
  title: string;
  address: string;
  password: string;
  server: string;
  port: number | string;
  secure: boolean;
  ignoreTLS: boolean;
  requireTLS: boolean;
}

interface EmailSettingsState {
  title: string;
  address: string;
  password: string;
  server: string;
  port: number | string;
  secure: boolean;
  ignoreTLS: boolean;
  requireTLS: boolean;
}

const EmailSetting = () => {
  const [emailSettings, setEmailSettings] = useState<EmailSettingsState>({
    title: "",
    address: "",
    password: "",
    server: "",
    port: "",
    secure: false,
    ignoreTLS: false,
    requireTLS: false,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch email settings from backend
    const fetchSettings = async () => {
      try {
        const { data } = await axiosInstance.get("/settings", {
          params: { key: "email" },
        });
        // data is expected to be an array of { key, value }
        // Find the email config object
        const emailConfig = Array.isArray(data)
          ? data.find((item: any) => item.key === "email")
          : data;
        if (emailConfig && emailConfig.data && emailConfig.data.other) {
          const other: EmailOtherConfig = emailConfig.data.other;
          setEmailSettings({
            title: other.title || "",
            address: other.address || "",
            password: other.password || "",
            server: other.server || "",
            port: other.port ?? "",
            secure: !!other.secure,
            ignoreTLS: !!other.ignoreTLS,
            requireTLS: !!other.requireTLS,
          });
        }
      } catch (err) {
        toast.error("Không thể tải cài đặt email. Vui lòng thử lại.");
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleEmailSettingsChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setEmailSettings((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : name === "port"
          ? value.replace(/\D/, "") // only allow numbers
          : value,
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      // Compose the payload as per backend expectation
      const payload = {
        key: "email",
        data: {
          server: "other",
          other: {
            title: emailSettings.title,
            address: emailSettings.address,
            password: emailSettings.password,
            server: emailSettings.server,
            port: Number(emailSettings.port) || 0,
            secure: emailSettings.secure,
            ignoreTLS: emailSettings.ignoreTLS,
            requireTLS: emailSettings.requireTLS,
          },
        },
      };
      await axiosInstance.patch("/settings", payload, {
        params: { key: "email" },
      });
      toast.success("Lưu cài đặt email thành công!");
    } catch {
      toast.error("Không thể lưu cài đặt email. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Cài đặt Email</h3>
      {loading ? (
        <div>Đang tải cài đặt email...</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tiêu đề hệ thống
              </label>
              <input
                type="text"
                name="title"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={emailSettings.title}
                onChange={handleEmailSettingsChange}
                placeholder="Hệ thống Vmaster"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Địa chỉ Email gửi đi (From)
              </label>
              <input
                type="email"
                name="address"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={emailSettings.address}
                onChange={handleEmailSettingsChange}
                placeholder="noreply@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mật khẩu Email
              </label>
              <input
                type="password"
                name="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={emailSettings.password}
                onChange={handleEmailSettingsChange}
                placeholder="Mật khẩu"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                SMTP Server
              </label>
              <input
                type="text"
                name="server"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={emailSettings.server}
                onChange={handleEmailSettingsChange}
                placeholder="smtp.gmail.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                SMTP Port
              </label>
              <input
                type="text"
                name="port"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={emailSettings.port}
                onChange={handleEmailSettingsChange}
                placeholder="465"
                inputMode="numeric"
                pattern="[0-9]*"
              />
            </div>
            <div className="flex items-center mt-6">
              <input
                type="checkbox"
                name="secure"
                checked={emailSettings.secure}
                onChange={handleEmailSettingsChange}
                className="mr-2"
                id="secure"
              />
              <label htmlFor="secure" className="text-sm text-gray-700">
                Sử dụng SSL (secure)
              </label>
            </div>
            <div className="flex items-center mt-6">
              <input
                type="checkbox"
                name="ignoreTLS"
                checked={emailSettings.ignoreTLS}
                onChange={handleEmailSettingsChange}
                className="mr-2"
                id="ignoreTLS"
              />
              <label htmlFor="ignoreTLS" className="text-sm text-gray-700">
                Bỏ qua TLS (ignoreTLS)
              </label>
            </div>
            <div className="flex items-center mt-6">
              <input
                type="checkbox"
                name="requireTLS"
                checked={emailSettings.requireTLS}
                onChange={handleEmailSettingsChange}
                className="mr-2"
                id="requireTLS"
              />
              <label htmlFor="requireTLS" className="text-sm text-gray-700">
                Yêu cầu TLS (requireTLS)
              </label>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              onClick={handleSave}
              disabled={loading}
            >
              Lưu cài đặt Email
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default EmailSetting;
