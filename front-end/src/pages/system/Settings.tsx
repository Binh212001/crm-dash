import { useState } from "react";
import CategorySetting from "./CategorySetting";
import EmailSetting from "./EmailSetting";
import TemplateSetting from "./TemplateSetting";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("category");

  const tabs = [
    { id: "category", name: "Danh mục", icon: "list" },
    { id: "email", name: "Cài đặt Email", icon: "envelope" },
    { id: "template", name: "Mẫu Email", icon: "file-text" },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "category":
        return <CategorySetting />;
      case "email":
        return <EmailSetting />;
      case "template":
        return <TemplateSetting />;
      default:
        return null;
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Cài đặt hệ thống</h1>
      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
        <div className="p-6">{renderTabContent()}</div>
      </div>
    </div>
  );
};

export default Settings;
