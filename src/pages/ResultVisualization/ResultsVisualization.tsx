import { useEffect, useRef, useState } from "react";

import "./ResultsVisualization.css";

const prepareData = (data: any) => {
  const preparedData = data.map((iteration: any) => {
    const values = iteration.values.map((value: any) => {
      return [value[0], value[1], value[2]];
    });
    return { step: iteration.step, values };
  });
  return preparedData;
};

const ResultsVisualization: React.FC = () => {
  const [gridData, setGridData] = useState([]);
  const [iterationStep, setIterationStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [key, setKey] = useState("kelvin");

  // Fetch initial grid data from API
  useEffect(() => {
    const fetchGridData = async () => {
      const allDataResponse = await fetch(
        "http://localhost:5001/api/iterations"
      );

      // Wait for the response data to be parsed as JSON
      const jsonData = await allDataResponse.json();

      const preparedData = prepareData(jsonData.iterations);
      console.log("preparedData:", preparedData);

      setGridData(preparedData);
    };

    fetchGridData();
  }, []);

  const intervalRef = useRef(null);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setIterationStep(prevStep => prevStep + 1);
      }, 1000); // animate every 1 second
    }
    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying]);

  console.log("Grid data:", gridData);

  return (
    <div className="container">
      <div className="header">
        <button className="button" onClick={() => setKey("kelvin")}>
          temperature
        </button>
        <button className="button" onClick={() => setKey("pressure")}>
          pressure
        </button>
        <button className="button" onClick={() => setKey("temperature")}>
          temperature 2
        </button>
      </div>
      <div className="grid">
        {gridData.length > 0 &&
          gridData.map((data, index) => (
            <div key={index}>
              {data?.values?.map((value, valueIndex) => (
                <div
                  key={valueIndex}
                  className="box"
                  title={`Row: ${index}, Column: ${valueIndex}, Value: ${value[2][key]}`}
                >
                  <div className="kelvin">{value[2][key]}</div>
                </div>
              ))}
            </div>
          ))}
      </div>
      <div className="controls">
        <div className="left-controls">
          <button className="button" onClick={() => setIsPlaying(true)}>
            Play
          </button>
          <button className="button" onClick={() => setIsPlaying(false)}>
            Pause
          </button>
          <button className="button" onClick={() => setIterationStep(0)}>
            Reset
          </button>
        </div>
        <div className="middle-controls">
          <button
            className="button"
            disabled={iterationStep === 0}
            onClick={() => setIterationStep(prev => prev - 1)}
          >
            Previous
          </button>
          <button
            className="button"
            onClick={() => setIterationStep(prev => prev + 1)}
          >
            Next
          </button>
        </div>
        <div className="right-controls">
          <div className="step">Step: {iterationStep}</div>
        </div>
      </div>
    </div>
  );
};

export default ResultsVisualization;
