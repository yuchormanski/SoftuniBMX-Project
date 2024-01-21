import styles from "./UserTrackOrder.module.css";

import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../../context/GlobalUserProvider.jsx";

import LoaderWheel from "../../LoaderWheel.jsx";
import BoardHeader from "../BoardHeader.jsx";
import UserOrderItem from "./UserOrderItem.jsx";

import OrderInProgress from "../managerComponents/OrderInProgress.jsx";
import { post } from "../../../util/api.js";
import { environment } from "../../../environments/environment.js";
import OrderFullElement from "../managerComponents/OrderFullElement.jsx";
import Popup from "../../Popup.jsx";

function UserTrackOrder() {
  const { user } = useContext(UserContext);
  const [orderList, setOrderList] = useState([]);
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(true);
  const [background, setBackground] = useState(false);
  const [currentOrder, setCurrentOrder] = useState({});

  useEffect(
    function () {
      setLoading(true);
      const abortController = new AbortController();

      async function getInProgressOrders() {
        const result = await post(environment.orders_in_progress + user.id);
        if (!result) {
          setLoading(false);
          return setError({
            message: "Something went wrong. Service can not get data!",
          });
        }
        setOrderList(result);
        setLoading(false);
      }
      getInProgressOrders();

      return () => abortController.abort();
    },
    [user.id]
  );

  // function onOrderButtonClick(o) {
  //   setCurrentOrder(o);
  //   setBackground(true);
  // }

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
        <div className={styles.ordersContainer}>
          {orderList.length > 0 && (
            <div className={styles.orders}>
              {loading && <LoaderWheel />}
              {orderList.map((order, i) => (
                <OrderInProgress key={order.orderId} order={order} i={i} />
              ))}
            </div>
          )}
          {orderList.length === 0 && (
            <h2 className={styles.empty}>
              Your have no active orders at this moment
            </h2>
          )}
          <aside className={styles.ordersAside}>
            <h3 className={styles.element}>Icon information</h3>
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
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

export default UserTrackOrder;
