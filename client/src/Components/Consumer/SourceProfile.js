import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function SourceProfile() {
  const [udata, setuData] = useState({});
  const [sdata, setsData] = useState({});
   let params = useParams();
   let navigate = useNavigate();
  let libs = [];

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

            console.log(params.id)

            let { data } = await axios.get(`/api/sources/getSourceById/${params.id}`, config);
            console.log(data[0]);
            setsData(data[0]);
            console.log(sdata)

        } catch (error) {
            console.error(error.response.data)
        }
    }
    getData();
}, [sdata])


function subClick(e){
  e.preventDefault();
  alert("subscribed! ");
}

function onGoBack(e){
  e.preventDefault();
  navigate("/consumerMarket");
}

function locationAnalysisClick(e){
  e.preventDefault();
  alert(" taking to location ")
}


  return (
    <div>
      <div className="flex flex-row h-screen text-white">

        <div className="flex flex-nowrap border-susZGreen flex-col w-2/5 h-screen py-3 px-3  ">
          <div className="mb-2 font-semibold rounded-lg text-lg items-center p-3 border border-susZGreen">Name: <span className="text-susZGreen">{sdata.name}</span></div>
          <div className="font-semibold mb-2  text-lg p-3  rounded-lg items-center  border-susZGreen border">Energy Type: <span className="text-susZGreen">{sdata.energyType}</span><p></p></div>
          <div className="w-69 h-69 mb-2 object-fill font-semibold text-lg rounded-lg p-3  border-susZGreen items-center"><img className='w-full h-full' src={sdata.imageUrl} /></div>
        </div>

        <div className="lex flex-nowrap flex-col h-screen w-3/5 py-9 px-5 border-susZGreen ">
          <button onClick={onGoBack} className="font-semibold  hover:bg-susZGreen w-40 h-10 py-1 mr-3 mb-10 text-center border">Go Back</button>
          <button onClick={locationAnalysisClick} className="font-semibold  hover:bg-susZGreen w-40 h-10 py-1 mr-3 mb-10 text-center border">Location Analysis </button>
          <button onClick={subClick} className="font-semibold  hover:bg-susZGreen w-40 h-10 py-1 mr-3 text-center border">Subscribe</button>
          <div className="font-semibold mb-2  text-lg p-3  rounded-lg items-center  border-susZGreen border">Owned by: <span className="text-susZGreen">{sdata.ownedBy}</span></div>
          <div className="font-semibold mb-2  text-lg p-3  rounded-lg items-center  border-susZGreen border">Energy Generated: <span className="text-susZGreen">{sdata.energyGenerated}</span></div>
          <div className="font-semibold mb-2  text-lg p-3  rounded-lg items-center  border-susZGreen border">Description: <span className="text-susZGreen">{sdata.description}</span></div>
          <div className="font-semibold mb-2  text-lg p-3  rounded-lg items-center  border-susZGreen border">Max Capacity: <span className="text-susZGreen">{sdata.maxCapacity}</span></div>

          {/* <div className="flex w-full p-8 overflow-auto border-b border-rose-700"> */}
          {/* {libs} */}
          {/* </div> */}
        </div>

      </div>
    </div>
  )
}
