import styles from "./CountryList.module.css";
import CountryItem from "./CountryItem";
import Spinner from "./Spinner";

function CountryList({ cities, isLoading }) {
  if (isLoading) return <Spinner />;

  // getting the countries list from cities ( no duplicate countries )
  let countries = cities.reduce((countryArray, currCity) => {
    if (!countryArray.map((c) => c.country).includes(currCity.country))
      return [
        ...countryArray,
        { country: currCity.country, emoji: currCity.emoji, id: Date.now() },
      ];
    else return countryArray;
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
