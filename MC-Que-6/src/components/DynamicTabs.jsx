import React, { useState } from "react";
import "./DynamicTabs.css"; // For styling

const DynamicTabs = () => {
  // State to manage tabs and active tab index
  const [tabs, setTabs] = useState([
    { id: 1, title: "Tab 1", content: "Content for Tab 1" },
  ]);
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  // Function to add a new tab
  const addTab = () => {
    const newTab = {
      id: tabs.length + 1,
      title: `Tab ${tabs.length + 1}`,
      content: `Content for Tab ${tabs.length + 1}`,
    };
    setTabs([...tabs, newTab]);
    setActiveTabIndex(tabs.length); // Set the new tab as active
  };

  // Function to remove a tab
  const removeTab = (id) => {
    if (tabs.length === 1) return; // Prevent removing the last tab
    const updatedTabs = tabs.filter((tab) => tab.id !== id);
    setTabs(updatedTabs);
    setActiveTabIndex(Math.min(activeTabIndex, updatedTabs.length - 1)); // Adjust active tab index
  };

  // Function to switch tabs
  const switchTab = (index) => {
    setActiveTabIndex(index);
  };

  return (
    <div className="tabs-container">
      {/* Tab Buttons */}
      <div className="tabs-header">
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            className={`tab-button ${index === activeTabIndex ? "active" : ""}`}
            onClick={() => switchTab(index)}
          >
            {tab.title}
            <span className="close-icon" onClick={() => removeTab(tab.id)}>
              &times;
            </span>
          </button>
        ))}
        <button className="add-tab-button" onClick={addTab}>
          Add Tab
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {tabs[activeTabIndex]?.content || "No content available"}
      </div>
    </div>
  );
};

export default DynamicTabs;
