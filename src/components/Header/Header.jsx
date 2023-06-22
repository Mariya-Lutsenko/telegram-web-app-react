import React from "react";
import styles from "./Header.module.css";
import Button from "../Button/Button";

const Header = (props) => {
    const tg = window.Telegram.WebApp;

    const onClose = () => {
        tg.close();
      };

  return (
    <div className={styles.header}>
      <Button onClick={onClose}>Закрити</Button>
      <span className={styles.username}>{tg.initDataUnsafe?.user?.username}</span>
    </div>
  );
};

export default Header;
