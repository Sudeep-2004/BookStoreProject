import React from "react";

const Sidebar = ({ activeTab, setActiveTab }) => {
  const tabs = ["Upload Books", "Manage Books", "Users", "Products"];

  return (
    <div className="w-64 h-full bg-gray-800 text-white p-4 space-y-4">
      <h2 className="text-xl font-bold mb-6">Dashboard</h2>
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`w-full text-left px-3 py-2 rounded ${
            activeTab === tab ? "bg-blue-500" : "hover:bg-gray-700"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default Sidebar;
