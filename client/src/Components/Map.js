import { useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

export default function Home() {

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBn5jNLx6GSGYXKIgpzE51bRvoJDGxoDko",
    libraries:["places"], 
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <h1 className="text-white"><Map/></h1>;
}

function Map() {
  const center = useMemo(() => ({ lat: 17.3850, lng:78.4867 }), []);
  const options = useMemo(() => ({ mapId:"7255e263feaf4c95" }), []);
  return (
    <GoogleMap zoom={10} center={center} options={options} mapContainerClassName="map-container">
      <Marker position={center} />
    </GoogleMap>
  );
}
