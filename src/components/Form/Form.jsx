import React from "react";
import styles from "./Form.module.css";
import { useState, useEffect, useCallback } from "react";
import { useTelegram } from "../../hooks/useTelegram";

const Form = () => {
  const [surname, setSurname] = useState("");
  const [name, setName] = useState("");
  const [individual, setIndividual] = useState("physical");
  const [message, setMessage] = useState("");
  const [tel, setTel]=useState("");
  const { tg } = useTelegram();

  const onSendData = useCallback(() => {
    const data = {
      surname,
      name,
      tel,
      individual,
      message
    };
    tg.sendData(JSON.stringify(data));
  }, [surname, name, tel, individual, message]);

  useEffect(() => {
    tg.onEvent("mainButtonClicked", onSendData);
    return () => {
      tg.offEvent("mainButtonClicked", onSendData);
    };
  }, [onSendData]);

  useEffect(() => {
    tg.MainButton.setParams({
      text: "Надіслати дані",
    });
  }, []);

  useEffect(() => {
    if (!surname || !name || !tel) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
    }
  }, [surname, name, tel]);

  const onChangeSurname = (event) => {
    setSurname(event.target.value);
  };

  const onChangeName = (event) => {
    setName(event.target.value);
  };

  const onChangeTel = (event) => {
    setTel(event.target.value);
  };

  const onChangeIndividual = (event) => {
    setIndividual(event.target.value);
  };

  const onChangeMessage = (event) => {
    setMessage(event.target.value);
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
        <input
        className={styles.input}
        type="tel"
        placeholder={"+380000000"}
        value={name}
        onChange={onChangeTel}
      />
      <select
        value={individual}
        onChange={onChangeIndividual}
        className={styles.select}
      >
        <option value={"physical"}>Фізична особа</option>
        <option value={"legal"}>Юридична особа</option>
      </select>
  
      <textarea className={styles.textarea} value={message} onChange={onChangeMessage}   placeholder={"Введіть повідомлення"}  name="message" rows="8"></textarea>
    

    </div>
  );
};

export default Form;
