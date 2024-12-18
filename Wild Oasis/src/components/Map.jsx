/* eslint-disable no-unused-vars */
import styles from "./Map.module.css";
import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useCities } from "../contexts/CitiesContext";
import { useSearchParams } from "react-router-dom";

function Map() {
  const [searchParams, setSearchParams] = useSearchParams();
  //const navigate = useNavigate();

  const mapLat = searchParams.get("lat");
  const mapLng = searchParams.get("lng");

  // const changeLat = () => {
  //   setSearchParams();
  // };

  // getting the cities from global state
  const { cities } = useCities();

  // lat and lng when city item clicked
  const [mapPosition, setMapPosition] = useState([51.505, -0.09]);

  useEffect(() => {
    if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
  }, [mapLat, mapLng]);

  return (
    <div className={styles.mapContainer}>
      <MapContainer
        center={mapPosition}
        zoom={13}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />

        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}

        {/* for showing the selected city */}
        <ChangeCenter mapPosition={mapPosition} zoom={50} />
      </MapContainer>
    </div>
  );
}

{
  /* for showing the selected city */
}
const ChangeCenter = ({ mapPosition, zoom }) => {
  const map = useMap();
  map.setView(mapPosition, zoom);
};

export default Map;
