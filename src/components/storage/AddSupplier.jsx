import styles from "./AddSupplier.module.css";

import LoaderWheel from "../LoaderWheel.jsx";
import { memo, useContext, useReducer } from "react";
import { UserContext } from "../../context/GlobalUserProvider.jsx";
import { PhoneInput } from "react-international-phone";
import { post } from "../../util/api.js";
import { environment } from "../../environments/environment.js";
import { useNavigate } from "react-router-dom";
import { useError } from "../../context/ErrorContext.jsx";

const initialState = {
  loading: false,
  activeInput: "",
  supplier: "",
  email: "",
  contactName: "",
  phoneNumber: "",
  address: "",
  category: "",
  vat_number: "1098749853583475834",
  hasError: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, loading: action.payload };
    case "input/onFocus":
      return { ...state, activeInput: action.payload };
    case "supplier/added":
      return { ...state, supplier: action.payload };
    case "email/added":
      return { ...state, email: action.payload };
    case "contact/added":
      return { ...state, contactName: action.payload };
    case "phone/added":
      return { ...state, phoneNumber: action.payload };
    case "address/added":
      return { ...state, address: action.payload };
    case "category/added":
      return { ...state, category: action.payload };
    case "error/set":
      return { ...state, hasError: action.payload };
    default:
      throw new Error("Unknown action type");
  }
}

function AddSupplier({ onFinish, active }) {
  const { user } = useContext(UserContext);
  const { error, errorHandler } = useError();
  const [
    {
      loading,
      activeInput,
      supplier,
      email,
      contactName,
      phoneNumber,
      address,
      category,
      vat_number,
      hasError,
    },
    dispatch,
  ] = useReducer(reducer, initialState);
  function setReducerState(e) {
    const type = e.target.name;
    const payload = e.target.value;
    return dispatch({ type, payload });
  }

  function fieldInfo(e) {
    errorHandler();
    dispatch({ type: "input/onFocus", payload: e.target.name });
  }

  function errorCLear() {
    dispatch({ type: "error/set", payload: false });
  }

  async function onSubmitHandler(e) {
    e.preventDefault();
    dispatch({ type: "error/set", payload: false });

    const data = {
      name: supplier,
      vat_number,
      address,
      phone_number: phoneNumber,
      email,
      contact_name: contactName,
      category_name: category,
    };

    const result = await post(environment.add_supplier, data);
    if (result.isError) {
      errorHandler(result.isError);
      dispatch({ type: "error/set", payload: true });
    } else {
      onFinish(active);
    }
    // console.log(result);
  }
  return (
    <>
      <h2 className={styles.dashHeading}>Add Suppliers</h2>

      <section className={styles.board}>
        {hasError && (
          <div className={styles.error}>
            <button className={styles.errorBtn} onClick={errorCLear}>
              <ion-icon name="close-sharp"></ion-icon>
            </button>
            {/* {Object.values(error.errors).map((e, i) => (
              <h2 key={i} className={styles.errorMessage}>
                {e}
              </h2>
            ))} */}
            <h2 className={styles.errorMessage}>{error.title}</h2>
          </div>
        )}
        {/* <BoardHeader /> */}
        {loading && <LoaderWheel />}

        <section className={styles.section}>
          <form className={styles.form}>
            {/* NAME */}
            <label className={styles.label}>
              Supplier&apos;s name
              <input
                className={styles.input}
                type="text"
                name={"supplier/added"}
                value={supplier}
                onChange={setReducerState}
                onFocus={fieldInfo}
              />
            </label>

            {/* EMAIL */}
            <label className={styles.label}>
              Email
              <input
                className={styles.input}
                type="email"
                name={"email/added"}
                value={email}
                onChange={setReducerState}
                onFocus={fieldInfo}
              />
            </label>

            {/* CONTACT NAME */}
            <label className={styles.label}>
              Contact name
              <input
                className={styles.input}
                type="text"
                name={"contact/added"}
                value={contactName}
                onChange={setReducerState}
                onFocus={fieldInfo}
              />
            </label>

            {/* PHONE */}
            <label className={styles.label}>
              Phone number
              <div
                className={styles.inputField}
                onFocus={() =>
                  dispatch({ type: "input/onFocus", payload: "phone/added" })
                }
              >
                <PhoneInput
                  required
                  defaultCountry="bg"
                  inputStyle={{
                    border: "none",
                    borderRadius: "10px",
                    fontSize: "1.6rem",
                  }}
                  buttonStyle={false}
                  id="phone/input"
                  value={phoneNumber}
                  onChange={(phone) =>
                    dispatch({ type: "phone/added", payload: phone })
                  }
                />
              </div>
            </label>

            {/* ADDRESS */}
            <label className={styles.label}>
              Address
              <input
                className={styles.input}
                type="text"
                name={"address/added"}
                value={address}
                onChange={setReducerState}
                onFocus={fieldInfo}
              />
            </label>

            {/* CATEGORY */}
            <label className={styles.label}>
              Category
              <input
                list="parts"
                className={styles.input}
                type="text"
                name={"category/added"}
                value={category}
                onChange={setReducerState}
                onFocus={fieldInfo}
              />
              <datalist id="parts">
                <option value="Frames" />
                <option value="Wheels" />
                <option value="Accessories" />
              </datalist>
            </label>
          </form>

          <div className={styles.infoBlock}>
            {/* {activeInput === "supplier/added" && (
              <p>{suppliersInfo.supplier}</p>
            )}
            {activeInput === "email/added" && <p>Supplier email</p>} */}
            <div className={styles.infoContainer}>
              <p className={styles.info}>
                Add needed information for the supplier
              </p>
              <p className={styles.info}>
                Providing a detailed information will be helpful for selecting
                the correct parts
              </p>
              <img
                src="https://images.unsplash.com/photo-1487113991643-86bfb4c9de2d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
              />
            </div>

            <button className={styles.btnAdd} onClick={onSubmitHandler}>
              Add provider
            </button>
          </div>
        </section>
      </section>
    </>
  );
}
export default memo(AddSupplier);
