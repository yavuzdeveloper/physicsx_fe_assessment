import { useEffect } from "react";
import "./ResultsVisualization.css";

const ResultsVisualization: React.FC = () => {
  // Fetch initial grid data from API
  useEffect(() => {
    const fetchGridData = async () => {
      const allDataResponse = await fetch(
        "http://localhost:5001/api/iterations"
      );

      // Wait for the response data to be parsed as JSON
      const jsonData = await allDataResponse.json();

      console.log("Grid data:", jsonData);
    };

    fetchGridData();
  }, []);

  return (
    <div className="container">
      <div className="header">
        <button className="button">temperature</button>
        <button className="button">pressure</button>
        <button className="button">temperature 2</button>
      </div>
      <div className="grid">boxes</div>
      <div className="controls">
        <div>
          <button className="button">Play</button>
          <button className="button">Pause</button>
          <button className="button">Reset</button>
        </div>
        <div className="step">step:1</div>
      </div>
    </div>
  );
};

export default ResultsVisualization;
