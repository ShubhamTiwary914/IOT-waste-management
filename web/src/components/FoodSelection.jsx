import React, { useState, useEffect } from "react";
import styles from "../styles/blocks.module.css";
import conImg from "../assets/food_container.png";
import Requests from "../connect/requests";

function FoodSelection() {
  const [selectedContainer, setSelectedContainer] = useState(null);
  const [selectedFoodIndex, setSelectedFoodIndex] = useState(null);
  const [isFoodItemModalOpen, setFoodItemModalOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [numberOfContainers, setNumberOfContainers] = useState(2);
  const [selectedItems, setSelectedItems] = useState([]);

  const foodItems = [
    { id: 1, name: "Apple" },
    { id: 2, name: "Banana" },
    { id: 3, name: "Potato" },
    { id: 4, name: "Guava" },
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
  ]);

  useEffect(() => {
    Requests.getItems((res) => {
      setSelectedItems(res);

      for(let i=0; i<containerData.length; i++){
        containerData[i].containerText = `Container - ${i+1} contains ${res[i]}`;
      } 
    });
  }, []);

  useEffect(() => {
    localStorage.setItem("selectedContainers", JSON.stringify(containerData));
    localStorage.setItem("selectedItems", JSON.stringify(selectedItems));
  }, [containerData, selectedItems]);

  const handleItemSelect = (newItem, index) => {
    let newSelected = selectedItems;
    newSelected[index] = newItem;
    setSelectedItems(newSelected);

    // Update the database with the new list of selected items
    Requests.setItems(
      {
        itemNames: selectedItems,
      },
      (res) => {
        console.log(res);
      }
    );
  };

  const handleNumberOfContainersChange = (e) => {
    const number = parseInt(e.target.value);
    setNumberOfContainers(number);

    // Generate container data based on the selected number of containers
    const newContainers = Array.from({ length: number }, (_, index) => ({
      id: index + 1,
      imageSrc: conImg,
      containerNumber: index + 1,
      containerText: `Container ${index + 1}`,
    }));
    setContainerData(newContainers);
  };

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

      // Update the database with the new list of selected items
      handleItemSelect(
        foodItems[selectedFoodIndex].name,
        selectedContainer - 1
      );

      // Retrieve the updated container data from the database
      Requests.getItems((res) => {
        console.log(res);
        // Update the container data state with the retrieved data
        //setContainerData(res.containerData);
        // setSelectedItems(res.selectedItems);
      });
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

      {/* Select Number of Containers */}
      <div className={styles.numberOfContainers}>
        <label htmlFor="numberOfContainers">Select Number of Containers:</label>
        <select
          id="numberOfContainers"
          value={numberOfContainers}
          onChange={handleNumberOfContainersChange}
        >
          {[1, 2, 3, 4, 5].map((number) => (
            <option key={number} value={number}>
              {number}
            </option>
          ))}
        </select>
      </div>

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
