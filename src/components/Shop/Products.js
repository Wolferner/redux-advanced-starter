import ProductItem from "./ProductItem";
import styles from "./Products.module.css";

const ITEMS = [
  {
    id: 1,
    price: 7,
    description:
      "Благодаря своему высокому качеству, этот товар прослужит вам очень долго",
    title: "Супер-Товар",
  },
  {
    id: 2,
    price: 9,
    description:
      "Благодаря своему высокому качеству, этот товар прослужит вам очень долго",
    title: "Супер-Товар",
  },
  {
    id: 3,
    price: 2,
    description:
      "Благодаря своему высокому качеству, этот товар прослужит вам очень долго",
    title: "Супер-Товар",
  },
];

const Products = (props) => {
  return (
    <section className={styles.products}>
      <h2>В нашем магазине товары самого высокого качества</h2>
      <ul>
        {ITEMS.map((item) => (
          <ProductItem
            key={item.id}
            id={item.id}
            title={item.title}
            price={item.price}
            description={item.description}
          />
        ))}
      </ul>
    </section>
  );
};

export default Products;
