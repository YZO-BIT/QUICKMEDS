import React, { useState } from "react";
import axios from "axios";

function DeliveryModule() {
  const [result, setResult] = useState("");

  const getPath = async () => {
    try {
      const res = await axios.get("http://localhost:5000/shortest-path");
      console.log(res.data); // DEBUG
      setResult(res.data);
    } catch (err) {
      alert("Error fetching path");
      console.log(err);
    }
  };

  return (
    <div>
      <h2>🚚 Delivery Module</h2>

      <button onClick={getPath}>Find Shortest Path</button>

      {result && <p>{result}</p>}
    </div>
  );
}

export default DeliveryModule;
