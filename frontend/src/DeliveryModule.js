import React, { useState } from "react";
import axios from "axios";

function DeliveryModule() {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const getPath = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/shortest-path");
      setResult(res.data);
    } catch (err) {
      setResult("Error fetching delivery path");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>🚚 Delivery Module</h2>
      <p style={{ color: "#6b7684", marginBottom: 15 }}>
        Find optimized delivery routes
      </p>

      <button onClick={getPath} disabled={loading}>
        {loading ? "Calculating..." : "Find Shortest Path"}
      </button>

      {result && (
        <div className="alert info" style={{ marginTop: 15 }}>
          <strong>Route:</strong> {result}
        </div>
      )}
    </div>
  );
}

export default DeliveryModule;
