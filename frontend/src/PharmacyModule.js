import React, { useState } from "react";
import axios from "axios";

function PharmacyModule() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [message, setMessage] = useState("");

  const add = async () => {
    if (!name.trim() || !price.trim()) {
      setMessage("Please fill in all fields");
      return;
    }

    try {
      await axios.post("http://localhost:5000/addMedicine", {
        name,
        price,
      });
      setMessage("✓ Medicine added successfully!");
      setName("");
      setPrice("");
    } catch (err) {
      setMessage("✕ Error adding medicine");
    }
  };

  return (
    <div className="card">
      <h2>🏪 Pharmacy Module</h2>
      <p style={{ color: "#6b7684", marginBottom: 15 }}>
        Manage pharmacy inventory
      </p>

      <div className="form-group">
        <label>Medicine Name</label>
        <input
          type="text"
          placeholder="e.g., Ibuprofen"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Price (₹)</label>
        <input
          type="number"
          placeholder="e.g., 399"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>

      <button onClick={add}>Add Medicine</button>

      {message && (
        <div className={`alert ${message.includes("✓") ? "success" : "warning"}`}>
          {message}
        </div>
      )}
    </div>
  );
}

export default PharmacyModule;
