import styles from "./ReadyOrder.module.css";

import { useState } from "react";

import { formatCurrency } from "../../../util/resolvers.js";
import Popup from "../../Popup.jsx";

function ReadyOrder({ order, payed, error, message, clearError }) {
  const [background, setBackground] = useState(false);

  function close(e) {
    setBackground(false);
  }
  return (
    <>
      {background && (
        <Popup onClose={close}>
          <div className={styles.fullImg}>
            <img src="https://yuchormanski.free.bg/bikes/bike-1.webp" alt="" />
          </div>
        </Popup>
      )}
      {error && (
        <Popup onClose={() => clearError({})}>
          <div className={styles.errorContainer}>
            <h3>{message}</h3>
          </div>
        </Popup>
      )}

      <div className={styles.box}>
        <div className={styles.additional}>
          <p>
            <span>Order ID: </span>
            {order.orderId}
          </p>
          <p>
            <span>Order date </span>
            {order.orderDateStart.replaceAll("/", ".")}
          </p>
          <p>
            <span>SN# </span>
            {order.serialNumber}
          </p>
        </div>
        <section className={styles.section}>
          <div className={styles.itemInfo}>
            <div className={styles.info}>
              <p className={styles.content}>
                <span>Frame:</span>
                {order.parts.at(0).name}
              </p>
              <p className={styles.content}>
                <span>Wheels:</span>
                {order.parts.at(1).name}
              </p>
              <p className={styles.content}>
                <span>Accessory:</span>
                {order.parts.at(2).name}
              </p>
            </div>
            <div className={styles.action}>
              <p className={styles.content}>
                <span>Total:</span>
                {formatCurrency(order.amount)}
              </p>
              <p className={styles.content}>
                <span>Paid:</span>
                {formatCurrency(order.paidAmount)}
              </p>
              <button
                className={styles.btn}
                onClick={() => payed(order.orderId, order.unpaidAmount)}
              >
                <span>rest:</span>
                {formatCurrency(order.unpaidAmount)}
              </button>
            </div>
          </div>
          <div className={styles.imageHolder}>
            <img
              onClick={() => setBackground(true)}
              className={styles.img}
              src="https://yuchormanski.free.bg/bikes/bike-1.webp"
              alt="Image on user's ordered bike"
            />
          </div>
        </section>
      </div>
    </>
  );
}

export default ReadyOrder;
