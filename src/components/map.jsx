import {useState, useEffect} from "react";
import {MapContainer, TileLayer, Marker, Popup, useMap} from "react-leaflet";
import {GeoSearchControl, OpenStreetMapProvider} from "leaflet-geosearch";
import "leaflet-geosearch/dist/geosearch.css";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

function LocationMarker({position}) {
  const map = useMap();

  useEffect(() => {
    map.setView(position, 13);
  }, [position, map]);

  return (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  );
}

function Search({setSearchPosition, placeholder}) {
  const map = useMap();

  useEffect(() => {
    const provider = new OpenStreetMapProvider();
    const searchControl = new GeoSearchControl({
      provider: provider,
      style: "bar",
      autoComplete: true,
      autoCompleteDelay: 250,
      showMarker: false,
      searchLabel: placeholder,
    });

    map.addControl(searchControl);

    map.on("geosearch/showlocation", (result) => {
      setSearchPosition([result.location.y, result.location.x]);
    });

    return () => map.removeControl(searchControl);
  }, [map, setSearchPosition, placeholder]);

  return null;
}

function Map() {
  const [position, setPosition] = useState([0.0, 0.0]);
  const [hasPosition, setHasPosition] = useState(false);
  const [searchPosition, setSearchPosition] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const {latitude, longitude} = position.coords;
          setPosition([latitude, longitude]);
          setHasPosition(true);
        },
        (error) => {
          console.error("Error Code = " + error.code + " - " + error.message);
        }
      );
    }
  }, []);

  useEffect(() => {
    if (searchPosition) {
      setPosition(searchPosition);
      setHasPosition(true);
    }
  }, [searchPosition]);

  return (
    <div className="flex h-screen">
      <MapContainer center={position} zoom={13} className="w-full h-2/3 ">
        <Search
          setSearchPosition={setSearchPosition}
          className="custom-search-bar"
          placeholder="Search for Initial Position"
        />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {hasPosition && <LocationMarker position={position} />}
      </MapContainer>
    </div>
  );
}

export default Map;
