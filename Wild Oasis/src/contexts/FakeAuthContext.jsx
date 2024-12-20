import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "logIn":
      return {
        user: action.payload,
        isAuthenticated: true,
      };
    case "logOut":
      return {
        user: null,
        isAuthenticated: false,
      };
    default:
      throw new Error("Not Handled Action Type 😊");
  }
};

// this is used for only demo(fake)
const FAKE_USER = {
  name: "Jeewantha",
  email: "jeewantha@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

const FakeAuthProvider = ({ children }) => {
  const [{ isAuthenticated, user }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const logIn = (currentUser) => {
    if (
      currentUser.email === FAKE_USER.email &&
      currentUser.password === FAKE_USER.password
    ) {
      dispatch({ type: "logIn", payload: FAKE_USER });
    }
  };

  const logOut = () => {
    dispatch({ type: "logOut" });
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("Auth Context was used outside of the Provider ");
  return context;
};

export { FakeAuthProvider, useAuth };
