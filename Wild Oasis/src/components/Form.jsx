// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";
import styles from "./Form.module.css";
import Button from "./Button";
import BackButton from "./BackButton";
import Message from "./Message";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Spinner from "./Spinner";
import { useCities } from "../contexts/CitiesContext";
import { useNavigate } from "react-router-dom";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [cityName, setCityName] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [country, setCountry] = useState("");
  const [emoji, setEmoji] = useState("");

  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  // custom hook to get the positions from query string
  const [lat, lng] = useUrlPosition();
  const [isLoadingGeoCoding, setIsLoadingGeocording] = useState(false);
  const [isErrorGeoCoding, setIsErrorGeocording] = useState("");
  // accessing the city context
  const { createCity, isLoading } = useCities();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCityData = async () => {
      try {
        setIsLoadingGeocording(true);
        setIsErrorGeocording("");
        const response = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
        );
        const data = await response.json();

        // if the user clicks on a place where theres no country(like sea)
        if (!data.countryCode)
          throw new Error(
            "That doesnt seem to be a country 😜 Please select another place"
          );

        setCityName(data.city || data.locality || "");
        setCountry(data.countryName);
        setEmoji(convertToEmoji(data.countryCode));
      } catch (err) {
        setIsErrorGeocording(err.message);
      } finally {
        setIsLoadingGeocording(false);
      }
    };

    fetchCityData();
  }, [lat, lng]);

  if (isErrorGeoCoding) return <Message message={isErrorGeoCoding} />;

  if (isLoadingGeoCoding) return <Spinner />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!cityName || !date) return;

    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat, lng },
    };

    // posting the city to API
    await createCity(newCity);

    // navigation to app layout
    navigate("/app");
  };

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          id="date"
          selected={date}
          onChange={(dateSelected) => setDate(dateSelected)}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
