import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";
import BookStore from "../Components/BookStore";
import Sidebar from "../Components/Sidebar";

const Home = () => {
  const [loggedInname, setLoggedInname] = useState("");
  const [activeTab, setActiveTab] = useState("Upload Books");
  const navigate = useNavigate();

  useEffect(() => {
    setLoggedInname(localStorage.getItem("loggedInname"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");      
    localStorage.removeItem("loggedInname");
    handleSuccess("User Logged out"); 
    setTimeout(() => navigate("/login"), 1000);
  };

  return ( 
    <div className="flex h-screen">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
 
      <div className="flex-1 flex flex-col"> 
        {/* Top Navbar */}
        <div className="bg-blue-600 text-white p-4 flex justify-between items-center"> 
          <h1 className="text-lg font-semibold">BookStore App</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium">Welcome, {loggedInname}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
            >
              Logout 
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6 overflow-auto">
          {activeTab === "Upload Books" && <BookStore uploadMode={true} />  }
          {activeTab === "Manage Books" && <BookStore />} 
          {activeTab === "Users" && <p> Users</p>}
          {activeTab === "Products" && <p> Products</p>}
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Home;
