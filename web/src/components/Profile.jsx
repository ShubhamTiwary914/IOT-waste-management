import React, { useState } from "react";
import styles from "../styles/blocks.module.css";
import FoodSelection from "./FoodSelection";

function Profile() {
  const [changePassword, setChangePassword] = useState(false);

  const handlePasswordChangeClick = () => {
    setChangePassword(true);
  };

  return (
    <div className={styles.profileContainer}>
      {/* User Information */}
      <div className={styles.profileSection}>
        <h2>User Information</h2>
        <p>Name: John Doe</p>
        <p>Email: john.doe@example.com</p>
      </div>

      {/* Change Password */}
      {changePassword ? (
        <div className={styles.profileSection}>
          <h2>Change Password</h2>
          {/* Form for changing the password */}
          {/* Old Password */}
          <label htmlFor="oldPassword">Old Password:</label>
          <input type="password" id="oldPassword" name="oldPassword" />

          {/* New Password */}
          <label htmlFor="newPassword">New Password:</label>
          <input type="password" id="newPassword" name="newPassword" />

          {/* Confirm New Password */}
          <label htmlFor="confirmNewPassword">Confirm New Password:</label>
          <input
            type="password"
            id="confirmNewPassword"
            name="confirmNewPassword"
          />

          {/* Button to submit password change */}
          <button>Change Password</button>
        </div>
      ) : (
        <div className={styles.profileSection}>
          <button onClick={handlePasswordChangeClick}>Change Password</button>
        </div>
      )}

      {/* Address Information */}
      <div className={styles.profileSection}>
        <h2>Address Information</h2>
        <p>Address: 123 Main St, Cityville</p>
        <p>Country: Countryland</p>
      </div>

      <FoodSelection />
    </div>
  );
}

export default Profile;
