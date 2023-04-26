import { useMemo, useEffect, useState } from "react";
import { GoogleMap, useLoadScript, MarkerF, DirectionsService, DirectionsRenderer } from "@react-google-maps/api";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function GovtLocationAnalyser() {

  let navigate = useNavigate();
  let params = useParams();

  const [uCoordata, setuCoorData] = useState({});
  const [sourcedata, setsourcedata] = useState({});



  useEffect(() => {
    let getData = async () => {
      try {

        let ls = localStorage.getItem("token");
        ls = JSON.parse(ls)

        const config = {
          headers: {
            "auth-token": ls
          }
        };
       

        let sdata = await axios.get(`/api/approvals/getApprovalById/${params.id}`, config);
        console.log(sdata.data[0]);
        setsourcedata({ lat: sdata.data[0].locationLat, lng: sdata.data[0].locationLong });
        console.log(sourcedata);

      } catch (error) {
        console.error(error.response.data)
      }
    }
    getData();
  }, [])

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBn5jNLx6GSGYXKIgpzE51bRvoJDGxoDko",
    libraries: ["places"],
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <h1 className="text-white"><Map userLocation={uCoordata} subSourceLocations={sourcedata} sourceId={params.id} /></h1>;
}

function Map({ subSourceLocations, sourceId }) {

//   const [directions, setDirections] = useState(null);

//   const directionsOptions = {
//     origin: userLocation,
//     destination: subSourceLocations,
//     travelMode: 'DRIVING'
//   };

//   const directionsCallback = (response) => {
//     if (response != null) {
//       setDirections(response);
//     }
//   };

  let navigate = useNavigate()

  function onGoBack(e) {
    e.preventDefault();
    navigate(`/ApprovalProfile/${sourceId}`);
  }

  const options = useMemo(() => ({ mapId: "7255e263feaf4c95" }), []);
  let libs = [];

  const markerOptions = {
    icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/parking_lot_maps.png',
    scaledSize: new window.google.maps.Size(50, 50)
  };


  return (

    <div className="flex border-susZGreen border flex-row h-screen text-white">
      <div className="flex flex-nowrap flex-col w-4/5 border border-susZGreen ">
        <GoogleMap zoom={10} center={subSourceLocations} options={options} mapContainerClassName="map-container">
          <MarkerF position={subSourceLocations} options={markerOptions} />
          {/* <DirectionsService
            options={directionsOptions}
            callback={directionsCallback}
          />
          {directions && <DirectionsRenderer directions={directions} />} */}
        </GoogleMap>
      </div>

      <div className="flex flex-nowrap  flex-col w-1/5 h-screen  border-susZGreen border py-3 px-3  ">
        <button onClick={onGoBack} className=" border-white font-semibold hover:bg-susZGreen w-40 h-10 py-1 mr-3 mt-10 mb-10 text-white text-center border">Go Back</button>
      </div>

    </div>
  );
}
