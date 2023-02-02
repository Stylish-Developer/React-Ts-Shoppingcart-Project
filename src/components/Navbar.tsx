import {
  Navbar as NavbarBS,
  Container,
  Nav,
  Button,
  Image,
} from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useShoppingCart } from "../context/ShoppingContext";

const Navbar = () => {
  const { openCart, cartQuantity } = useShoppingCart();
  return (
    <>
      <NavbarBS sticky="top" className="bg-black p-2 " expand="lg">
        <Container>
          <NavbarBS.Brand as={NavLink} to="/" className="text-light">
            shoppingCart
          </NavbarBS.Brand>
          <NavbarBS.Toggle
            aria-controls="basic-navbar-nav"
            className="bg-white"
          />
          <NavbarBS.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto me-2">
              <Nav.Link as={NavLink} to="/" className="text-light">
                Home
              </Nav.Link>
              <Nav.Link as={NavLink} to="/store" className="text-light">
                Store
              </Nav.Link>
              <Nav.Link as={NavLink} to="/about" className="text-light">
                About
              </Nav.Link>
            </Nav>
            <Button
              variant="primary"
              className="rounded-circle  d-flex justify-content-center align-items-center"
              onClick={openCart}
              style={{
                height: "48px",
                width: "48px",
                position: "relative",
              }}
            >
              <Image src="cart.png" height={20} width={20} />
              <div
                className="btn btn-danger d-flex justify-content-center align-items-center rounded-circle"
                style={{
                  position: "absolute",
                  bottom: 0,
                  right: -10,
                  top: 28,
                  height: "24px",
                  width: "24px",
                }}
              >
                {cartQuantity}
              </div>
            </Button>
          </NavbarBS.Collapse>
        </Container>
      </NavbarBS>
    </>
  );
};

export default Navbar;
