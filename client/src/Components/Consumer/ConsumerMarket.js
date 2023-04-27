import React from 'react'
import Listing from './Listing'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ConsumerMarket() {
    let libs = [];
    const [audio, setAudio] = useState([]);
    let navigate = useNavigate();

    useEffect(() => {

        let getAudio = async () => {
            try {

                let ls = localStorage.getItem("token");
                ls = JSON.parse(ls)

                const config = {
                    headers: {
                        "auth-token": ls
                    }
                };

                let { data } = await axios.get("/api/sources/getAllSourcesWithOwners", config);
                setAudio(data);
                console.log(data);
            } catch (error) {
                console.error(error.response.data);
            }
        }
        getAudio();
    } , [])


    audio.forEach((ele) => {
        libs.push(
            <Listing _id={ele._id} energyType={ele.energyType} locationString={ele.locationString} locationLat={ele.locationLat} locationLong={ele.locationLong} ownedBy={ele.ownedBy} subscriptionPrice={ele.subscriptionPrice} name={ele.name} imageUrl={ele.imageUrl} />
        )
    })


function onGoBack(e){
    e.preventDefault();
    navigate("/consumerDashBoard");
}

    return (
        <div>

            <div className="flex justify-center  px-4 text-gray-700">
            <button onClick={onGoBack} className=" border-white font-semibold hover:bg-susZGreen w-40 h-10 py-1 mr-3 mt-10 mb-10 text-white text-center border">Go Back</button>

                <div className="flex w-full max-w-screen-lg">
               
                    <div className="flex flex-col flex-grow border-l border-r border-white">

                        <ul>
                            <li className="flex justify-between flex-shrink-0 px-8 py-4 border-b border-white">

                                <h1 className=" text-white text-6xl font-semibold">Market</h1>

                            </li>

                            {libs}

                        </ul>
                    </div>
                </div>
            </div>

        </div>
    )
}
