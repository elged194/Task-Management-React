import { createContext, useReducer } from "react";

const ThemeContexttt = createContext();

const initialData = {
  mode:
    localStorage.getItem("theme") === null
      ? "Light"
      : localStorage.getItem("theme") === "Light"
      ? "Light"
      : "Dark",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_MODE":
      return { ...state, mode: action.new_Value };

    default:
      return state;
  }
};

export function DarkMode({ children }) {
  // useReducer
  const [firstState, dispatch] = useReducer(reducer, initialData);

  const ChangMode = (new_mode) => {
    localStorage.setItem("theme", new_mode);
    dispatch({ type: "CHANGE_MODE", new_Value: new_mode });
  };

  return (
    <ThemeContexttt.Provider value={{ ...firstState, ChangMode }}>
      {children}
    </ThemeContexttt.Provider>
  );
}

export default ThemeContexttt;
