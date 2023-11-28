import { useDispatch, useSelector } from "react-redux";
import styles from "./CartButton.module.css";
import { cartSliceActions } from "../../store/cart-slice";

const CartButton = (props) => {
  const dispatchAction = useDispatch();
  const itemsQty = useSelector((state) => state.product.itemsQty);

  const isShownCartHandler = () => {
    dispatchAction(cartSliceActions.showOrHideCart());
  };
  return (
    <button onClick={isShownCartHandler} className={styles.button}>
      <span>Корзина</span>
      <span className={styles.badge}>{itemsQty}</span>
    </button>
  );
};

export default CartButton;
