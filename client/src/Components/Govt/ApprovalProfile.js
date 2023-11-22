import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


export default function ApprovalProfile() {

    const [sdata, setsData] = useState({});
    let params = useParams();
    let navigate = useNavigate();

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
                console.log(config)
                console.log(params.id)

                let { data } = await axios.get(`/api/approvals/getApprovalById/${params.id}`, config);
                console.log(data);
                setsData(data[0]);
                console.log(sdata)

            } catch (error) {
                console.error(error.response.data)
            }
        }
        getData();
    }, [sdata])

    function handleApprove(e) {
        e.preventDefault();
        navigate(`/addSource/${sdata._id}`)
    }

    function handleReject(e){
        e.preventDefault();
        navigate(`/rejectSource/${sdata._id}`);
    }


    return (
        <div>
            <div>
                <div className="flex flex-row h-screen text-white">

                    <div className="flex flex-nowrap overflow-auto border-susZGreen flex-col w-4/5 h-screen py-3 px-3  ">
                        <div className="mb-2 font-semibold rounded-lg text-4xl text-susZGreen items-center p-3  border-susZGreen">PROPOSAL DATA <span className="text-susZGreen"></span></div>
                        <div className="font-semibold mb-2  text-lg p-3  rounded-lg items-center  border-susZGreen border">Proposal ID: <span className="text-susZGreen">{sdata._id}</span><p></p></div>

                        <div className="w-69 h-69 mb-2 object-fill font-semibold text-lg rounded-lg p-3  border-susZGreen items-center"><img className='w-full h-full' src={sdata.imageUrl} /></div>

                        <div className="font-semibold mb-2  text-lg p-3  rounded-lg items-center  border-susZGreen border">Description:  <span className="text-susZGreen">{sdata.description}</span></div>
                        <div className="font-semibold mb-2  text-lg p-3  rounded-lg items-center  border-susZGreen border">Proposal Status:  <span className="text-susZGreen">{sdata.state}</span></div>
                        <div className="font-semibold mb-2  text-lg p-3  rounded-lg items-center  border-susZGreen border">Resource Type: <span className="text-susZGreen">{sdata.proposedResourceType}</span></div>
                        <div className="font-semibold mb-2  text-lg p-3  rounded-lg items-center  border-susZGreen border">Energy Type: <span className="text-susZGreen">{sdata.proposedEnergyType}</span></div>
                        <div className="font-semibold mb-2  text-lg p-3  rounded-lg items-center  border-susZGreen border">Energy Generated: <span className="text-susZGreen">{sdata.proposedEnergyGenerated}</span></div>
                        <div className="font-semibold mb-2  text-lg p-3  rounded-lg items-center  border-susZGreen border">Source Cost: <span className="text-susZGreen">Rs.{sdata.proposedSourceCost}</span></div>
                        <div className="font-semibold mb-2  text-lg p-3  rounded-lg items-center  border-susZGreen border">Subscription price: <span className="text-susZGreen">Rs.{sdata.proposedSubscriptionPrice}</span></div>
                        <div className="font-semibold mb-2  text-lg p-3  rounded-lg items-center  border-susZGreen border">Location: <span className="text-susZGreen">{sdata.locationString}</span></div>
                        <div className="font-semibold mb-2  text-lg p-3  rounded-lg items-center  border-susZGreen border">Latitude coordinate: <span className="text-susZGreen">{sdata.locationLat}</span></div>
                        <div className="font-semibold mb-2  text-lg p-3  rounded-lg items-center  border-susZGreen border">Longitude coordinate: <span className="text-susZGreen">{sdata.locationLong}</span></div>

                    </div>

                    <div className="flex flex-nowrap flex-col h-screen w-1/5 py-9 px-5 border-susZGreen ">
                        <button onClick={(e) => { e.preventDefault(); window.open(`http://localhost:3069${sdata.proposalFileUrl}`, "_blank"); }} className="font-semibold  hover:bg-susZGreen w-40 h-10 py-1 mr-3 mb-10 text-center border">Download report</button>
                        <button onClick={(e) => { e.preventDefault(); navigate(`/govtLocationAnalyzer/${sdata._id}`) }} className="font-semibold  hover:bg-susZGreen w-40 h-10 py-1 mr-3 mb-10 text-center border">Location Analysis</button>
                        <button onClick={handleApprove} className="font-semibold  hover:bg-susZGreen w-40 h-10 py-1 mr-3 mb-10 text-center border">Approve </button>
                        <button onClick={handleReject} className="font-semibold  hover:bg-red w-40 h-10 py-1 mr-3 mb-10 text-center border">Reject</button>
                        <button onClick={(e) => { e.preventDefault(); navigate("/govtDashBoard") }} className="font-semibold  hover:bg-susZGreen w-40 h-10 py-1 mr-3 text-center border">Go Back</button>

                    </div>

                </div>
            </div>

        </div>
    )
}
