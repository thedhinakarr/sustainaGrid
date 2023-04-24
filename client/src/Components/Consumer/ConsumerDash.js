import React from 'react'
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';


export default function ConsumerDash() {
    const [udata, setuData] = useState({});
    const [subdata, setsubdata] = useState([]);
    const [sourcedata,setsourcedata] = useState([]);

    let params = useParams();
    let navigate = useNavigate();
    let subscriptions = [];

    useEffect(() => {
        let getData = async () => {
            try {

                let token = localStorage.getItem("token");

                console.log(token);

                if (token) {
                    token = JSON.parse(token);
                }
        
                else {
                    navigate("/")
                }

                const config = {
                    headers: {
                        "auth-token": token
                    }
                };

                let { data } = await axios.get(`/api/user/getUserByToken`, config);
                console.log(data);
                let subscriptionData = await axios.get(`/api/subscriptions/getSubInformationByToken`, config);
                console.log(subscriptionData.data);
                setuData(data.user);
                setsubdata(subscriptionData.data);

            } catch (error) {
                console.error(error.response.data)
            }
        }
        getData();
    }, [udata,subdata])

    subdata.forEach( (ele) => {
        subscriptions.push(
            <div className="flex flex-col mb-2 mr-2 p-8 border rounded-lg border-susYGreen">
                    <span className='text-white font-semibold'>SUB_ID: <span className='hover:text-susZGreen'>{ele._id}</span></span>
                    <span className='text-white mb-4 font-semibold'>SUBSCRIBED TO: <span className='hover:text-susZGreen cursor-pointer focus:cursor-auto' >{ele.subscribedTo}</span></span>
                    <button className='mt-1 hover:text-red font-semibold'>DELETE</button>
            </div>

        )
    });

    function marketHandle(e){
        e.preventDefault();
        navigate("/consumerMarket")

    }

    function grootHandle(e){
        e.preventDefault();
        navigate("/groot")
    }

    function producerHandle(e){
        e.preventDefault();
        alert("producer clicked");
    }

    function logoutHandle(e){
        e.preventDefault();
        localStorage.removeItem("token");
        navigate("/");
    }

  return (
    <div className="flex border-susZGreen border flex-row h-screen text-white">

    <div className="flex flex-nowrap  flex-col w-2/5 h-screen  border-susZGreen border py-3 px-3  ">
    
    <div className="mb-2 overscroll-auto font-semibold  text-lg items-center p-3 "> <span className="text-susZGreen text-6xl">Consumer Dashboard</span></div>
        <div className="mb-2 font-semibold rounded-lg text-3xl items-center p-3 ">Hello <span className="text-susZGreen">{udata.name}</span></div>
        <div className="w-64 mb-2 object-fill font-semibold text-lg rounded-lg p-3 items-center"><img src={udata.imageUrl} /></div>

        <button onClick={marketHandle} className="font-semibold hover:bg-susZGreen hover:text-susBlack mb-2  text-xl p-3  rounded-lg items-center ">RENEWABLE MARKET<p></p></button>
        <button onClick={producerHandle} className="font-semibold hover:bg-susZGreen hover:text-susBlack mb-2  text-xl p-3  rounded-lg items-center ">SWITCH TO PRODUCER </button>
        {/* <button onClick={} className="font-semibold hover:bg-susZGreen hover:text-susBlack mb-2  text-xl p-3  rounded-lg items-center ">EDIT PROFILE  </button> */}
        <button onClick={grootHandle} className="font-semibold hover:bg-susZGreen hover:text-susBlack mb-2  text-xl p-3  rounded-lg items-center ">TALK TO GROOT</button>
        <button onClick={logoutHandle} className="font-semibold hover:bg-susZGreen hover:text-susBlack mb-2  text-xl p-3  rounded-lg items-center ">LOGOUT</button>
    </div>

    <div className="flex flex-nowrap overflow-auto flex-col w-3/5 py-9 px-5 border border-susZGreen ">
    <div className="mb-2 font-semibold  rounded-lg text-lg items-center p-3 "> <span className="text-susZGreen text-6xl">Subscriptions</span></div>
     {subscriptions}
     
    </div>
</div>
  )
}
