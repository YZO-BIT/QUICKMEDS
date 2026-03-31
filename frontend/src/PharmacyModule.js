import React, { useState } from "react";
import axios from "axios";

function PharmacyModule() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const add = async () => {
    await axios.post("http://localhost:5000/addMedicine", {
      name,
      price,
    });
    alert("Added!");
  };

  return (
    <div>
      <h2>🏪 Pharmacy Module</h2>

      <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
      <input placeholder="Price" onChange={(e) => setPrice(e.target.value)} />

      <button onClick={add}>Add Medicine</button>
    </div>
  );
}

export default PharmacyModule;
