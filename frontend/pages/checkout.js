import React, { useContext, useState } from "react";

import { Row, Col } from "reactstrap";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import InjectedCheckoutForm from "../components/checkout/CheckoutForm";
import AppContext from "../context/AppContext";

import Cart from "../components/cart/";

function Checkout() {
  // get app context
  const appContext = useContext(AppContext);
  // isAuthenticated is passed to the cart component to display order button
  const { isAuthenticated } = appContext;

  // state to keep track of whether the order is successful
  const [orderSuccessful, setOrderSuccessful] = useState(false);

  // load stripe to inject into elements components
  const stripePromise = loadStripe("pk_test_51MZ0TNHT5VMyNIRfYIvSc3T0DSqm8edda1Ts5x8ee861U4wXpr8zkotCinnezsVddCta48I9rlVhbuK0oMjndFIF00r4p9FA00");

  // callback function to be triggered after a successful order
  const handleOrderSuccess = () => {
    setOrderSuccessful(true);
  };

  return (
    <Row>
      <Col style={{ paddingRight: 0 }} sm={{ size: 3, order: 1, offset: 2 }}>
        <h1 style={{ margin: 20 }}>Checkout</h1>
        <Cart isAuthenticated={isAuthenticated} />
      </Col>
      <Col style={{ paddingLeft: 5 }} sm={{ size: 6, order: 2 }}>
        {orderSuccessful ? (
          <div className="text-success">
            <h2>Order Placed Successfully!</h2>
          </div>
        ) : (
          <Elements stripe={stripePromise}>
            <InjectedCheckoutForm onOrderSuccess={handleOrderSuccess} />
          </Elements>
        )}
      </Col>
    </Row>
  );
  // }
}
export default Checkout;
