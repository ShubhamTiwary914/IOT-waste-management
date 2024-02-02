import { useEffect } from "react";
import Requests from "./connect/requests";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Container, Navbar, Nav } from "react-bootstrap";
import styles from './App.module.css';

import Dashboard from "./components/Dashboard";
import Random from "./components/Random";

function App() {
  //test request made to backend
  useEffect(() => {
    Requests.httpGET({}, (res) => {
      console.log(res);
    });
  }, []);

  return (
    <div>
      <Container fluid>
        <Router>
          <Navbar className={styles.navbar}>
            <div className={styles.name}>
              <a href="/">Akatsuki</a>
            </div>
            <h3>Hyperlocal Food Sharing Network with Predictive Spoilage</h3>
          </Navbar>

          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </Container>
      {/* <Random /> */}
    </div>
  );
}

export default App;
