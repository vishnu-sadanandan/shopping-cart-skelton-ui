import { Input } from "@nextui-org/react";
import React, { useCallback, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
} from "@nextui-org/react";
import useHttp from "../../hooks/use-http";
import useInput from "../../hooks/use-input";
import { useSelector } from "react-redux";
import CartItemsTotal from "../Cart/CartItemsTotal";
const apiUrl =
  "https://react-http-a675e-default-rtdb.firebaseio.com/order.json";

const CheckoutPage = () => {
  const [
    name,
    isNameInputInvalid,
    resetNameInput,
    NameInputUI,
    isEnteredNameValid,
    onNameChangeHandler,
    onNameBlurHandler,
  ] = useInput("", "", "name", "Enter Name", "text", ["isEmpty"]);
  const [
    address,
    isAddressInputInvalid,
    resetAddressInput,
    AddressInputUI,
    isEnteredAddressValid,
    onAddressChangeHandler,
    onAddressBlurHandler,
  ] = useInput("", "", "address", "Enter Address", "text", ["isEmpty"]);
  const { isLoading, error, sendHttpRequest: requestOrder } = useHttp();
  const [orderResponse, setOrderResponse] = useState(null);

    const storeProducts = useSelector((state) => state);
    console.log(storeProducts)
  const onFormSubmit = (event) => {
    event.preventDefault();
    if (isFormValid && isEnteredNameValid && isEnteredAddressValid) {
      requestOrderHandler({ user: { name, address }, order: storeProducts });
      resetNameInput();
      resetAddressInput();
    }
    return;
  };

  const requestOrderHandler = useCallback(
    (payload) => {
      requestOrder(
        {
          url: apiUrl,
          method: "POST",
          body: payload,
        },
        (responseData) => {
          setOrderResponse(responseData);
        }
      );
    },
    [requestOrder]
  );
  const isFormValid = !isNameInputInvalid && !isAddressInputInvalid;

  return (
    <Modal
      isOpen={true}
      className="h-[540px] px-8 rounded-2xl flex justify-center items-center bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Modal Title
            </ModalHeader>
            <ModalBody>
              <form onSubmit={onFormSubmit}>
                <div className="space-y-4">
                  <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 ">
                    <CartItemsTotal />
                  </div>
                  <div
                    key={"bordered1"}
                    className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 "
                  >
                    <Input
                      type="email"
                      variant={"bordered"}
                      label="Email"
                      placeholder="Enter your email"
                      value={name}
                      onChange={onNameChangeHandler}
                      onBlur={onNameBlurHandler}
                    />
                  </div>

                  <div
                    key={"bordered2"}
                    className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
                  >
                    <Input
                      type="text"
                      variant={"bordered"}
                      label="Address"
                      placeholder="Enter your address"
                      value={address}
                      onChange={onAddressChangeHandler}
                      onBlur={onAddressBlurHandler}
                    />
                  </div>
                  <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                    {isLoading && <p>Your order is being requested ...</p>}
                    {orderResponse && (
                      <p>{`Your order has been submitted. Order Id: ${orderResponse.name}`}</p>
                    )}
                    {error && <p>{`Something went wrong!: ${error}`}</p>}
                    {!(isEnteredAddressValid && isEnteredNameValid) && (
                      <p>{`Please enter the details`}</p>
                    )}
                  </div>
                  <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                    <Button color="primary" variant="ghost">
                      Ghost
                    </Button>
                  </div>
                </div>
              </form>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default CheckoutPage;
