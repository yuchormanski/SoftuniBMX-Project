import styles from "./UserProfile.module.css";

import Navigation from "./navigationsComponents/Navigation.jsx";
import Footer from "./Footer.jsx";
// import {  useContext, useState } from "react";
import { UserContext } from "../context/GlobalUserProvider.jsx";
import UserDash from "./dashComponents/userComponents/UserDash.jsx";

function UserProfile() {
  // const { user } = useContext(UserContext);

  return (
    <div className={styles.componentBody}>
      <Navigation />
      <div className={styles.spacer}></div>
      <div className={styles.container}>
        <UserDash />
      </div>
      <Footer />
    </div>
  );
}

export default UserProfile;
