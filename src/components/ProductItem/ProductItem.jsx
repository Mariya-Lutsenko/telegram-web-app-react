import React from "react";
import styles from "./ProductItem.module.css";
import Button from "../Button/Button";

const ProductItem = ({ product, onAdd }) => {
  const onAddHandler = () => {
    onAdd(product);
  };
  return (
    <div className={styles.product}>
      <div className={styles.img}>
        <img src={product.imgUrl}/>
      </div>
      <div className={styles.title}>{product.title}</div>
      <div className={styles.description}>{product.description}</div>
      <div className={styles.price}>
        <span>
          Вартість: <b>{product.price} грн</b>
        </span>
      </div>
      <Button className={styles.addBtn} onClick={onAddHandler}>
        Додати у корзину
      </Button>
    </div>
  );
};

export default ProductItem;
