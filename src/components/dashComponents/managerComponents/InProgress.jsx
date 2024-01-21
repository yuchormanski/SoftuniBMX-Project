import styles from "./InProgress.module.css";

import { useEffect, useState } from "react";

import { get } from "../../../util/api.js";
import { environment } from "../../../environments/environment.js";

import BoardHeader from "../BoardHeader.jsx";
import OrderInProgress from "./OrderInProgress.jsx";
import LoaderWheel from "../../LoaderWheel.jsx";
// import Popup from "./Popup.jsx";
import OrderFullElement from "./OrderFullElement.jsx";
import Popup from "../../Popup.jsx";

function InProgress() {
  const [orderList, setOrderList] = useState([]);
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(true);
  const [background, setBackground] = useState(false);
  const [currentOrder, setCurrentOrder] = useState({});

  useEffect(function () {
    setLoading(true);
    const abortController = new AbortController();

    async function getInProgressOrders() {
      const result = await get(environment.in_progress_orders);
      if (!result) {
        setLoading(false);
        return setError({
          message: "Something went wrong. Service can not get data!",
        });
      }
      const sortedResult = result.sort((a, b) => a.dateCreated - b.dateCreated);
      setOrderList(sortedResult);
      setLoading(false);
    }
    getInProgressOrders();

    return () => abortController.abort();
  }, []);

  function onOrderButtonClick(o) {
    setCurrentOrder(o);
    setBackground(true);
  }

  function close(e) {
    setCurrentOrder({});
    setBackground(false);
  }

  // if (orderList.length === 0)
  //   return <h2>There is no orders in this category</h2>;

  return (
    <>
      {background && (
        <Popup onClose={close}>
          <OrderFullElement order={currentOrder} />
        </Popup>
      )}
      <h2 className={styles.dashHeading}>
        Orders in sequence by time of creation
      </h2>
      <section className={styles.board}>
        <BoardHeader />

        {orderList.length === 0 && (
          <h2 style={{ margin: "3rem 0 0 0" }}>
            There is no orders in this category
          </h2>
        )}
        <div className={styles.ordersContainer}>
          <div className={styles.orders}>
            {loading && <LoaderWheel />}
            {orderList &&
              orderList.map((order, i) => (
                <OrderInProgress
                  key={order.orderId}
                  order={order}
                  i={i + 1}
                  onOrderButtonClick={onOrderButtonClick}
                />
              ))}
          </div>
          <aside className={styles.ordersAside}>
            <h3 className={styles.element}>Element information</h3>
            <div className={styles.listInfo}>
              <p className={styles.listItem}>
                <span
                  className={styles.listIcon}
                  style={{ color: "rgb(4, 164, 175)" }}
                >
                  <ion-icon name="hourglass-outline"></ion-icon>
                </span>
                <span className={styles.listItemText}>
                  - The order is accepted and awaiting approval
                </span>
              </p>

              <p className={styles.listItem}>
                <span
                  className={styles.listIcon}
                  style={{ color: "rgb(246, 152, 0)" }}
                >
                  <ion-icon name="hammer-outline"></ion-icon>
                </span>
                <span className={styles.listItemText}>
                  - The order is in production
                </span>
              </p>

              <p className={styles.listItem}>
                <span
                  className={styles.listIcon}
                  style={{
                    color: "green",
                    fontWeight: 700,
                    fontSize: "2rem",
                  }}
                >
                  &#10004;
                </span>
                <span className={styles.listItemText}>
                  - The order is in Quality control
                </span>
              </p>
              <p className={styles.listItem}>
                <span className={styles.listIcon} style={{ color: "red" }}>
                  <ion-icon name="hammer-outline"></ion-icon>
                </span>
                <span className={styles.listItemText}>
                  - The order was returned by Quality control for re-build
                </span>
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

export default InProgress;
