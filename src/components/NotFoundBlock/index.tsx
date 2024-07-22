import { FC } from "react";
import styles from "./styles.module.scss";

const NotFoundBlock: FC = () => {
  return (
    <div className={styles.root}>
      <h1>
        <span>😕</span>
        <br />
        Ничего не найдено
      </h1>
      <p className={styles.description}>
        К сожалению такой страницы не сущетсвует
      </p>
    </div>
  );
};

export default NotFoundBlock;
