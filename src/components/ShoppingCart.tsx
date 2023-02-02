import Offcanvas from "react-bootstrap/Offcanvas";
import { useShoppingCart } from "./../context/ShoppingContext";
import { Stack } from "react-bootstrap";
import CartItem from "./CartItem";
import { CurrencyFormat } from "../utilities/CurrencyFormat";
import StoreItemDb from "../data/db.json";

type Props = {
  isOpen: boolean;
};

const ShoppingCart = ({ isOpen }: Props) => {
  const { closeCart, cartItems } = useShoppingCart();
  return (
    <>
      <Offcanvas show={isOpen} onHide={closeCart} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Stack gap={3}>
            {cartItems.map((item) => {
              return <CartItem key={item.id} {...item} />;
            })}
            <div className="ms-auto fw-bold fs-5">
              Total{" "}
              {CurrencyFormat(
                cartItems.reduce((total, cartItem) => {
                  const item = StoreItemDb.find((i) => i.id === cartItem.id);
                  return total + (item?.price || 0) * cartItem.quantity;
                }, 0)
              )}
            </div>
          </Stack>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default ShoppingCart;
