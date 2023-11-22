import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';



export default function RejectProfile() {

    let navigate = useNavigate();
    let params = useParams();

    let ls = localStorage.getItem("token");
    ls = JSON.parse(ls);

    async function handleReject(e){
        e.preventDefault();
        const config = {
            headers: {
                "auth-token": ls
            }
        };

        console.log(params.id);

        let url = await axios.post(`/api/approvals/rejectApproval/${params.id}`,config);

        alert(url.data.message);
        
        navigate("/govtDashBoard");

    }



    return (
        <div className='text-white'>
            <div className="h-screen flex justify-center items-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-8"> You will be approving the proposal --{'>'} <span className='text-susZGreen'>{params.id}</span> </h1>
                    <button onClick={handleReject} className="text-3xl hover:bg-red hover:text-susBlack text-white font-bold py-2 px-4 rounded">
                        Reject
                    </button>
                </div>
            </div>
        </div>
    )
}
