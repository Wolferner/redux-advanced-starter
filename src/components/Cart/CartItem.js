import { useDispatch } from "react-redux";
import styles from "./CartItem.module.css";
import { productSliceActions } from "../../store/products-slice";

const CartItem = (props) => {
  const { id, title, quantity, total, price } = props.item;

  const dispatchAction = useDispatch();
  // const quanity = useSelector(state = state.product.quanity)

  const increseItemHandler = () => {
    dispatchAction(
      productSliceActions.addItem({ title: title, price: price, id: id })
    );
  };

  const decreseItemHandler = () => {
    dispatchAction(productSliceActions.deleteItem(id));
  };

  return (
    <li className={styles.item}>
      <header>
        <h3>{title}</h3>
        <div className={styles.price}>
          ${total.toFixed(2)}{" "}
          <span className={styles["item-price"]}>
            (${price.toFixed(2)} / шт.)
          </span>
        </div>
      </header>
      <div className={styles.details}>
        <div className={styles.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={styles.actions}>
          <button onClick={decreseItemHandler}>-</button>
          <button onClick={increseItemHandler}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
