import { Stack, Button } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingContext";
import StoreItemDb from "../data/db.json";
import { CurrencyFormat } from "../utilities/CurrencyFormat";

type Props = {
  id: number;
  quantity: number;
};

const CartItem = ({ id, quantity }: Props) => {
  const { removeCartItem } = useShoppingCart();

  const item = StoreItemDb.find((i) => i.id === id);
  if (item == null) return null;

  return (
    <>
      <Stack
        direction="horizontal"
        gap={2}
        className="d-flex align-items-center"
      >
        <img
          src={item.imgUrl}
          style={{ width: "125px", height: "75px", objectFit: "cover" }}
        />
        <div className="me-auto">
          <div>
            {item.name}{" "}
            {quantity > 1 && (
              <span className="text-muted" style={{ fontSize: ".65rem" }}>
                x{quantity}
              </span>
            )}
          </div>
          <div className="text-muted" style={{ fontSize: ".75rem" }}>
            {CurrencyFormat(item.price)}
          </div>
        </div>
        <div> {CurrencyFormat(item.price * quantity)}</div>
        <Button
          variant="outline-danger"
          size="sm"
          onClick={() => removeCartItem(item.id)}
        >
          &times;
        </Button>
      </Stack>
    </>
  );
};

export default CartItem;
