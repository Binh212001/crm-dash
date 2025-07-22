import React, { useState } from "react";

const TemplateSetting = () => {
  const [emailTemplate, setEmailTemplate] = useState({
    subject: "Chủ đề email mẫu",
    body: "Nội dung email mẫu...",
  });

  const handleTemplateChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEmailTemplate((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // TODO: Implement save logic (e.g., API call)
    alert("Mẫu Email đã được lưu!");
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Mẫu Email</h3>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Tiêu đề Email
        </label>
        <input
          type="text"
          name="subject"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={emailTemplate.subject}
          onChange={handleTemplateChange}
          placeholder="Tiêu đề email"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nội dung Email
        </label>
        <textarea
          name="body"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={8}
          value={emailTemplate.body}
          onChange={handleTemplateChange}
          placeholder="Nội dung email..."
        />
      </div>
      <div className="flex justify-end">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          onClick={handleSave}
        >
          Lưu mẫu Email
        </button>
      </div>
    </div>
  );
};

export default TemplateSetting;
