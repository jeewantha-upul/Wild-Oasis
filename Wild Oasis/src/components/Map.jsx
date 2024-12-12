import styles from "./Map.module.css";
import { useSearchParams, useNavigate } from "react-router-dom";

function Map() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  const changeLat = () => {
    setSearchParams();
  };

  return (
    <div className={styles.mapContainer} onClick={() => navigate("form")}>
      Map {lat} and {lng}
      <button onClick={changeLat}></button>
    </div>
  );
}

export default Map;
