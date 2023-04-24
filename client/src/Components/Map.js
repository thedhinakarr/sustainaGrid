import { useMemo, useEffect, useState } from "react";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import axios from "axios";

export default function Home() {

  const [uCoordata, setuCoorData] = useState({});
  const [subdata, setsubdata] = useState([]);
  const [sourcedata, setsourcedata] = useState([]);
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

        let { data } = await axios.get(`/api/user/getUserByToken`, config);
        setuCoorData({ lat:data.user.locationLat,lng: data.user.locationLong})
        console.log(uCoordata);

        let subdatax = await axios.get(`api/subscriptions/getSubInformationByToken`,config);
        setsubdata(subdatax.data);
        console.log(subdata)

        let x = new Array();

        subdata.forEach(async (ele)=>{
        let source =  await axios.get(`/api/sources/getSourceById/${ele.subscribedTo[0]}`,config);
          x.push({lat:source.data[0].locationLat,lng:source.data[0].locationLong})
          setsourcedata(x);
        })
       

      } catch (error) {
        console.error(error.response.data)
      }
    }
    getData();
  }, [uCoordata,subdata,sourcedata])

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBn5jNLx6GSGYXKIgpzE51bRvoJDGxoDko",
    libraries: ["places"],
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <h1 className="text-white"><Map userLocation={uCoordata} subSourceLocations={sourcedata} /></h1>;
}

function Map({ subSourceLocations, userLocation, AllSourceLocation }) {




  // Need to call the get user location lat long, sources the user subscribed to lat long
  //const center = useMemo(() => (userLocation), []);
  const options = useMemo(() => ({ mapId: "7255e263feaf4c95" }), []);


  let libs = [];

  subSourceLocations.forEach((ele)=>{
    const markerOptions = {
      icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
      scaledSize: new window.google.maps.Size(50, 50)
    };
    libs.push(
      <MarkerF position={ele} options={markerOptions} />
    )
  })


  return (

    <div className="flex border-susZGreen border flex-row h-screen text-white">

      <div className="flex flex-nowrap  flex-col w-1/5 h-screen  border-susZGreen border py-3 px-3  ">

      </div>

      <div className="flex flex-nowrap flex-col w-4/5 border border-susZGreen ">
        <GoogleMap zoom={10} center={userLocation} options={options} mapContainerClassName="map-container">
          <MarkerF position={userLocation} />
          {libs}

         
          {/* <MarkerF position={{ lat: 37.7749, lng: -122.4194 }} />
          <MarkerF position={{ lat: 37.7895, lng: -122.4068 }} />
          <MarkerF position={{ lat: 37.7749, lng: -122.4594 }} /> */}

        </GoogleMap>
      </div>

    </div>

    // {/* <div className="flex flex-nowrap flex-col w-4/5  border border-susZGreen ">
    // <GoogleMap zoom={10} center={center} options={options} mapContainerClassName="map-container">
    //       <Marker position={center} />
    //       {/* <Marker position={{lat:17.12345678, lng:18.12345678}} /> */}
    // </GoogleMap>
    // </div> */}


  );
}
