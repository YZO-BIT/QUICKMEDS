import React, { useState, useEffect } from "react";
import axios from "axios";

function AdminModule() {
  const [view, setView] = useState("analytics");
  const [analytics, setAnalytics] = useState(null);
  const [allOrders, setAllOrders] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [analyticsRes, ordersRes, usersRes] = await Promise.all([
        axios.get("http://localhost:5000/analytics"),
        axios.get("http://localhost:5000/orders"),
        axios.get("http://localhost:5000/users"),
      ]);

      setAnalytics(analyticsRes.data);
      setAllOrders(ordersRes.data);
      setAllUsers(usersRes.data);
    } catch (err) {
      console.log("Error fetching admin data");
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, icon }) => (
    <div className="stats-card">
      <p style={{ margin: "0 0 8px 0", opacity: 0.9, fontSize: "0.95rem" }}>{title}</p>
      <h3 style={{ margin: "0" }}>
        {icon} {value}
      </h3>
    </div>
  );

  // ========== ANALYTICS VIEW ==========
  if (view === "analytics") {
    return (
      <div>
        {loading ? (
          <div className="alert info">Loading analytics...</div>
        ) : analytics ? (
          <div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: 18,
                marginBottom: 30,
              }}
            >
              <StatCard
                title="Total Users"
                value={analytics.totalUsers}
                icon="👥"
              />
              <StatCard
                title="Total Orders"
                value={analytics.totalOrders}
                icon="📦"
              />
              <StatCard
                title="Total Revenue"
                value={`₹${analytics.totalRevenue}`}
                icon="💰"
              />
            </div>

            <div className="card">
              <h3>📊 Recent Orders</h3>
              {analytics.recentOrders && analytics.recentOrders.length > 0 ? (
                <table>
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>User Email</th>
                      <th>Medicine</th>
                      <th>Qty</th>
                      <th>Amount (₹)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analytics.recentOrders.map((order) => (
                      <tr key={order.orderId}>
                        <td>#{order.orderId}</td>
                        <td>{order.email}</td>
                        <td>{order.medicineName}</td>
                        <td>{order.quantity}</td>
                        <td>₹{order.totalPrice}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="alert info">No orders yet</div>
              )}
            </div>
          </div>
        ) : (
          <div className="alert info">Unable to load analytics</div>
        )}

        <div style={{ marginTop: 20 }}>
          <button onClick={() => setView("orders")}>View All Orders</button>
          <button onClick={() => setView("users")}>View All Users</button>
        </div>
      </div>
    );
  }

  // ========== ALL ORDERS VIEW ==========
  if (view === "orders") {
    return (
      <div>
        <div className="card">
          <h3>📦 All Orders ({allOrders.length})</h3>
          {allOrders.length === 0 ? (
            <div className="alert info">No orders yet</div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>User Email</th>
                  <th>Medicine</th>
                  <th>Qty</th>
                  <th>Unit Price (₹)</th>
                  <th>Total (₹)</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {allOrders.map((order) => (
                  <tr key={order.orderId}>
                    <td>#{order.orderId}</td>
                    <td>{order.email}</td>
                    <td>{order.medicineName}</td>
                    <td>{order.quantity}</td>
                    <td>₹{order.price}</td>
                    <td>₹{order.totalPrice}</td>
                    <td>
                      <span
                        style={{
                          backgroundColor:
                            order.status === "Pending" ? "#fff3cd" : "#d4edda",
                          color:
                            order.status === "Pending" ? "#856404" : "#155724",
                          padding: "4px 8px",
                          borderRadius: "4px",
                          fontSize: "0.85rem",
                          fontWeight: "500",
                        }}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div style={{ marginTop: 20 }}>
          <button onClick={() => setView("analytics")}>Back to Analytics</button>
          <button onClick={() => setView("users")}>View All Users</button>
        </div>
      </div>
    );
  }

  // ========== ALL USERS VIEW ==========
  if (view === "users") {
    return (
      <div>
        <div className="card">
          <h3>👥 All Users ({allUsers.length})</h3>
          {allUsers.length === 0 ? (
            <div className="alert info">No users registered yet</div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>User ID</th>
                  <th>Name</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {allUsers.map((user) => (
                  <tr key={user.id}>
                    <td>#{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div style={{ marginTop: 20 }}>
          <button onClick={() => setView("analytics")}>Back to Analytics</button>
          <button onClick={() => setView("orders")}>View All Orders</button>
        </div>
      </div>
    );
  }
}

export default AdminModule;
