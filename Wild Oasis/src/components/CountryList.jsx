import styles from "./CountryList.module.css";
import CountryItem from "./CountryItem";
import Spinner from "./Spinner";
import { useCities } from "../contexts/CitiesContext";

function CountryList() {
  // getting the date from context
  const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner />;

  // getting the countries list from cities ( no duplicate countries )
  // let countries = cities.reduce((countryArray, currCity) => {
  //   if (!countryArray.map((c) => c.country).includes(currCity.country))
  //     return [
  //       ...countryArray,
  //       { country: currCity.country, emoji: currCity.emoji, id: Date.now() },
  //     ];
  //   else return countryArray;
  // }, []);

  let countries = cities.reduce((arr, city) => {
    if (arr.includes(city.country)) return arr;
    else return [...arr, { id: Date.now(), country: city.country }];
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.id} />
      ))}
    </ul>
  );
}

export default CountryList;
