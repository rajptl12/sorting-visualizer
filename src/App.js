import React, { useState } from "react";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [array, setArray] = useState(generateArray());
  const [isSorting, setIsSorting] = useState(false);

  // Function to generate random array
  function generateArray() {
    return Array.from({ length: 20 }, () => Math.floor(Math.random() * 100) + 10);
  }

  // Generate new random array
  const handleNewArray = () => {
    if (isSorting) return;
    setArray(generateArray());
  };

  // Bubble sort animation
  const bubbleSort = async () => {
    setIsSorting(true);
    const arr = [...array];

    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          // swap
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setArray([...arr]);
          await new Promise((resolve) => setTimeout(resolve, 200)); // animation delay
        }
      }
    }

    setIsSorting(false);
  };

  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center vh-100"
      style={{ backgroundColor: "#0f172a", color: "white" }}
    >
      <h2 className="mb-4 text-info fw-bold">Sorting Visualizer 🧩</h2>

      <div
        className="d-flex align-items-end justify-content-center mb-4"
        style={{ height: "300px", width: "80%", borderBottom: "2px solid #555" }}
      >
        {array.map((value, index) => (
          <motion.div
            key={index}
            layout
            transition={{ duration: 0.2 }}
            style={{
              height: `${value * 2}px`,
              width: "20px",
              margin: "0 3px",
              backgroundColor: "#00d9ff",
              borderRadius: "4px",
            }}
          ></motion.div>
        ))}
      </div>

      <div className="d-flex gap-3">
        <button
          className="btn btn-outline-light"
          onClick={handleNewArray}
          disabled={isSorting}
        >
          🔁 New Array
        </button>

        <button
          className="btn btn-info"
          onClick={bubbleSort}
          disabled={isSorting}
        >
          ▶️ Start Sort
        </button>
      </div>

      <p className="mt-3 text-secondary">
        {isSorting ? "Sorting in progress..." : "Click 'Start Sort' to visualize Bubble Sort"}
      </p>
    </div>
  );
}

export default App;
