import React, { useState } from "react";

const App = () => {
  const [steps, setSteps] = useState(0);

  return (
    <div className="container">
      {/*conditional rendering */}
      {steps === 0 && <p>you haven't started walking yet</p>}
      {steps > 0 && steps < 10 && (
        <p>Good start! You've taken {steps} steps!</p>
      )}
      {steps >= 10 && (
        <p style={{ color: "green" }}>Great job! you've taken {steps} steps</p>
      )}{" "}
      <button onClick={() => setSteps(steps + 1)}>Add step</button>
    </div>
  );
};

export default App;
