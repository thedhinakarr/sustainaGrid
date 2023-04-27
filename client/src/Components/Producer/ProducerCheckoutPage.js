import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';


export default function ProducerCheckoutPage() {

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
            console.log(params.id);

            let url = await axios.post(`/api/sources/buySource/${params.id}`,{},config);
            console.log(url.data);
            window.location.href = `${url.data}`;

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='text-white'>
            <div className="h-screen flex justify-center items-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-8">Almost there, you will be buying the source <span className='text-susZGreen'>{params.id}</span> </h1>
                    <button onClick={handleSubscribe} className=" text-3xl hover:bg-susZGreen hover:text-susBlack text-white font-bold py-2 px-4 rounded">
                        Buy!
                    </button>
                </div>
            </div>
        </div>
    )
}
