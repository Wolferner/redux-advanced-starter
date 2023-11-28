import { useSelector } from "react-redux";
import Card from "../UI/Card";
import styles from "./Cart.module.css";
import CartItem from "./CartItem";

const Cart = (props) => {
  const cartItems = useSelector(state => state.product.items)

  return (
    <Card className={styles.cart}>
      <h2>Мои Покупки</h2>
      <ul>
        {cartItems.map(item =>
        <CartItem
          item={{ 
            id: item.id,
            key:item.id,
            title: item.title, 
            quantity: item.quanity, 
            total: item.totalPrice, 
            price: item.price }}
        />)}

      </ul>
    </Card>
  );
};

export default Cart;
