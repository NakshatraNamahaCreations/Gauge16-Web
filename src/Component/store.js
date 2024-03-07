import { act } from "react-dom/test-utils";
import { createStore } from "redux";

const initialState = {
  Name: "",
  img: "",
};

export const setLoginData = (Name, img) => ({
  type: "SET_LOGIN_DATA",
  payload: {
    Name,
    img,
  },
});

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_LOGIN_DATA":
      console.log(state);
      return {
        ...state,
        Name: action.payload.Name,
        img: action.payload.img,
      };
    case "UPDATE_CATEGORY_DATA":
      return {
        ...state,
        category: action.payload,
      };
    default:
      return state;
  }
};

const store = createStore(loginReducer);

// Retrieve login data from localStorage if available
const savedLoginData = localStorage.getItem("loginData");
const initialLoginData = savedLoginData ? JSON.parse(savedLoginData) : {};

// Dispatch the initial login data to the store
store.dispatch(setLoginData(initialLoginData.Name, initialLoginData.img));

store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem(
    "loginData",
    JSON.stringify({
      Name: state.Name,
      img: initialLoginData.img, // Retrieve password from initialLoginData
    })
  );
});

export default store;
