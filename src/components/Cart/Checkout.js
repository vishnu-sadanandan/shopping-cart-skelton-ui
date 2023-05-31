import React, { useContext, useCallback, useState } from "react";
import useInput from "../../hooks/use-input";
import styles from "./Checkout.module.css"
import useHttp from "../../hooks/use-http";
import CartContext from "../../store/cart-context";

const apiUrl = "https://react-http-a675e-default-rtdb.firebaseio.com/order.json";

const Checkout = () => {
  const [name, isNameInputInvalid, resetNameInput, NameInputUI, isEnteredNameValid] =
    useInput("", "", "name", "Enter Name", "text", ["isEmpty"]);
  const [address, isAddressInputInvalid, resetAddressInput, AddressInputUI, isEnteredAddressValid] =
    useInput("", "", "address", "Enter Address", "text", ["isEmpty"]);
  const { isLoading, error, sendHttpRequest: requestOrder } = useHttp();
  const [orderResponse, setOrderResponse] = useState(null);

  const useCartContext = useContext(CartContext);

  const onFormSubmit = (event) => {
    event.preventDefault();
    if (isFormValid && isEnteredNameValid && isEnteredAddressValid) {
      requestOrderHandler({ user: { name, address }, order: useCartContext.items });
      resetNameInput();
      resetAddressInput();
    }
    return
  };

  const requestOrderHandler = useCallback((payload) => {
    requestOrder(
      {
        url: apiUrl,
        method: "POST",
        body: payload
      },
      (responseData) => { setOrderResponse(responseData) }
    );
  }, [requestOrder]);

  const isFormValid = !isNameInputInvalid && !isAddressInputInvalid;
  const formControlClass = styles["form-control"];
  const formControlInValidClass = styles["invalid"];

  const formNameValidClass = isNameInputInvalid
    ? `${formControlClass} ${formControlInValidClass}`
    : `${formControlClass} `;
  const formAddressValidClass = isAddressInputInvalid
    ? `${formControlClass} ${formControlInValidClass}`
    : `${formControlClass}`;

  return (
    <>
      <form onSubmit={onFormSubmit}>
        <div className={formNameValidClass}>{NameInputUI}</div>
        <div className={formAddressValidClass}>{AddressInputUI}</div>
        {isLoading && <p>Your order is being requested ...</p>}
        {orderResponse && <p>{`Your order has been submitted. Order Id: ${orderResponse.name}`}</p>}
        {error && <p>{`Something went wrong!: ${error}`}</p>}
        {!(isEnteredAddressValid && isEnteredNameValid) && <p>{`Please enter the details`}</p>}
        <div className="form-actions">
          {/* Add logic for button enable disable */}
          {isFormValid && <button>Checkout</button>}
        </div>
      </form>
    </>
  );
};

export default Checkout;
