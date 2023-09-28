import React from 'react'
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';


export default function PRejection() {
    let navigate = useNavigate();
    let params = useParams();

    function handleSubscribe(e){
        try {
            e.preventDefault(); 
            alert("Sorry for the inconvinience");
            navigate("/producerDashBoard");
        } catch (error) {
            alert(error);
            console.log(error);
        }
    }
    return (
        <div className='text-white'>
            <div className="h-screen flex justify-center items-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-8">Hmmm, something's wrong <span className='text-susZGreen'>the payment failed.</span> </h1>
                    <button onClick={handleSubscribe} className=" text-3xl hover:bg-susZGreen hover:text-susBlack text-white font-bold py-2 px-4 rounded">
                        Go back to Producer Dashboard
                    </button>
                </div>
            </div>
        </div>
    )
}
