import { useDispatch, useSelector } from "react-redux";
import Card from "../UI/Card";
import styles from "./ProductItem.module.css";
import { productSliceActions } from "../../store/products-slice";

const ProductItem = (props) => {
  const { id, title, price, description } = props;

  // const products = useSelector((state)=> state.product)

  const dispatchAction = useDispatch();

  const addProductHandler = () => {
    // const updatedItemsQuantity = products.itemsQty + 1

    // const updatedItems = products.items.slice()
    // const existingItem = updatedItems.find((item)=>item.id ===id)

    // if(existingItem){
    //   const updatedExistingItem = {...existingItem}
    //   updatedExistingItem.quantity++
    //   updatedExistingItem.totalPrice = updatedExistingItem.totalPrice + price

    //   const existingItemIndex = updatedItems.findIndex((item)=>item.id ===id)
    //   updatedItems[existingItemIndex] = updatedExistingItem
    // } else {
    //   updatedItems.push({
    //     id: id,
    //     price: price,
    //     quantity: 1,
    //     totalPrice: price ,
    //     title: title
    //   })
    // }
    // const updatedCart = {
    //   itemsQty: updatedItemsQuantity,
    //   items: updatedItems
    // }

    // dispatchFunc(productSliceActions.updateCart(updatedCart))

    dispatchAction(
      productSliceActions.addItem({ id: id, title: title, price: price })
    );
  };

  return (
    <li className={styles.item}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={styles.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={styles.actions}>
          <button onClick={addProductHandler}>Добавить в Корзину</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
