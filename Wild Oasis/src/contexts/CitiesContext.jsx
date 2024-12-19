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

  // posting a city to API
  const createCity = async (newCity) => {
    try {
      setIsLoading(true);
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
      setCities((cities) => [...cities, newCity]);
    } catch {
      alert("There was an error loading data ...");
    } finally {
      setIsLoading(false);
    }
  };

  // deleting a city to API
  const deleteCity = async (id) => {
    try {
      setIsLoading(true);
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });

      // a wildcard to show the remaining city list
      setCities((cities) => cities.filter((city) => city.id !== id));
    } catch {
      alert("There was an error deleting data ...");
    } finally {
      setIsLoading(false);
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
