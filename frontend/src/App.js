import React, { useState } from "react";
import "./AppNew.css";
import "./LandingPage.css";
import LandingPage from "./LandingPage";
import AdminModule from "./AdminModule";
import UserModule from "./UserModule";
import PharmacyModule from "./PharmacyModule";
import DeliveryModule from "./DeliveryModule";

function App() {
  const [showApp, setShowApp] = useState(false);
  const [activeTab, setActiveTab] = useState(null);
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem("currentUser");
    return saved ? JSON.parse(saved) : null;
  });

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
    setActiveTab(null);
  };

  const handleUserLogin = (user) => {
    setCurrentUser(user);
    localStorage.setItem("currentUser", JSON.stringify(user));
    setActiveTab("user");
  };

  // Show landing page by default
  if (!showApp) {
    return <LandingPage onGetStarted={() => setShowApp(true)} />;
  }

  return (
    <div className="app">
      {/* HEADER */}
      <div className="header">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h1>💊 QuickMeds</h1>
            <p>Online Medicine Management & Delivery System</p>
          </div>
          <div style={{ textAlign: "right" }}>
            <button
              onClick={() => setShowApp(false)}
              style={{
                padding: "8px 16px",
                fontSize: "0.9rem",
                backgroundColor: "rgba(255,255,255,0.25)",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                marginBottom: "8px",
                display: "block",
                width: "100%",
              }}
            >
              ← Back to Home
            </button>
            {currentUser && (
              <p style={{ margin: "8px 0 0 0", fontSize: "0.9rem" }}>
                Welcome, <strong>{currentUser.name}</strong>
                <button
                  onClick={handleLogout}
                  style={{
                    padding: "4px 12px",
                    fontSize: "0.85rem",
                    backgroundColor: "rgba(255,255,255,0.25)",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    marginLeft: "10px",
                  }}
                >
                  Logout
                </button>
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="container">
        {/* HERO / WELCOME SECTION */}
        {activeTab === null && (
          <div style={{ textAlign: "center", marginBottom: "50px", marginTop: "40px" }}>
            <h2 style={{ fontSize: "2.2rem", color: "#2d4a5f", marginBottom: "12px", fontWeight: "700" }}>
              Welcome to QuickMeds Dashboard
            </h2>
            <p style={{ fontSize: "1.05rem", color: "#6b7684", marginBottom: "40px", maxWidth: "600px", margin: "0 auto 40px" }}>
              Manage your medicines, track orders, handle deliveries, and view analytics all in one place
            </p>
          </div>
        )}

        {/* MODULE CARDS GRID - Show when no tab selected OR before viewing content */}
        {activeTab === null && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px", marginBottom: "50px" }}>
            {/* Pharmacy Card */}
            <div 
              className="card"
              onClick={() => setActiveTab("pharmacy")}
              style={{ 
                cursor: "pointer", 
                border: "2px solid #e5eaeb",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(95, 179, 213, 0.15)";
                e.currentTarget.style.borderColor = "#5fb3d5";
                e.currentTarget.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.05)";
                e.currentTarget.style.borderColor = "#e5eaeb";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <h3 style={{ fontSize: "1.8rem", marginBottom: "8px" }}>🏪</h3>
              <h3 style={{ color: "#2d4a5f", marginBottom: "8px" }}>Pharmacy Management</h3>
              <p style={{ color: "#6b7684", marginBottom: "16px" }}>Add medicines to inventory and manage stock levels</p>
              <button style={{ width: "100%" }}>Access Pharmacy</button>
            </div>

            {/* User Card */}
            <div 
              className="card"
              onClick={() => setActiveTab("user")}
              style={{ 
                cursor: "pointer",
                border: "2px solid #e5eaeb",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(95, 179, 213, 0.15)";
                e.currentTarget.style.borderColor = "#5fb3d5";
                e.currentTarget.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.05)";
                e.currentTarget.style.borderColor = "#e5eaeb";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <h3 style={{ fontSize: "1.8rem", marginBottom: "8px" }}>👤</h3>
              <h3 style={{ color: "#2d4a5f", marginBottom: "8px" }}>Medicine Store</h3>
              <p style={{ color: "#6b7684", marginBottom: "16px" }}>Browse medicines and place orders with ease</p>
              <button style={{ width: "100%" }}>Shop Now</button>
            </div>

            {/* Admin Card */}
            <div 
              className="card"
              onClick={() => setActiveTab("admin")}
              style={{ 
                cursor: "pointer",
                border: "2px solid #e5eaeb",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(95, 179, 213, 0.15)";
                e.currentTarget.style.borderColor = "#5fb3d5";
                e.currentTarget.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.05)";
                e.currentTarget.style.borderColor = "#e5eaeb";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <h3 style={{ fontSize: "1.8rem", marginBottom: "8px" }}>📊</h3>
              <h3 style={{ color: "#2d4a5f", marginBottom: "8px" }}>Analytics Dashboard</h3>
              <p style={{ color: "#6b7684", marginBottom: "16px" }}>View sales, users, orders, and performance metrics</p>
              <button style={{ width: "100%" }}>View Analytics</button>
            </div>

            {/* Delivery Card */}
            <div 
              className="card"
              onClick={() => setActiveTab("delivery")}
              style={{ 
                cursor: "pointer",
                border: "2px solid #e5eaeb",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(95, 179, 213, 0.15)";
                e.currentTarget.style.borderColor = "#5fb3d5";
                e.currentTarget.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.05)";
                e.currentTarget.style.borderColor = "#e5eaeb";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <h3 style={{ fontSize: "1.8rem", marginBottom: "8px" }}>🚚</h3>
              <h3 style={{ color: "#2d4a5f", marginBottom: "8px" }}>Delivery Routes</h3>
              <p style={{ color: "#6b7684", marginBottom: "16px" }}>Optimize delivery paths and track shipments</p>
              <button style={{ width: "100%" }}>Plan Routes</button>
            </div>
          </div>
        )}

        {/* CONTENT SECTIONS */}
        {activeTab !== null && (
          <>
            <button 
              onClick={() => setActiveTab(null)}
              style={{
                marginBottom: "24px",
                background: "transparent",
                color: "#5fb3d5",
                border: "2px solid #5fb3d5",
                padding: "8px 16px",
                boxShadow: "none",
              }}
            >
              ← Back to Dashboard
            </button>

            {/* PHARMACY SECTION */}
            {activeTab === "pharmacy" && (
              <div>
                <h2 style={{ fontSize: "1.8rem", color: "#2d4a5f", marginBottom: "24px", fontWeight: "600" }}>🏪 Pharmacy Management</h2>
                <PharmacyModule />
              </div>
            )}

            {/* USER SECTION */}
            {activeTab === "user" && (
              <div>
                <h2 style={{ fontSize: "1.8rem", color: "#2d4a5f", marginBottom: "24px", fontWeight: "600" }}>👤 Medicine Store</h2>
                <UserModule currentUser={currentUser} onLogin={handleUserLogin} />
              </div>
            )}

            {/* ADMIN SECTION */}
            {activeTab === "admin" && (
              <div>
                <h2 style={{ fontSize: "1.8rem", color: "#2d4a5f", marginBottom: "24px", fontWeight: "600" }}>📊 Analytics Dashboard</h2>
                <AdminModule />
              </div>
            )}

            {/* DELIVERY SECTION */}
            {activeTab === "delivery" && (
              <div>
                <h2 style={{ fontSize: "1.8rem", color: "#2d4a5f", marginBottom: "24px", fontWeight: "600" }}>🚚 Delivery Routes</h2>
                <DeliveryModule />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
