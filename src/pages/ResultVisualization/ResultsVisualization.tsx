import { useEffect } from "react";
import "./ResultsVisualization.css";

const ResultsVisualization: React.FC = () => {
  // Fetch initial grid data from API

  // useEffect(() => {
  //   const fetchGridData = async () => {
  //     const allDataResponse = await fetch(
  //       "http://localhost:5001/api/iterations"
  //     );
  //     console.log("Grid data:", allDataResponse.json());
  //   };
  //   fetchGridData();
  // }, []);

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
      <div className="grid">
        {/* paste your code here */}
        Test 1
      </div>
      <div className="controls">
        {/* paste your code here */}
        Test 2
      </div>
    </div>
  );
};

export default ResultsVisualization;
