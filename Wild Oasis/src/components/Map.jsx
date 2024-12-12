import styles from "./Map.module.css";
import { useSearchParams } from "react-router-dom";

function Map() {
  const [searchParams, setSearchParams] = useSearchParams();

  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  const changeLat = () => {
    setSearchParams();
  };

  return (
    <div className={styles.mapContainer}>
      Map {lat} and {lng}
      <button onClick={changeLat}></button>
    </div>
  );
}

export default Map;
