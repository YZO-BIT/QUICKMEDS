import React, { useState, useEffect } from "react";
import axios from "axios";

function UserModule({ currentUser, onLogin }) {
  const [view, setView] = useState(currentUser ? "dashboard" : "auth");
  const [authMode, setAuthMode] = useState("login"); // login or register
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [medicines, setMedicines] = useState([]);
  const [userOrders, setUserOrders] = useState([]);
  const [cartItem, setCartItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  // Fetch medicines on mount
  useEffect(() => {
    fetchMedicines();
  }, []);

  // Fetch user orders if logged in
  useEffect(() => {
    if (currentUser) {
      const fetchOrders = async () => {
        try {
          const res = await axios.get(
            `http://localhost:5000/myOrders/${currentUser.email}`
          );
          setUserOrders(res.data);
        } catch (err) {
          console.log("Error fetching orders");
        }
      };
      fetchOrders();
    }
  }, [currentUser]);

  const fetchMedicines = async () => {
    try {
      const res = await axios.get("http://localhost:5000/medicines");
      setMedicines(res.data);
    } catch (err) {
      console.log("Error fetching medicines");
    }
  };

  const fetchUserOrders = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/myOrders/${currentUser.email}`
      );
      setUserOrders(res.data);
    } catch (err) {
      console.log("Error fetching orders");
    }
  };

  const handleAuth = async () => {
    if (!formData.email) {
      setMessage("Email is required");
      setMessageType("error");
      return;
    }

    if (authMode === "register" && !formData.name) {
      setMessage("Name is required for registration");
      setMessageType("error");
      return;
    }

    try {
      const endpoint =
        authMode === "login"
          ? "http://localhost:5000/login"
          : "http://localhost:5000/register";

      const res = await axios.post(endpoint, formData);
      setMessage(res.data.message);
      setMessageType("success");

      if (res.data.user) {
        onLogin(res.data.user);
        setView("dashboard");
      }

      setFormData({ name: "", email: "" });
    } catch (err) {
      setMessage(err.response?.data?.error || "Authentication failed");
      setMessageType("error");
    }
  };

  const handleAddToCart = (medicine) => {
    setCartItem(medicine);
    setQuantity(1);
  };

  const handlePlaceOrder = async () => {
    if (!cartItem) return;

    try {
      const res = await axios.post("http://localhost:5000/placeOrder", {
        userId: currentUser.id,
        medicineId: cartItem.id,
        quantity,
        email: currentUser.email,
      });

      setMessage(res.data.message);
      setMessageType("success");
      setCartItem(null);
      setQuantity(1);

      // Refresh orders
      fetchUserOrders();
    } catch (err) {
      setMessage(err.response?.data?.error || "Failed to place order");
      setMessageType("error");
    }
  };

  // ========== AUTHENTICATION VIEW ==========
  if (view === "auth") {
    return (
      <div className="card">
        <h2>{authMode === "login" ? "Welcome back! 👋" : "Let's get started 🚀"}</h2>

        {authMode === "register" && (
          <div className="form-group">
            <label>What's your name?</label>
            <input
              type="text"
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>
        )}

        <div className="form-group">
          <label>Email address</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </div>

        <button onClick={handleAuth}>
          {authMode === "login" ? "Sign in" : "Create account"}
        </button>

        <p style={{ marginTop: 15, color: "#6b7684", fontSize: "0.9rem" }}>
          {authMode === "login"
            ? "Don't have an account yet? "
            : "Already have an account? "}
          <button
            onClick={() => {
              setAuthMode(authMode === "login" ? "register" : "login");
              setFormData({ name: "", email: "" });
              setMessage("");
            }}
            className="toggle-btn"
          >
            {authMode === "login" ? "Sign up" : "Sign in"}
          </button>
        </p>

        {message && (
          <div className={`alert ${messageType}`} style={{ marginTop: "15px" }}>
            {message}
          </div>
        )}
      </div>
    );
  }

  // ========== DASHBOARD VIEW ==========
  return (
    <div>
      {/* SEARCH & BROWSE MEDICINES */}
      <div className="card">
        <h3>🔍 Browse Medicines</h3>
        <p style={{ color: "#6b7684", marginBottom: "15px" }}>
          Find and order the medicines you need
        </p>

        {medicines.length === 0 ? (
          <div className="alert info">No medicines available right now. Check back soon!</div>
        ) : (
          <div>
            <table>
              <thead>
                <tr>
                  <th>Medicine</th>
                  <th>Price</th>
                  <th>Available</th>
                  <th style={{ textAlign: "center" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {medicines.map((med) => (
                  <tr key={med.id}>
                    <td>{med.name}</td>
                    <td>₹{med.price}</td>
                    <td>{med.quantity} left</td>
                    <td style={{ textAlign: "center" }}>
                      <button
                        onClick={() => handleAddToCart(med)}
                        style={{ fontSize: "0.85rem" }}
                      >
                        Order
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* CART / PLACE ORDER */}
      {cartItem && (
        <div className="card cart-card">
          <h3>🛒 Order {cartItem.name}</h3>
          <p style={{ color: "#6b7684", marginBottom: 15, fontSize: "0.95rem" }}>
            Price: <strong>₹{cartItem.price}</strong> per unit
          </p>

          <div className="form-group">
            <label>How many do you need?</label>
            <input
              type="number"
              min="1"
              max={cartItem.quantity}
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
              style={{ maxWidth: "100px" }}
            />
          </div>

          <p style={{ color: "#5fb3d5", fontSize: "1.2rem", fontWeight: 600, marginBottom: 15 }}>
            Total: ₹{cartItem.price * quantity}
          </p>

          <button onClick={handlePlaceOrder} style={{ marginRight: 8 }}>
            ✓ Yes, order this
          </button>
          <button
            onClick={() => {
              setCartItem(null);
              setQuantity(1);
            }}
            style={{ background: "#9ca3af" }}
          >
            Cancel
          </button>
        </div>
      )}

      {/* MY ORDERS */}
      <div className="card">
        <h3>📦 Your Orders</h3>
        {userOrders.length === 0 ? (
          <div className="alert info">You haven't placed any orders yet. Browse medicines above to get started!</div>
        ) : (
          <div>
            <table>
              <thead>
                <tr>
                  <th>Order #</th>
                  <th>Medicine</th>
                  <th>Qty</th>
                  <th>Total (₹)</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {userOrders.map((order) => (
                  <tr key={order.orderId}>
                    <td>#{order.orderId}</td>
                    <td>{order.medicineName}</td>
                    <td>{order.quantity}</td>
                    <td>₹{order.totalPrice}</td>
                    <td>
                      <span
                        style={{
                          backgroundColor:
                            order.status === "Pending" ? "#fef3c7" : "#d4f4dd",
                          color: order.status === "Pending" ? "#7c2d12" : "#1b6e3a",
                          padding: "4px 8px",
                          borderRadius: "4px",
                          fontSize: "0.85rem",
                          fontWeight: 500,
                        }}
                      >
                        {order.status === "Pending" ? "⏳ Pending" : "✓ Done"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {message && (
        <div className={`alert ${messageType}`} style={{ marginTop: "15px" }}>
          {message}
        </div>
      )}
    </div>
  );
}

export default UserModule;
