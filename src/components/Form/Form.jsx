import React from "react";
import styles from "./Form.module.css";
import { useState, useEffect } from "react";
import { useTelegram } from "../../hooks/useTelegram";

const Form = () => {
  const [surname, setSurname] = useState("");
  const [name, setName] = useState("");
  const [individual, setIndividual] = useState("children");
  const { tg } = useTelegram();

  useEffect(() => {
    tg.MainButton.setParams({
      text: "Надіслати дані",
    });
  }, []);

  useEffect(() => {
    if(!surname || !name) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
    }
  }, [surname, name]);

  const onChangeSurname = (event) => {
    setSurname(event.target.value);
  };

  const onChangeName = (event) => {
    setName(event.target.value);
  };

  const onChangeIndividual = (event) => {
    setIndividual(event.target.value);
  };

  return (
    <div className={styles.form}>
      <h3>Введіть ваші дані</h3>
      <input
        className={styles.input}
        type="text"
        placeholder={"Прізвище"}
        value={surname}
        onChange={onChangeSurname}
      />
      <input
        className={styles.input}
        type="text"
        placeholder={"Ім'я"}
        value={name}
        onChange={onChangeName}
      />
      <select
        value={individual}
        onChange={onChangeIndividual}
        className={styles.select}
      >
        <option value={"children"}>Учень</option>
        <option value={"teacher"}>Вчитель</option>
        <option value={"parents"}>Батьки</option>
      </select>
    </div>
  );
};

export default Form;
