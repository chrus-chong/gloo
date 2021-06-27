import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import CheckoutSteps from "../components/CheckoutSteps";
import { createOrder } from "../actions/orderActions";

const PlaceOrderScreen = ({ history }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  // calculate prices
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );

  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100);
  cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)));
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);
  // cart.paymentMethod = true

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  useEffect(() => {
    if (success) {
      history.push(`order/${order._id}`);
    }
  }, [history, success]);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  return (
    <>
      {cart.cartItems.length === 0 ? (
        <Message variant="danger">
          Order does not exist. <a href="/">Go back.</a>
        </Message>
      ) : (
        <>
          <CheckoutSteps step1 step2 step3 step4 />
          <Row>
            <Col md={8}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>Shipping</h2>
                  <p data-testid="order-address">
                    <strong>Address:</strong>{" "}
                    <span data-testid="order-address">
                      {cart.shippingAddress.address},{" "}
                      {cart.shippingAddress.city},{" "}
                      {cart.shippingAddress.postalCode},{" "}
                      {cart.shippingAddress.country}
                    </span>
                  </p>
                </ListGroup.Item>

                <ListGroup.Item>
                  <h2>Payment Method</h2>
                  <strong>Method: </strong>
                  <span data-testid="order-paymentmethod">
                    {cart.paymentMethod}
                  </span>
                </ListGroup.Item>

                <ListGroup.Item>
                  <h2>Order Items</h2>
                  {cart.cartItems.length === 0 ? (
                    <Message data-testid="order-message">
                      Your cart is empty
                    </Message>
                  ) : (
                    <ListGroup variant="flush">
                      {cart.cartItems.map((item, index) => (
                        <ListGroup.Item key={index}>
                          <Row>
                            <Col md={1}>
                              <Image
                                data-testid="order-image"
                                src={item.image}
                                alt={item.name}
                                fluid
                                rounded
                              />
                            </Col>
                            <Col>
                              <Link
                                data-testid="order-name"
                                to={`/product/${cart.product}`}
                              >
                                {item.name}
                              </Link>
                            </Col>
                            <Col md={2}></Col>
                            <Col md={2}>
                              {/* {item.qty} x ${item.price} = ${item.qty * item.price} */}
                              ${item.price}
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>

            <Col md={4}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h2>Order Summary</h2>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Items</Col>
                      <Col data-testid="order-products-price">
                        ${cart.itemsPrice}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Shipping</Col>
                      <Col data-testid="order-shipping-price">
                        ${cart.shippingPrice}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Tax</Col>
                      <Col data-testid="order-tax-price">${cart.taxPrice}</Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Total</Col>
                      <Col data-testid="order-total-price">
                        ${cart.totalPrice}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {error && (
                    <ListGroup.Item>
                      <Message data-testid="order-message" variant="danger">
                        {error}
                      </Message>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Button
                      data-testid="order-submit-btn"
                      type="button"
                      size="lg"
                      disabled={cart.cartItems === 0}
                      onClick={placeOrderHandler}
                      block
                    >
                      Place Order
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default PlaceOrderScreen;
