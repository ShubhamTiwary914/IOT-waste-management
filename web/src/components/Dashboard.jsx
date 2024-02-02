import React, { useState, useEffect } from "react";
import styles from "../styles/blocks.module.css";
import Icon from "@mdi/react";
import Chart from "chart.js/auto";
// import { Line } from "react-chartjs-2";
import {
  mdiChartLine,
  mdiFoodApple,
  mdiCommentQuote,
  mdiAccountMultiple,
  mdiLightbulbOnOutline,
  mdiPackage,
  mdiThermometer,
  mdiGasCylinder,
} from "@mdi/js";

function Dashboard() {
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [requestMessage, setRequestMessage] = useState("");

  const [userMetrics, setUserMetrics] = useState({
    totalMatches: 30,
    foodShared: 150,
  });

  const [predictiveData, setPredictiveData] = useState([
    { id: 1, category: "Predicted Matches", value: 15 },
    { id: 2, category: "Food Shared This Month", value: 20 },
  ]);

  const [recentMatches, setRecentMatches] = useState([
    { id: 1, business: "Fresh Foods", quantity: 20, foodType: "apples" },
    { id: 2, business: "Green Grocers", quantity: 15, foodType: "bananas" },
    { id: 3, business: "Healthy Harvest", quantity: 30, foodType: "carrots" },
  ]);

  const [testimonials, setTestimonials] = useState([
    {
      id: 1,
      quote:
        "This platform is amazing! It helped us share surplus food easily.",
      author: "Alice",
    },
    {
      id: 2,
      quote:
        "Reducing food waste has never been more rewarding. Great initiative!",
      author: "Bob",
    },
    {
      id: 3,
      quote:
        "The Food Sharing Network made a positive impact in our community.",
      author: "Charlie",
    },
  ]);

  const [impactInsights, setImpactInsights] = useState([
    { id: 1, metric: "CO2 Saved", values: [30, 50, 40, 60, 45, 55] },
    { id: 2, metric: "Water Saved", values: [80, 100, 90, 120, 110, 130] },
  ]);

  const weekLabels = [
    "Week 1",
    "Week 2",
    "Week 3",
    "Week 4",
    "Week 5",
    "Week 6",
  ];

  const createChart = (canvasId, labels, data, label) => {
    const ctx = document.getElementById(canvasId).getContext("2d");
    new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: label,
            data: data,
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  };

  const [inventory, setInventory] = useState([
    { id: 1, foodType: "Rice", quantity: 50 },
    { id: 2, foodType: "Pasta", quantity: 30 },
    { id: 3, foodType: "Canned Beans", quantity: 40 },
  ]);

  const [sensorData, setSensorData] = useState({
    temperature: "updating", //25,
    gasLevels: {
      O2: "updating", //"Normal",
      CO2: "updating", //"Normal",
    },
  });

  useEffect(() => {
    // Simulate real-time updates every 5 seconds
    const interval = setInterval(() => {
      // Replace the following lines with actual data fetching from your sensors
      const newTemperature = getRandomTemperature();
      const newO2Level = getRandomGasLevel();
      const newCO2Level = getRandomGasLevel();

      setSensorData((prevData) => ({
        ...prevData,
        temperature: newTemperature,
        gasLevels: {
          O2: newO2Level,
          CO2: newCO2Level,
        },
      }));
    }, 5000);

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const getRandomTemperature = () => {
    // Replace this with actual logic to get temperature data
    return Math.floor(Math.random() * 30) + 20;
  };

  const getRandomGasLevel = () => {
    // Replace this with actual logic to get gas level data
    const levels = ["Normal", "High", "Low"];
    return levels[Math.floor(Math.random() * levels.length)];
  };

  const availableMatches = [
    { id: 1, business: "Local Market", quantity: 20, foodType: "Fruits" },
    {
      id: 2,
      business: "Farm Fresh Produce",
      quantity: 15,
      foodType: "Vegetables",
    },
  ];

  const handleMatchSelection = (match) => {
    setSelectedMatch(match);
  };

  const handleRequestMessageChange = (e) => {
    setRequestMessage(e.target.value);
  };

  const handleRequestSubmit = () => {
    // Logic to submit the exchange request
    console.log(
      `Exchange request submitted for ${selectedMatch.business}: ${requestMessage}`
    );
  };

  useEffect(() => {
    const renderCharts = () => {
      console.log("Rendering charts...");

      createChart(
        "co2Chart",
        weekLabels,
        impactInsights[0].values,
        "CO2 Saved (kg)"
      );
      createChart(
        "waterChart",
        weekLabels,
        impactInsights[1].values,
        "Water Saved (liters)"
      );
    };

    // Check if the component is mounted before rendering charts
    if (
      document.getElementById("co2Chart") &&
      document.getElementById("waterChart")
    ) {
      renderCharts();
    }

    // Cleanup function to remove charts when component unmounts
    return () => {
      const co2Chart = Chart.getChart("co2Chart");
      const waterChart = Chart.getChart("waterChart");

      console.log("Cleaning up charts...");

      co2Chart && co2Chart.destroy();
      waterChart && waterChart.destroy();
    };
  }, [impactInsights]);

  return (
    <div className={styles.dashboardContainer}>
      <h2 className={styles.dashboard_text}>User Dashboard</h2>

      <div className={styles.sectionContainer}>
        <p>{`Total matches: ${userMetrics.totalMatches}`}</p>
        <p>{`Food shared: ${userMetrics.foodShared}`}</p>
      </div>

      {/* Predictive Data Section */}
      <div className={styles.sectionContainer}>
        <h3>
          <Icon path={mdiChartLine} size={1} />
          Predictive Data
        </h3>
        <div className={styles.predictive_data}>
          {predictiveData.map((data) => (
            <p key={data.id}>{`${data.category}: ${data.value}`}</p>
          ))}
        </div>
      </div>

      {/* Recent Success Stories Section */}
      <div className={styles.sectionContainer}>
        <h3>
          <Icon path={mdiFoodApple} size={1} />
          Recent Success Stories
        </h3>
        <ul className={styles.recent_matches}>
          {recentMatches.map((match) => (
            <li
              key={match.id}
            >{`${match.business} shared ${match.quantity} ${match.foodType}`}</li>
          ))}
        </ul>
      </div>

      {/* Testimonials Section */}
      <div className={styles.sectionContainer}>
        <h3>
          <Icon path={mdiCommentQuote} size={1} />
          What People Are Saying
        </h3>
        <div className={styles.testimonials}>
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className={styles.testimonial}>
              <p>{testimonial.quote}</p>
              <p className={styles.author}>{testimonial.author}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Community Exchange Section */}
      <div className={styles.sectionContainer}>
        <h3>
          <Icon path={mdiAccountMultiple} size={1} />
          Community Exchange
        </h3>
        <h3>Available Matches</h3>
        <ul className={styles.availableMatches}>
          {availableMatches.map((match) => (
            <li key={match.id}>
              {`${match.business} is offering ${match.quantity} ${match.foodType}`}
              <button onClick={() => handleMatchSelection(match)}>
                Select
              </button>
            </li>
          ))}
        </ul>

        {selectedMatch && (
          <div className={styles.selectedMatch}>
            <h3>Selected Match</h3>
            <p>{`${selectedMatch.business} - ${selectedMatch.quantity} ${selectedMatch.foodType}`}</p>

            <div className={styles.requestMessage}>
              <h3>Request Message</h3>
              <textarea
                value={requestMessage}
                onChange={handleRequestMessageChange}
              />
            </div>

            <button
              onClick={handleRequestSubmit}
              className={styles.requestSubmit}
            >
              Submit Request
            </button>
          </div>
        )}
      </div>

      {/* Impact Insights Section */}
      <div className={styles.sectionContainer}>
        <h3>
          <Icon path={mdiLightbulbOnOutline} size={1} />
          Impact Insights
        </h3>

        <div className={styles.impact_insights}>
          {/* CO2 Saved Chart */}
          <canvas id="co2Chart" width="200" height="100"></canvas>

          {/* Water Saved Chart */}
          <canvas id="waterChart" width="200" height="100"></canvas>
        </div>

        {/* <div className={styles.impact_insights}>
          {impactInsights.map((insight) => (
            <p key={insight.id}>{`${insight.metric}: ${insight.value}`}</p>
          ))}
        </div> */}
      </div>

      {/* Inventory Section */}
      <div className={styles.sectionContainer}>
        <h3>
          <Icon path={mdiPackage} size={1} />
          Inventory
        </h3>
        <ul className={styles.inventory}>
          {inventory.map((item) => (
            <li key={item.id}>{`${item.foodType}: ${item.quantity}`}</li>
          ))}
        </ul>
      </div>

      {/* Sensor Data Section */}
      <div className={styles.sectionContainer}>
        <h3>
          <Icon path={mdiThermometer} size={1} />
          Sensor Data
        </h3>
        <div className={styles.sensorData}>
          <p>{`Temperature: ${sensorData.temperature} °C`}</p>
          <p>{`Gas Level (O2): ${sensorData.gasLevels.O2}`}</p>
          <p>{`Gas Level (CO2): ${sensorData.gasLevels.CO2}`}</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
