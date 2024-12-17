import { createContext, useState, useEffect, useContext } from "react";

const BASE_URL = "http://localhost:8000";

const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [currentCity, setCurrentCity] = useState({});
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${BASE_URL}/cities`);
        const data = await response.json();
        setCities(data);
      } catch {
        alert("There was an error loading data ...");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCities();
  }, []);

  // to get a selectd city

  const getCity = async (cityId) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${BASE_URL}/cities/${cityId}`);
      const data = await response.json();
      setCurrentCity(data);
      console.log(data);
    } catch {
      alert("There was an error loading data ...");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CitiesContext.Provider value={{ cities, isLoading, currentCity, getCity }}>
      {children}
    </CitiesContext.Provider>
  );
}

const useCities = () => {
  const context = useContext(CitiesContext);
  return context;
};

export { CitiesProvider, useCities };
