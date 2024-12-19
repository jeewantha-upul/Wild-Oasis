/* eslint-disable no-unused-vars */
import styles from "./Map.module.css";
import { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useCities } from "../contexts/CitiesContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGeolocation } from "../hooks/useGeolocation";
import Button from "./Button";
import { useUrlPosition } from "../hooks/useUrlPosition";

function Map() {
  // custom hook to get the positions from query string
  const [mapLat, mapLng] = useUrlPosition();

  // getting the access tocustom hook which gets the currnet position of a user
  const {
    isLoading: isLoadingPosition,
    getPosition,
    position: geoLocationPosition,
  } = useGeolocation();

  // getting the cities from global state
  const { cities } = useCities();

  // local state where we provide for the Map to work
  const [mapPosition, setMapPosition] = useState([51.505, -0.09]);

  // synching the query stringd with our components state
  useEffect(() => {
    if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
  }, [mapLat, mapLng]);

  // synching the current users loction with our components state
  useEffect(() => {
    geoLocationPosition &&
      setMapPosition([geoLocationPosition.lat, geoLocationPosition.lng]);
  }, [geoLocationPosition]);

  return (
    <div className={styles.mapContainer}>
      {!geoLocationPosition && (
        <Button type="position" onClick={getPosition}>
          {isLoadingPosition ? "Loading..." : "Get Your Position"}
        </Button>
      )}
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

        {/* for showing the selected city in a Zoomed mode in Map*/}
        <ChangeCenter mapPosition={mapPosition} />
        {/* for handling the click event on the map */}
        <DetectClick />
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

// navigation to form UI when clicked on the Map background
const DetectClick = () => {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
  return null;
};

export default Map;
