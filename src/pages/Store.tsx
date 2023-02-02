import { Container, Row, Col } from "react-bootstrap";
import StoreItemDb from "../data/db.json";
import StoreItem from "../components/StoreItem";

const Store = () => {
  return (
    <>
      <Container className="mt-4">
        <Row xs={1} md={2} lg={3}  className="g-3">
          {StoreItemDb.map((item) => (
            <Col key={item.id}>
              <StoreItem item={{ ...item }} />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Store;
