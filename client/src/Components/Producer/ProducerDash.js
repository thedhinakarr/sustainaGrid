import React from 'react'
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';



export default function ProducerDash() {

    const [udata, setuData] = useState({});
    const [sourcedata,setsourcedata] = useState([]);


    let params = useParams();
    let navigate = useNavigate();
    let sources = [];

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
                let sourceData = await axios.get(`/api/sources/getSourcesByToken`, config);
                console.log(sourceData.data);
                setuData(data.user);
                setsourcedata(sourceData.data);

            } catch (error) {
                console.error(error.response.data)
            }
        }
        getData();
    }, [udata,sourcedata])

    sourcedata.forEach( (ele) => {
        sources.push(
            <div className="flex flex-col mb-2 mr-2 p-8 border rounded-lg border-susYGreen">
                    <span className='text-white font-semibold'>SOURCE NAME: <span className='hover:text-susZGreen'>{ele.name}</span></span>
                    <span className='text-white mb-4 font-semibold'>SOURCE ID: <span className='hover:text-susZGreen cursor-pointer focus:cursor-auto' >{ele._id}</span></span>
                    <button className='mt-1 hover:text-red font-semibold'>DELETE</button>
            </div>

        )
    });

    function marketHandle(e){
        e.preventDefault();
        navigate("/producerMarket")

    }

    function consumerHandle(e){
        e.preventDefault();
        navigate("/consumerDashBoard");
    }

    function proposeHandle(e){
        e.preventDefault();
        navigate("/producerProposal");
    }

    function checkApprovalHandle(e){
        e.preventDefault();
        navigate("/producerApprovals");
    }


    function logoutHandle(e){
        e.preventDefault();
        localStorage.removeItem("token");
        navigate("/");
    }



  return (
    <div className="flex border-susZGreen border flex-row h-screen text-white">

    <div className="flex flex-nowrap  flex-col w-2/5 h-screen  border-susZGreen border py-3 px-3  ">
    
    <div className="mb-2 overscroll-auto font-semibold  text-lg items-center p-3 "> <span className="text-susZGreen text-6xl">Producer Dashboard</span></div>
        <div className="mb-2 font-semibold rounded-lg text-3xl items-center p-3 ">Hello <span className="text-susZGreen">{udata.name}</span></div>
        <div className="w-64 mb-2 object-fill font-semibold text-lg rounded-lg p-3 items-center"><img  /></div>

        <button onClick={marketHandle}  className="font-semibold hover:bg-susZGreen hover:text-susBlack mb-2  text-xl p-3  rounded-lg items-center ">SOURCE MARKETPLACE<p></p></button>
        <button onClick={consumerHandle}  className="font-semibold hover:bg-susZGreen hover:text-susBlack mb-2  text-xl p-3  rounded-lg items-center ">SWITCH TO CONSUMER</button>
        {/* <button onClick={} className="font-semibold hover:bg-susZGreen hover:text-susBlack mb-2  text-xl p-3  rounded-lg items-center ">EDIT PROFILE  </button> */}
        <button onClick={proposeHandle}  className="font-semibold hover:bg-susZGreen hover:text-susBlack mb-2  text-xl p-3  rounded-lg items-center ">PROPOSE</button>
        <button onClick={checkApprovalHandle}  className="font-semibold hover:bg-susZGreen hover:text-susBlack mb-2  text-xl p-3  rounded-lg items-center ">CHECK APPROVALS</button>
        <button onClick={logoutHandle}  className="font-semibold hover:bg-susZGreen hover:text-susBlack mb-2  text-xl p-3  rounded-lg items-center ">Logout</button>
    </div>

    <div className="flex flex-nowrap overflow-auto flex-col w-3/5 py-9 px-5 border border-susZGreen ">
    <div className="mb-2 font-semibold  rounded-lg text-lg items-center p-3 "> <span className="text-susZGreen text-6xl">My Ownings</span></div>
    
    {sources}
     
    </div>
</div>
  )
}
