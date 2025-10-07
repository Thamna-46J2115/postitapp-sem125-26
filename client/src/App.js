import "./App.css";
import Header from "./Components/Header";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Footer from "./Components/Footer";
import Profile from "./Components/Profile";
import Register from "./Components/Register";
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container, Row, Col } from "reactstrap"; //import the Reactstrap Components

const App = () => {
  return (
    <Container fluid>
      <Router>
        <Row>
          <Header />
        </Row>

        <Row className="main">
          <Routes>
            <Route path="/" element={<Home />}></Route>

            <Route path="/login" element={<Login />}></Route>

            <Route path="/profile" element={<Profile />}></Route>

            <Route path="/register" element={<Register />}></Route>
          </Routes>
        </Row>

        <Row>
          <Footer />
        </Row>
      </Router>
    </Container>
  );
};
export default App;
