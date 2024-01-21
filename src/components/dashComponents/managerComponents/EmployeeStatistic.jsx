import styles from "./EmployeeStatistic.module.css";

import { useEffect, useState } from "react";

import BoardHeader from "../BoardHeader.jsx";
import LoaderWheel from "../../LoaderWheel.jsx";

import { get } from "../../../util/api.js";
import { environment } from "../../../environments/environment.js";

import { User } from "@phosphor-icons/react";

function ManagerStatistic() {
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [resultObject, setResultObject] = useState({});

  // State to hold user input
  const [startDate, setStartDate] = useState("2023-04-11");
  const [endDate, setEndDate] = useState(
    new Date().toLocaleDateString("en-CA")
  );

  // function getLastMonth() {
  //   let [year, month, day] = new Date().toLocaleDateString("en-CA").split("-");
  //   if (month === 1) {
  //     month = 12;
  //     year = year - 1;
  //   }
  //   console.log(`${year}-${month}-${day}`);
  //   return `${year}-${month - 1}-${day}`;
  // }

  useEffect(
    function () {
      setLoading(true);
      const abortController = new AbortController();

      async function getStatistics() {
        const queryString = `?startDate=${startDate}&endDate=${endDate}`;
        const result = await get(
          environment.employees_full_statistic + queryString
        );
        if (!result) {
          setLoading(false);
          return setError({
            message: "Something went wrong. Service can not get data!",
          });
        }

        console.log("hasResult");
        setResultObject(result);
        setLoading(false);
      }
      getStatistics();

      return () => abortController.abort();
    },
    [startDate, endDate]
  );

  //const{orderStatistics, partStatistics} = resultObject;

  // console.log(orderStatistics.totalIncome);
  // console.log(partStatistics.totalBestselerPartIncome);
  console.log(resultObject);

  return (
    <>
      <section className={styles.board}>
        {loading && <LoaderWheel />}
        <div className={styles.dateContainer}>
          <div className={styles.element}>
            <h2 className={styles.boardHeading}>Select time period:</h2>
            <section className={styles.section}>
              <form className={styles.form}>
                <label className={styles.label}>
                  Start Date:
                  <input
                    className={styles.input}
                    type="date"
                    value={startDate}
                    onChange={(e) =>
                      setStartDate(
                        new Date(e.target.value).toLocaleDateString("en-CA")
                      )
                    }
                  />
                </label>
                <label className={styles.label}>
                  End Date:
                  <input
                    className={styles.input}
                    type="date"
                    value={endDate}
                    onChange={(e) =>
                      setEndDate(
                        new Date(e.target.value).toLocaleDateString("en-CA")
                      )
                    }
                  />
                </label>
              </form>
            </section>
          </div>
          <aside className={styles.block}>
            <div>
              <h3 className={styles.infoHeading}>
                Summary employees statistics:
              </h3>
              <p className={styles.info}>
                <span>Total worked minutes:</span>
                {resultObject.employeeFullStatistics?.totalWorkedMinutes}
              </p>
              <br />
              <p className={styles.info}>
                <span>Total worked orders:</span>
                {resultObject.employeeFullStatistics?.totalWorkedOrders} Pcs.
              </p>
            </div>
            <div>
              <h3 className={styles.infoHeading}>
                Information about selecting date interval
              </h3>
              <ul className={styles.list}>
                <li>
                  On initial render will be displayed all available orders
                </li>
                <li>
                  If select start date will limit the interval between selected
                  date and today
                </li>
                <li>
                  When select start and end date will be displayed only orders,
                  created in selected time interval
                </li>
              </ul>
            </div>
          </aside>
        </div>
        <div>
          <h3 className={styles.infoHeading}>He is our proud:</h3>
          <figure className={styles.figure}>
            <div className={styles["imgHolder"]}>
              {resultObject.employeeFullStatistics?.bestWorkerWorkedImageUrl ? (
                <img
                  className={styles.tumbs}
                  src={resultObject.employeeFullStatistics?.bestWorkerWorkedImageUrl}
                  alt={`${resultObject.employeeFullStatistics?.bestWorkerName} image`}
                />
              ) : (
                <User
                  size={48}
                  color="#363636"
                  weight="thin"
                  className={styles.baseImg}
                />
              )}
            </div>

            <section className={styles.workerInfo}>
              <h2 className={styles.heading} >
                {resultObject.employeeFullStatistics?.bestWorkerName}
              </h2>
              <div className={styles.infoBox}>
                <p className={`${styles.info}`}>
                  <span>Department:</span>
                  {resultObject.employeeFullStatistics?.bestWorkerDepartment}
                </p>
                <p className={`${styles.info}`}>
                  <span>Position:</span>
                  {resultObject.employeeFullStatistics?.bestWorkerSubDepartment}
                </p>
                <p className={`${styles.info}`}>
                  <span>Orders:</span>
                  {resultObject.employeeFullStatistics?.bestWorkerWorkedOrders}
                </p>
                <p className={`${styles.info}`}>
                  <span>Minutes:</span>
                  {resultObject.employeeFullStatistics?.bestWorkerWorkedMinutes}
                </p>
              </div>
            </section>
          </figure>
        </div>
      </section>
      <>
        <section className={styles.board}>
          <div>
            <h3 className={styles.infoHeading}>
              He is the best at that time period:
            </h3>
            <figure className={styles.figure}>
              <div className={styles["imgHolder"]}>
                {resultObject.employeeFullStatistics?.bestWorkerWorkedImageUrl ? (
                  <img
                    className={styles.tumbs}
                    src={resultObject.employeeFullStatistics?.bestWorkerWorkedImageUrl}
                    alt={`${resultObject.employeeFullStatistics?.bestWorkerName} image`}
                  />
                ) : (
                  <User
                    size={48}
                    color="#363636"
                    weight="thin"
                    className={styles.baseImg}
                  />
                )}
              </div>
              <section className={styles.workerInfo}>
                <h2 className={styles.heading} >
                  {resultObject.employeePeriodStatistics?.bestWorkerName}
                </h2>
                <div className={styles.infoBox}>
                  <p className={`${styles.info}`}>
                    <span>Department:</span>
                    {resultObject.employeePeriodStatistics?.bestWorkerDepartment}
                  </p>
                  <p className={`${styles.info}`}>
                    <span>Position:</span>
                    {resultObject.employeePeriodStatistics?.bestWorkerSubDepartment}
                  </p>
                  <p className={`${styles.info}`}>
                    <span>Orders:</span>
                    {resultObject.employeePeriodStatistics?.bestWorkerWorkedOrders}
                  </p>
                  <p className={`${styles.info}`}>
                    <span>Minutes:</span>
                    {resultObject.employeePeriodStatistics?.bestWorkerWorkedMinutes}
                  </p>
                </div>
              </section>
            </figure>
          </div>
        </section>
      </>
    </>
  );
}

export default ManagerStatistic;
