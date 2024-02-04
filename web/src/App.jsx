import { useEffect } from "react";
import Requests from "./connect/requests";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Container, Navbar, Nav } from "react-bootstrap";
import styles from "./App.module.css";
import logo from "./assets/akatsuki.png";

import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";
import Random from "./components/Random";

function App() {
  return (
    <div>
      <Container fluid>
        <Router>
          <Navbar className={styles.navbar}>
            <div className={styles.name}>
              <img src={logo} className={styles.logo} />
              <a href="/">Akatsuki</a>
            </div>
            <div className={styles.title}>
              <h3>Hyperlocal Food Sharing Network with Predictive Spoilage</h3>
            </div>
            <div className={styles.navbarlist}>
              <ul>
                <li>
                  <Nav.Link href="/">Dashboard</Nav.Link>
                </li>
                <li>
                  <Nav.Link href="/profile">Profile</Nav.Link>
                </li>
              </ul>
            </div>
          </Navbar>

          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </Container>
      <Random />
    </div>
  );
}

export default App;
