// --> import React bootstrap here
import "bootstrap/dist/css/bootstrap.min.css";

// --> import pages here
import Home from "./pages/Home";
import Store from "./pages/Store";
import About from "./pages/About";

// --> import react-router & react-bootstrap here
import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Navbar from "./components/Navbar";
import { ShoppingCartProvider } from "./context/ShoppingContext";

const App = () => {
  return (
    <ShoppingCartProvider>
      <Navbar />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<Store />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Container>
    </ShoppingCartProvider>
  );
};

export default App;
