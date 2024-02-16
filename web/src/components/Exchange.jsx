import React from "react";
import styles from "../styles/blocks.module.css";

function Exchange() {
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

  return (
    <div>
      <h3>
        <Icon path={mdiAccountMultiple} size={1} />
        Community Exchange
      </h3>
      <h3>Available Matches</h3>
      <ul className={styles.availableMatches}>
        {availableMatches.map((match) => (
          <li key={match.id}>
            {`${match.business} is offering ${match.quantity} ${match.foodType}`}
            <button onClick={() => handleMatchSelection(match)}>Select</button>
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
  );
}

export default Exchange;
