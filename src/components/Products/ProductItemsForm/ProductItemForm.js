import { useRef } from 'react';
import Input from './../../../UI/Input/Input';
import styles from "./ProductItemForm.module.css";
import Button from '../../../UI/Button/Button';

const ProductItemForm = (props) => {
  const inputRef = useRef();
  const submitHandler = (event)=> {
    event.preventDefault();
    const item = {
      id: props.id,
      // @ts-ignore
      name: props.name, amount: +inputRef.current.value, price: props.price
    }
    props.onItemAdd(item)
  }

    return (
      <form className={styles.form} onSubmit={submitHandler}>
        <Input
          ref={inputRef}
          // @ts-ignore
          label={"Amount"}
          input={{
            id: "amount_"+props.id,
            type: "number",
            min: "1",
            max: "5",
            step: "1",
            defaultValue: "1",
          }}
        />
        <Button isButtonActive={true} type="button" onClick={submitHandler}> +Add</Button>
      </form>
    );
}

export default ProductItemForm;