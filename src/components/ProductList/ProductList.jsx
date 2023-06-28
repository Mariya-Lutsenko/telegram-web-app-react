import React from "react";
import styles from "./ProductList.module.css";
import ProductItem from "../ProductItem/ProductItem";
import { useState, useCallback, useEffect } from "react";
import { useTelegram } from "../../hooks/useTelegram";

const products = [
  {
    id: "1",
    imgUrl: "https://content2.rozetka.com.ua/goods/images/big/310731329.jpg",
    title: "Джинси",
    price: 1000,
    description: "Синього кольору, прямі",
  },
  {
    id: "2",
    imgUrl: "https://images.prom.ua/3333059863_w640_h640_zhenskaya-kurtka-zelyonaya.jpg",
    title: "Куртка",
    price: 3500,
    description: "Зеленого кольору, демісезонна",
  },
  {
    id: "3",
    imgUrl: "https://pektoral.biz/image/cache/catalog/sukni/img_4478-600x750.jpg",
    title: "Сукня",
    price: 1300,
    description: "Червоного кольору",
  },
  {
    id: "4",
    imgUrl: "https://6gnomiv.com.ua/wp-content/uploads/2022/07/182504.1200x0.jpg",
    title: "Рубашка",
    price: 800,
    description: "Зеленого кольору, у клітинку",
  },
  {
    id: "5",
    imgUrl: "https://content2.rozetka.com.ua/goods/images/big/336361272.jpg",
    title: "Спідниця",
    price: 1200,
    description: "Синього кольору, пряма",
  },
  {
    id: "6",
    imgUrl: "https://media2.vsisvoi.ua/uploads/catalog/products/2022/04/01/374045/gallery/96856cc55e9bc88000551d9e6d3041b2.jpg",
    title: "Брюки",
    price: 600,
    description: "Чорного кольору",
  },
  {
    id: "7",
    imgUrl: "https://content.rozetka.com.ua/goods/images/big/222994805.jpg",
    title: "Світшот",
    price: 1900,
    description: "Персикового кольору, із зображенням ",
  },
  {
    id: "8",
    imgUrl: "https://images.prom.ua/3958552104_w640_h640_futbolka-zhenskaya-patrioticheskaya.jpg",
    title: "Футболка",
    price: 400,
    description: "Зеленого кольору, патріотична",
  },
];

const getTotalPrice = (items = []) => {
  return items.reduce((acc, item) => {
    return (acc += item.price);
  }, 0);
};

const ProductList = () => {
  const [addedItems, setAddedItems] = useState([]);
  const { tg, queryId } = useTelegram();

  const onSendData = useCallback(() => {
    const data = {
      products: addedItems,
      totalPrice: getTotalPrice(addedItems),
      queryId,
    };
    fetch("https://telegram-web-app-node.onrender.com/web-data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    tg.sendData(JSON.stringify(data));
  }, [addedItems]);

  useEffect(() => {
    tg.onEvent("mainButtonClicked", onSendData);
    return () => {
      tg.offEvent("mainButtonClicked", onSendData);
    };
  }, [onSendData]);

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
        text: `Купити ${getTotalPrice(newItems)} грн`,
      });
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
