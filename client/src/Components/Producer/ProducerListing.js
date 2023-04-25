import React from 'react'
import { useNavigate } from 'react-router-dom';


export default function ProducerListing({ _id, name, energyType, ownedBy, subscriptionPrice, locationString, locationLat, locationLong, imageUrl,sourcePrize}) {
    let navigate = useNavigate();

    function listingClickHandler(e) {
        e.preventDefault();
        navigate(`/producerSourceProfile/${_id}`);

    }
    

    return (
        <div>

            <li className="text-white flex-grow ">
                <div className="flex w-full p-8 border-b border-gray-300">

                    <div className="flex-shrink-0 w-24 h-24 bg-gray-400 rounded-full" >
                        <img className="object-fill w-full h-full " src={imageUrl} />
                    </div>

                    <div className="flex flex-col flex-grow ml-4">

                        <div className="grid ">
                            <ul className="list-style-none">
                                <li className="font-semibold">Name: <span onClick={listingClickHandler} className="text-susZGreen hover:underline cursor-pointer">{name}</span></li>
                                <li className="font-semibold">Energy Type: <span className="text-susZGreen">{energyType}</span> </li>
                            </ul>
                        </div>

                        <p className="mt-3 " >
                            {/* synopsis */}
                        </p>

                        <div className=" flex">
                            <ul className="list-style-none">
                                <li className="mt-2 text-sm font-semibold">Source price:  <span className="text-susZGreen">Rs.{sourcePrize}</span></li>
                                <li className="mt-2 text-sm font-semibold">Subscription Price: <span className="text-susZGreen">Rs.{subscriptionPrice}</span></li>
                                <li className="mt-2 text-sm font-semibold">location:  <span className="text-susZGreen">{locationString}</span></li>

                            </ul>
                        </div>
                    </div>

                </div>

            </li>

        </div>
    )
}
