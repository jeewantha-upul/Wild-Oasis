import { createContext, useEffect, useContext, useReducer } from "react";

const BASE_URL = "http://localhost:8000";

const CitiesContext = createContext();

const initialState = {
  currentCity: {},
  cities: [],
  isLoading: false,
  isError: "",
};
const reducer = (state, action) => {
  switch (action.type) {
    case "isLoading":
      return {
        ...state,
        isLoading: true,
      };
    case "error":
      return {
        ...state,
        isLoading: false,
        isError: action.payload,
      };
    case "city/selected":
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
      };
    case "city/added":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };
    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };
    case "cities/loaded":
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };
    default:
      throw new Error("Not defined Action Type");
  }
};

function CitiesProvider({ children }) {
  // const [currentCity, setCurrentCity] = useState({});
  // const [cities, setCities] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  const [{ currentCity, cities, isLoading }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    const fetchCities = async () => {
      dispatch({ type: "isLoading" });
      try {
        const response = await fetch(`${BASE_URL}/cities`);
        const data = await response.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch {
        dispatch({
          type: "error",
          payload: "There was an error loading data ...",
        });
      }
    };

    fetchCities();
  }, []);

  // to get a selectd city

  const getCity = async (cityId) => {
    dispatch({ type: "isLoading" });
    try {
      const response = await fetch(`${BASE_URL}/cities/${cityId}`);
      const data = await response.json();
      dispatch({ type: "city/selected", payload: data });
    } catch {
      dispatch({
        type: "error",
        payload: "There was an error loading data ...",
      });
    }
  };

  // posting a city to API
  const createCity = async (newCity) => {
    dispatch({ type: "isLoading" });
    try {
      const response = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "content-type": "application/json",
        },
      });
      // eslint-disable-next-line no-unused-vars
      const data = await response.json();

      // a wildcard to show the added city in citylist
      dispatch({ type: "city/added", payload: newCity });
    } catch {
      dispatch({
        type: "error",
        payload: "There was an error posting data ...",
      });
    }
  };

  // deleting a city to API
  const deleteCity = async (id) => {
    dispatch({ type: "isLoading" });
    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });

      // a wildcard to show the remaining city list
      dispatch({ type: "city/deleted", payload: id });
    } catch {
      dispatch({
        type: "error",
        payload: "There was an error deleting data ...",
      });
    }
  };

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

const useCities = () => {
  const context = useContext(CitiesContext);
  return context;
};

export { CitiesProvider, useCities };
