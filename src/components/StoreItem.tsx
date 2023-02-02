import { Card, Button } from "react-bootstrap";
import { CurrencyFormat } from "../utilities/CurrencyFormat";
import { useShoppingCart } from "./../context/ShoppingContext";

type Props = {
  item: {
    id: number;
    name: string;
    price: number;
    imgUrl: string;
  };
};

const StoreItem = (props: Props) => {
  const { id, name, price, imgUrl } = props.item;
  const { getItemQty, increaseItemQty, decreaseItemQty, removeCartItem } =
    useShoppingCart();

  const quantity = getItemQty(id);

  return (
    <>
      <Card style={{ width: "18rem" }} className="m-auto h-100">
        <Card.Img
          variant="top"
          src={imgUrl}
          style={{ height: "200px", objectFit: "cover" }}
        />
        <Card.Body>
          <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
            <span className="fs-5">{name}</span>
            <span className="ms-2 text-muted">{CurrencyFormat(price)}</span>
          </Card.Title>
          <div className="mt-auto">
            {quantity === 0 ? (
              <Button onClick={() => increaseItemQty(id)}>+ Add to cart</Button>
            ) : (
              <div
                className="d-flex flex-column justify-content-center align-items-start "
                style={{ gap: 8 }}
              >
                <div
                  className="d-flex justify-content-center align-items-center "
                  style={{ gap: 8 }}
                >
                  <Button onClick={() => increaseItemQty(id)}>+</Button>
                  <div>
                    <span className="fs-3">{quantity}</span>
                    <span>in cart</span>
                  </div>
                  <Button onClick={() => decreaseItemQty(id)}>-</Button>
                </div>
                <div>
                  <Button onClick={() => removeCartItem(id)} variant="danger">
                    remove
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default StoreItem;
