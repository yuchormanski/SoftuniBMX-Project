import styles from "./QControlOrderItem.module.css";

import { useEffect, useReducer, useRef, useState } from "react";
import LoaderWheel from "../../LoaderWheel.jsx";
import { timeResolver } from "../../../util/resolvers.js";
import { del, post } from "../../../util/api.js";
import { environment } from "../../../environments/environment.js";
import { v4 as uuidv4 } from "uuid"; //unique ID
import { onDeleteHandler } from "../managerComponents/managerActions/orderActions.js";

const initialState = {
  loading: false,
  frameCheck: false,
  wheelCheck: false,
  accessoryCheck: false,
  textFrame: "",
  textWheel: "",
  textAccessory: "",
  btnText: "",
  status: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, loading: action.payload };
    case "frameIsCheck":
      return { ...state, frameCheck: action.payload };
    case "wheelIsCheck":
      return { ...state, wheelCheck: action.payload };
    case "accessoryIsCheck":
      return { ...state, accessoryCheck: action.payload };
    case "textFrame":
      return { ...state, textFrame: action.payload };
    case "textWheel":
      return { ...state, textWheel: action.payload };
    case "textAccessory":
      return { ...state, textAccessory: action.payload };
    case "setBtnText":
      return { ...state, btnText: action.payload };
    case "reset/All":
      return {
        ...state,
        frameCheck: false,
        textFrame: "",
        wheelCheck: false,
        textWheel: "",
        accessoryCheck: false,
        textAccessory: "",
      };

    default:
      throw new Error("Unknown action type");
  }
}

function QControlOrderItem({ product, onReBuild }) {
  const [
    {
      loading,
      frameCheck,
      wheelCheck,
      accessoryCheck,
      textFrame,
      textWheel,
      textAccessory,
      btnText,
      status,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const ref = useRef([]);

  const Unchecked = () => {
    // console.log(ref.current.length);
    for (let i = 0; i < ref.current.length; i++) {
      ref.current[i].checked = false;
    }
  };

  useEffect(() => {
    if (frameCheck && wheelCheck && accessoryCheck) {
      dispatch({ type: "setBtnText", payload: "Pass control" });
    } else if (frameCheck || wheelCheck || accessoryCheck) {
      dispatch({ type: "setBtnText", payload: "Rebuild" });
    } else if (!frameCheck || !wheelCheck || !accessoryCheck) {
      dispatch({ type: "setBtnText", payload: "Scrap" });
    }
  }, [accessoryCheck, frameCheck, wheelCheck]);

  // const finalResult = { ...product };

  // const ref = useRef([]);

  // const Unchecked = () => {
  //   // console.log(ref.current.length);
  //   for (let i = 0; i < ref.current.length; i++) {
  //     ref.current[i].checked = false;
  //   }
  // };

  useEffect(() => {
    if (frameCheck && wheelCheck && accessoryCheck) {
      dispatch({ type: "setBtnText", payload: "Pass control" });
    } else if (frameCheck || wheelCheck || accessoryCheck) {
      dispatch({ type: "setBtnText", payload: "Rebuild" });
    } else if (!frameCheck || !wheelCheck || !accessoryCheck) {
      dispatch({ type: "setBtnText", payload: "Scrap" });
    }
  }, [accessoryCheck, frameCheck, wheelCheck]);

  function checkboxHandler(e) {
    dispatch({ type: e.target.name, payload: e.target.checked });
  }

  function textHandler(e) {
    if (e.target.name === "frameText") {
      dispatch({ type: "textFrame", payload: e.target.value });
    } else if (e.target.name === "wheelText") {
      dispatch({ type: "textWheel", payload: e.target.value });
    } else if (e.target.name === "accessoryText") {
      dispatch({ type: "textAccessory", payload: e.target.value });
    }
  }

  async function onControl() {
    const finalResult = { ...product };
    // let result = {};
    const valuesCheck = { frameCheck, wheelCheck, accessoryCheck };
    finalResult.orderStates[0].isProduced = frameCheck;
    finalResult.orderStates[0].description = textFrame;
    finalResult.orderStates[1].isProduced = wheelCheck;
    finalResult.orderStates[1].description = textWheel;
    finalResult.orderStates[2].isProduced = accessoryCheck;
    finalResult.orderStates[2].description = textAccessory;

    // IF no explanation when is not pass element
    if (
      (!frameCheck && !textFrame) ||
      (!wheelCheck && !textWheel) ||
      (!accessoryCheck && !textAccessory)
    )
      return window.alert("You must add reason to scrap it!");

    // IF PASS
    if (Object.values(valuesCheck).every((x) => x === true)) {
      // result = await post(environment.pass_qControl + Number(product.orderId));
      await post(environment.pass_qControl + product.orderId);
    }
    // IF NOT PASS
    else if (Object.values(valuesCheck).every((x) => x === false)) {
      // result = await onDeleteHandler(product.orderId);
      await onDeleteHandler(product.orderId);
    }
    // IF PARTIALLY PASS
    else {
      // console.log(finalResult);
      // result = await post(environment.return_qControl, finalResult);
      await post(environment.return_qControl, finalResult);
    }

    onReBuild();
    dispatch({ type: "reset/All" });
    Unchecked();
  }

  return (
    <>
      {loading && <LoaderWheel />}
      <figure className={styles.order}>
        <header className={styles.header}>
          <p className={styles.model}>
            <span className={styles.headerSpan}>ID: </span>
            {product.orderId}
          </p>
          <p className={styles.model}>
            <span className={styles.headerSpan}>SN: </span>
            {product.serialNumber || `BMX-XXX-XXX-XX${product.orderId}`}
          </p>
          <p className={styles.model}>
            <span className={styles.headerSpan}>Date created: </span>
            {product.dateCreated.replaceAll("/", ".")}
          </p>
        </header>

        <section className={styles.partInfo}>
          <h4 className={styles.type}>Frame</h4>
          <div className={styles.part}>
            <p>
              <span className={styles.label}>Brand:</span>
              {product.orderStates[0].partType}
            </p>
            <p>
              <span className={styles.label}>Model:</span>
              {product.orderStates[0].partModel}
            </p>
            <p>
              <span className={styles.label}>SN:</span>
              {product.orderStates[0].serialNumber}
            </p>
            <p>
              <span className={styles.label}>Employee:</span>
              {product.orderStates[0].nameOfEmplоyeeProducedThePart}
            </p>
            <p>
              <span className={styles.label}>Time elapsed:</span>
              {product.orderStates[0].elementProduceTimeInMinutes} minutes
            </p>
          </div>
          <div className={styles.textContainer}>
            <textarea
              className={styles.textarea}
              name={"frameText"}
              onChange={textHandler}
              rows={2}
              value={textFrame}
            ></textarea>
            <input
              className={styles.checkbox}
              type="checkbox"
              name="frameIsCheck"
              value={frameCheck}
              onChange={checkboxHandler}
              ref={(element) => {
                ref.current[0] = element;
              }}
            />
          </div>
        </section>

        <section className={styles.partInfo}>
          <h4 className={styles.type}>Wheel</h4>
          <div className={styles.part}>
            <p>
              <span className={styles.label}>Brand:</span>
              {product.orderStates[1].partType}
            </p>
            <p>
              <span className={styles.label}>Model:</span>
              {product.orderStates[1].partModel}
            </p>
            <p>
              <span className={styles.label}>SN:</span>
              {product.orderStates[1].serialNumber}
            </p>
            <p>
              <span className={styles.label}>Employee:</span>
              {product.orderStates[1].nameOfEmplоyeeProducedThePart}
            </p>
            <p>
              <span className={styles.label}>Time elapsed:</span>
              {product.orderStates[1].elementProduceTimeInMinutes} minutes
            </p>
          </div>
          <div className={styles.textContainer}>
            <textarea
              className={styles.textarea}
              name={"wheelText"}
              onChange={textHandler}
              rows={2}
              value={textWheel}
            ></textarea>
            <input
              className={styles.checkbox}
              type="checkbox"
              name="wheelIsCheck"
              value={wheelCheck}
              onChange={checkboxHandler}
              ref={(element) => {
                ref.current[1] = element;
              }}
            />
          </div>
        </section>

        <section className={styles.partInfo}>
          <h4 className={styles.type}>Accessory</h4>
          <div className={styles.part}>
            <p>
              <span className={styles.label}>Brand:</span>
              {product.orderStates[2].partType}
            </p>
            <p>
              <span className={styles.label}>Model:</span>
              {product.orderStates[2].partModel}
            </p>
            <p>
              <span className={styles.label}>SN:</span>
              {product.orderStates[2].serialNumber}
            </p>
            <p>
              <span className={styles.label}>Employee:</span>
              {product.orderStates[2].nameOfEmplоyeeProducedThePart}
            </p>
            <p>
              <span className={styles.label}>Time elapsed:</span>
              {product.orderStates[2].elementProduceTimeInMinutes} minutes
            </p>
          </div>
          <div className={styles.textContainer}>
            <textarea
              className={styles.textarea}
              name={"accessoryText"}
              onChange={textHandler}
              rows={2}
              value={textAccessory}
            ></textarea>
            <input
              className={styles.checkbox}
              type="checkbox"
              name="accessoryIsCheck"
              value={accessoryCheck}
              onChange={checkboxHandler}
              ref={(element) => {
                ref.current[2] = element;
              }}
            />
          </div>
        </section>

        <div className={styles.infoBlock}>
          <p className={styles.qControlInfo}></p>
          <button
            className={`${styles.btn} ${styles.final}`}
            onClick={onControl}
          >
            {btnText}
          </button>
        </div>
      </figure>
    </>
  );
}

export default QControlOrderItem;
