import React, { useState } from "react";
import { CalculatorContainer, Display, Button, ButtonsContainer } from "./styles";
import { evaluate } from "mathjs"; // Import evaluate from math.js

export default function App() {
  const [input, setInput] = useState(""); // Stores the current input
  const [result, setResult] = useState(""); // Stores the result of the calculation

  // Handle button clicks
  const handleClick = (value) => {
    if (value === "=") {
      try {
        // Ensure the input is not empty before evaluating
        if (!input.trim()) {
          setResult("Error");
          return;
        }

        // Use math.evaluate to safely evaluate the expression
        const evaluatedResult = evaluate(input);

        // Update the result state
        setResult(evaluatedResult.toString());
      } catch (error) {
        // Handle any errors during evaluation
        setResult("Error");
      }
    } else if (value === "C") {
      // Clear the input and result
      setInput("");
      setResult("");
    } else {
      // Append the clicked value to the input
      setInput((prevInput) => prevInput + value);
    }
  };

  return (
    <CalculatorContainer>
      <h1>React Calculator</h1>
      <Display type="text" value={result || input} readOnly />
      <ButtonsContainer>
        {/* Numeric buttons */}
        {[7, 8, 9, 4, 5, 6, 1, 2, 3, 0].map((num) => (
          <Button key={num} onClick={() => handleClick(num)}>
            {num}
          </Button>
        ))}
        {/* Operator buttons */}
        {["+", "-", "*", "/"].map((op) => (
          <Button key={op} onClick={() => handleClick(op)}>
            {op}
          </Button>
        ))}
        {/* Special buttons */}
        <Button onClick={() => handleClick("C")}>C</Button>
        <Button onClick={() => handleClick("=")}>=</Button>
      </ButtonsContainer>
    </CalculatorContainer>
  );
}