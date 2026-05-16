import { useState } from "react";

export default function Home() {
  const [quantity, setQuantity] = useState("");
  const [prediction, setPrediction] = useState(null);

  const predict = async () => {
    const res = await fetch("/api/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ quantity })
    });

    const data = await res.json();
    setPrediction(data);
  };

  return (
    <div>
      <h1>Coal Profit Prediction</h1>
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        placeholder="Enter Quantity"
      />
      <button onClick={predict}>Predict</button>
      {prediction && (
        <div>
          <h2>Prediction:</h2>
          <pre>{JSON.stringify(prediction, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
