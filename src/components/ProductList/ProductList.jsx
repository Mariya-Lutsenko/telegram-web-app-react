import React from "react";
import styles from "./ProductList.module.css";
import ProductItem from "../ProductItem/ProductItem";
import { useState, useCallback, useEffect } from "react";
import { useTelegram } from "../../hooks/useTelegram";

const products = [
  {id: '1', title: 'Джинсb', price: 1000, description: 'Синього кольору, прямі'},
  {id: '2', title: 'Куртка', price: 3500, description: 'Зеленого кольору, демісезонна'},
  {id: '3', title: 'Сукня', price: 1300, description: 'Червоного кольору'},
  {id: '4', title: 'Рубашка', price: 800, description: 'Зеленого кольору, у клітинку'},
  {id: '5', title: 'Спідниця', price: 1200, description: 'Синього кольору, пряма'},
  {id: '6', title: 'Брюки', price: 600, description: 'Чорного кольору'},
  {id: '7', title: 'Світшот', price: 1900, description: 'Персикового кольору, із зображенням '},
  {id: '8', title: 'Футболка', price: 400, description: 'Зеленого кольору, патріотична'},
];

const getTotalPrice = (items = []) => {
  return items.reduce((acc, item) => {
      return acc += item.price
  }, 0)
}

const ProductList = () => {
  const [addedItems, setAddedItems] = useState([]);
  const { tg, queryId } = useTelegram();

  const onAdd = (product) => {
    const alreadyAdded = addedItems.find((item) => item.id === product.id);
    let newItems = [];

    if (alreadyAdded) {
      newItems = addedItems.filter((item) => item.id !== product.id);
    } else {
      newItems = [...addedItems, product];
    }
    setAddedItems(newItems);

    if (newItems.length === 0) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
      tg.MainButton.setParams({
        text: `Купити ${getTotalPrice(newItems)} грн`
    })
    }
  };

  return (
    <div className={styles.list}>
      {products.map((item) => (
        <ProductItem product={item} onAdd={onAdd} />
      ))}
    </div>
  );
};

export default ProductList;
