import React, { useState } from "react";
import axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [message, setMessage] = useState("");

  const addMedicine = async () => {
    try {
      const res = await axios.post("http://localhost:5000/addMedicine", {
        name,
        price,
      });

      setMessage(res.data);
    } catch (err) {
      setMessage("Error adding medicine");
    }
  };

  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <h1 style={{ color: "blue" }}>QuickMeds 💊</h1>

      <input
        placeholder="Medicine Name"
        onChange={(e) => setName(e.target.value)}
        style={{ display: "block", margin: "10px", padding: "10px" }}
      />

      <input
        placeholder="Price"
        onChange={(e) => setPrice(e.target.value)}
        style={{ display: "block", margin: "10px", padding: "10px" }}
      />

      <button
        onClick={addMedicine}
        style={{
          padding: "10px 20px",
          backgroundColor: "green",
          color: "white",
          border: "none",
        }}
      >
        Add Medicine
      </button>

      <h3>{message}</h3>
    </div>
  );
}

export default App;
