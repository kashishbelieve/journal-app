import React from "react";
import { FiHome, FiSearch, FiEdit, FiSave, FiCalendar, FiLogOut } from "react-icons/fi";

function Sidebar({ onSelect, onLogout }) {
  const menuItems = [
    { icon: <FiHome />, label: "Dashboard" },
    { icon: <FiSearch />, label: "Pick" },
    { icon: <FiEdit />, label: "Write" },
    { icon: <FiSave />, label: "Save" },
    { icon: <FiCalendar />, label: "Previous" },
    { icon: <FiLogOut />, label: "Logout" },  // added logout
  ];

  return (
    <div className="w-16 bg-gray-100 h-screen flex flex-col items-center py-6 border-r">
      {menuItems.map((item, idx) => (
        <div
          key={idx}
          className="flex flex-col items-center mb-6 cursor-pointer hover:bg-gray-200 rounded-lg p-2"
          onClick={() => {
            if (item.label === "Logout") {
              onLogout();  // call logout function
            } else {
              onSelect(item.label);
            }
          }}
        >
          <div className="text-green-600 text-xl">{item.icon}</div>
          <span className="text-xs mt-1">{item.label}</span>
        </div>
      ))}
    </div>
  );
}

export default Sidebar;
