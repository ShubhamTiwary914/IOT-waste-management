import React, { useState, useEffect } from "react";
import styles from "../styles/blocks.module.css";
import Icon from "@mdi/react";
import Chart from "chart.js/auto";
import Requests from "../connect/requests";
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
  const [itemsQueue, setItemsQueue] = useState([]);
  const [hourlyData, setHourlyData] = useState([]);

  useEffect(() => {
    Requests.fetch_ItemsQueue((res) => {
      console.log(res);
      setItemsQueue(res);
    });
  }, []);

  useEffect(() => {
    Requests.fetchDevice_hourly((res) => {
      console.log(res);
      setHourlyData(res);
    });
  }, []);

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
    { id: 1, foodType: food_1, quantity: food_1_quantity },
    { id: 2, foodType: food_2, quantity: food_2_quantity },
    { id: 3, foodType: food_3, quantity: food_3_quantity },
    { id: 3, foodType: food_4, quantity: food_4_quantity },
  ]);

  // Dummy data for timestamps when more food items were added
  const [foodChanges, setFoodChanges] = useState([
    { id: 1, foodType: "Rice", change: "+10", timestamp: "10:30 AM" },
    { id: 2, foodType: "Pasta", change: "-5", timestamp: "11:45 AM" },
    { id: 3, foodType: "Canned Beans", change: "+20", timestamp: "1:15 PM" },
  ]);

  const [sensorData, setSensorData] = useState({
    temperature: "updating", //25,
    humidity: "updating", //60,
    o2_1: "updating",
    co2_1: "updating",
    o2_2: "updating",
    co2_2: "updating",
  });

  useEffect(() => {
    const interval = setInterval(() => {
      // Fetch real-time sensor data every 5 seconds
      Requests.fetchDevice_realTime((res) => {
        console.log(res);
        let length = res.length;
        setSensorData({
          temperature: res[length - 1].data.temp,
          humidity: res[length - 1].data.humidity,
          o2_1: res[length - 1].data.containers[0].o2,
          co2_1: res[length - 1].data.containers[0].co2,
          weight1: res[length - 1].data.containers[0].weight,
          o2_2: res[length - 1].data.containers[1].o2,
          co2_2: res[length - 1].data.containers[1].co2,
          weight2: res[length - 1].data.containers[1].weight,
        });
      });
    }, 5000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

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

      {/* <div className={styles.sectionContainer}>
        <p>{`Total matches: ${userMetrics.totalMatches}`}</p>
        <p>{`Food shared: ${userMetrics.foodShared}`}</p>
      </div> */}

      {/* Predictive Data Section */}
      {/* <div className={styles.sectionContainer}>
        <h3>
          <Icon path={mdiChartLine} size={1} />
          Predictive Data
        </h3>
        <div className={styles.predictive_data}>
          {predictiveData.map((data) => (
            <p key={data.id}>{`${data.category}: ${data.value}`}</p>
          ))}
        </div>
      </div> */}

      {/* Recent Success Stories Section */}
      {/* <div className={styles.sectionContainer}>
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
      </div> */}

      {/* Testimonials Section */}
      {/* <div className={styles.sectionContainer}>
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
      </div> */}

      {/* Inventory Section */}
      <div className={styles.sectionContainer}>
        <h3 className={styles.sectionTitle}>
          <Icon path={mdiPackage} size={1} />
          Inventory
        </h3>

        {/* Real-time Quantity */}
        <div className={styles.inventorySection}>
          <h4 className={styles.inventoryTitle}>
            <Icon path={mdiPackage} size={0.8} /> Real-time Quantity
          </h4>
          <ul className={styles.inventoryList}>
            {inventory.map((item) => (
              <li key={item.id} className={styles.inventoryItem}>
                <span className={styles.foodType}>{item.foodType}</span>:{" "}
                <span className={styles.quantity}>{item.quantity}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Food Changes Section */}
        <div className={styles.foodChanges}>
          <h4 className={styles.inventoryTitle}>
            <Icon path={mdiPackage} size={0.8} /> Food Changes
          </h4>
          <ul className={styles.foodChangesList}>
            {foodChanges.map((change) => (
              <li key={change.id} className={styles.foodChangeItem}>
                <p className={styles.foodChange}>
                  <span className={styles.foodType}>{change.foodType}</span>{" "}
                  <span className={styles.change}>{change.change}</span>
                  <span className={styles.arrow}>➔</span>
                  <span className={styles.timestamp}>{change.timestamp}</span>
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Sensor Data Section */}
      <div className={styles.sectionContainer}>
        <h3>
          <Icon path={mdiThermometer} size={1} />
          Sensor Data
        </h3>
        <p>{`Temperature: ${
          sensorData.temperature ? sensorData.temperature + " °C" : "N/A"
        }`}</p>
        <p>{`Humidity: ${
          sensorData.humidity ? sensorData.humidity : "N/A"
        }`}</p>

        {/* Container 1 */}
        <div className={styles.sensorData}>
          <h4>Gas Levels Container 1</h4>
          <p>{`Gas Levels (O2): ${sensorData.o2_1 + " ppm"}`}</p>
          <p>{`Gas Levels (CO2): ${sensorData.co2_1 + " ppm"}`}</p>
        </div>

        {/* Container 2 */}
        <div className={styles.sensorData}>
          <h4>Gas Levels Container 2</h4>
          <p>{`Gas Levels (O2): ${sensorData.o2_1 + " ppm"}`}</p>
          <p>{`Gas Levels (CO2): ${sensorData.co2_1 + " ppm"}`}</p>
        </div>
      </div>

      {/* Community Exchange Section */}
      {/* <div className={styles.sectionContainer}>
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
      </div> */}

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
    </div>
  );
}

export default Dashboard;
