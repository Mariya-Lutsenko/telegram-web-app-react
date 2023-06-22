import React from "react";
import styles from "./Header.module.css";
import Button from "../Button/Button";
import { useTelegram } from "../../hooks/useTelegram";

const Header = () => {
    const {user, onClose } = useTelegram();
  

  return (
    <div className={styles.header}>
      <Button onClick={onClose}>Закрити</Button>
      <span className={styles.username}>{user?.username}</span>
    </div>
  );
};

export default Header;
