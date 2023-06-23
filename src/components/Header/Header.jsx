import React from "react";
import styles from "./Header.module.css";
import Button from "../Button/Button";
import { useTelegram } from "../../hooks/useTelegram";

const Header = () => {
    const {user, onClose, onToggleButton } = useTelegram();
  

  return (
    <div className={styles.header}>
      <Button onClick={onClose}>Закрити</Button>
      <Button onClick={onToggleButton}>toggle</Button>
      <span className={styles.username}>{user?.username}</span>
    </div>
  );
};

export default Header;
