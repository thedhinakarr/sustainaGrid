import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';


export default function AddSourcePage() {

    let navigate = useNavigate();
    let params = useParams();

    let ls = localStorage.getItem("token");
    ls = JSON.parse(ls);

    async function handleSubscribe(e) {
        try {
            e.preventDefault();
           
            const config = {
                headers: {
                    "auth-token": ls
                }
            };

           let sourceDetails = await axios.get(`/api/approvals/getApprovalById/${params.id}`,config);
           console.log(sourceDetails.data[0]);

         let x = {
            "name":sourceDetails.data[0].name,
            "resourceType":sourceDetails.data[0].proposedResourceType,
            "energyType":sourceDetails.data[0].proposedEnergyType,
            "energyGenerated":sourceDetails.data[0].proposedEnergyGenerated,
            "sourceCost":sourceDetails.data[0].proposedSourceCost,
            "subscriptionPrice":sourceDetails.data[0].proposedSubscriptionPrice,
            "maxCapacity":30,
            "locationString":sourceDetails.data[0].locationString,
            "locationLat":sourceDetails.data[0].locationLat,
            "locationLong":sourceDetails.data[0].locationLong
        }

        let url = await axios.post(`/api/sources/addSource`,x,config);
        console.log(url);
        
        } catch (error) {
            console.log(error);
        }
    }


  return (
    <div className='text-white'>
            <div className="h-screen flex justify-center items-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-8"> You will be approving the proposal --{'>'} <span className='text-susZGreen'>{params.id}</span> </h1>
                    <button onClick={handleSubscribe} className=" text-3xl hover:bg-susZGreen hover:text-susBlack text-white font-bold py-2 px-4 rounded">
                       Approve
                    </button>
                </div>
            </div>
        </div>
  )
}
