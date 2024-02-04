import React, { useState } from "react";
import styles from "../styles/blocks.module.css";
import conImg from "../assets/food_container.png";

function FoodSelection() {
  const [selectedContainer, setSelectedContainer] = useState(null);
  const [selectedFoodIndex, setSelectedFoodIndex] = useState(null);
  const [isFoodItemModalOpen, setFoodItemModalOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const foodItems = [
    { id: 1, name: "Apple" },
    { id: 2, name: "Banana" },
  ];

  const [containerData, setContainerData] = useState([
    {
      id: 1,
      imageSrc: conImg,
      containerNumber: 1,
      containerText: "Container 1",
    },
    {
      id: 2,
      imageSrc: conImg,
      containerNumber: 2,
      containerText: "Container 2",
    },
    {
      id: 3,
      imageSrc: conImg,
      containerNumber: 3,
      containerText: "Container 3",
    },
  ]);

  const handleContainerClick = (containerID) => {
    setSelectedContainer(containerID);
    setSelectedFoodIndex(null); // Reset selected food index
    setFoodItemModalOpen(true); // Open the food item list modal
    console.log("Food item modal open:", isFoodItemModalOpen);
  };

  const handleFoodItemClick = (foodIndex) => {
    setSelectedFoodIndex(foodIndex);
  };

  const handleConfirmClick = () => {
    console.log("Confirm button clicked");
    // Close the modal
    setFoodItemModalOpen(false);

    // Check if a container and food item are selected
    if (selectedContainer !== null && selectedFoodIndex !== null) {
      console.log("Selected Container:", selectedContainer);
      console.log("Selected Food Item:", foodItems[selectedFoodIndex]);

      // Create a copy of the container data
      const updatedContainerData = [...containerData];

      // Update the text of the selected container
      updatedContainerData.forEach((container) => {
        if (container.id === selectedContainer) {
          container.containerText = `Container ${container.containerNumber} contains ${foodItems[selectedFoodIndex].name}`;
        }
      });

      // Update the container data state
      setContainerData(updatedContainerData);

      // Show an alert
      setFoodItemModalOpen(false);
      setShowAlert(true);
    } else {
      console.log("No container or food item selected");
      // Alert if no container or food item is selected
      alert("Please select a container and a food item before confirming.");
    }
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <div className={styles.foodSelectionContainer}>
      <h2 className={styles.foodSelectionTitle}>Food Container Selection</h2>

      {/* Container List */}
      <div className={styles.containerList}>
        {containerData.map((container) => (
          <div
            key={container.id}
            className={`${styles.container} ${
              selectedContainer === container.id && styles.selectedContainer
            }`}
            onClick={() => handleContainerClick(container.id)}
          >
            <div className={styles.imgSection}>
              <img
                src={container.imageSrc}
                alt={`Container ${container.containerNumber}`}
                className={styles.containerImage}
              />
              <p>{container.containerText}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Food item list modal */}
      {isFoodItemModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3>Available Food Items:</h3>
            <ul>
              {foodItems.map((foodItem, index) => (
                <li
                  key={foodItem.id}
                  className={`${styles.foodItem} ${
                    selectedFoodIndex === index && styles.selectedFoodItem
                  }`}
                  onClick={() => handleFoodItemClick(index)}
                >
                  {foodItem.name}
                </li>
              ))}
            </ul>
            <button
              className={styles.confirmButton}
              onClick={handleConfirmClick}
            >
              Confirm
            </button>
          </div>
        </div>
      )}

      {/* Styled alert box */}
      {showAlert && (
        <div className={styles.alertOverlay} onClick={handleCloseAlert}>
          <div
            className={styles.alertContent}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className={styles.alertTitle}>Selection Confirmed!</h3>
            <p className={styles.alertMessage}>
              Selected {foodItems[selectedFoodIndex].name} for Container{" "}
              {selectedContainer}
            </p>
            <button className={styles.alertButton} onClick={handleCloseAlert}>
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default FoodSelection;
