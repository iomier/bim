import React from "react";
export const getInitialState = () => {
  if (typeof window !== "undefined") {
    return {
      name: window.localStorage.getItem("name"),
      lastName: window.localStorage.getItem("lastName"),
    };
  }
  return { name: "", lastName: "" };
};
export function authReducer(state, action) {
  console.log(state, action, "34");
  switch (action.type) {
    case "name": {
      return { ...state, name: action.payload };
    }
    case "lastName": {
      return { ...state, lastName: action.payload };
    }
    case "user": {
      return { ...state, ...action.payload };
    }
  }
}
const AuthContext = React.createContext();
export default AuthContext;
