const itemName = "userData";

export const EMAIL_REGEX =
  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

export const PASS_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/;

export function getUserData() {
  return JSON.parse(localStorage.getItem(itemName));
}
// export function getOrderData(userId) {
//   const result = [];
//   const filtered = Object.entries(localStorage).filter(
//     (k) => k.at(0).split("_#_").at(0) == userId
//   );
//   filtered.forEach((x) => result.push(x));
//   console.log(result);

//   return result;
// }

export function getOrderData() {
  return JSON.parse(localStorage.getItem("order"));
}

export function getStockData() {
  return JSON.parse(localStorage.getItem("stockBikeSelection"));
}

export function setUserData(data) {
  return localStorage.setItem(itemName, JSON.stringify(data));
}
export function setOrderData(orderName, data) {
  return localStorage.setItem(orderName, JSON.stringify(data));
}
export function setStockBike(data) {
  return localStorage.setItem("stockBikeSelection", JSON.stringify(data));
}

export function clearUserData() {
  localStorage.removeItem(itemName);
}

export function clearOrderData() {
  localStorage.removeItem("order");
}

export function clearStockData() {
  localStorage.removeItem("stockBikeSelection");
}

export function secondsToTime(time) {
  const h = Math.floor(time / 3600)
      .toString()
      .padStart(2, "0"),
    m = Math.floor((time % 3600) / 60)
      .toString()
      .padStart(2, "0"),
    s = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");

  let result;

  if (time === 0) {
    result;
  } else if (time < 60) {
    result = " seconds.";
  } else if (time < 3600) {
    result = " minutes.";
  } else if (time < 86400) {
    result = " hours.";
  } else if (time < 2620800) {
    result = " days.";
  } else if (time < 31449600) {
    result = " months.";
  }

  return h + ":" + m + ":" + s + result;
}
