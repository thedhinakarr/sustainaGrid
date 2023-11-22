import React from 'react'
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';

export default function GovtDash() {
    const [udata, setuData] = useState({});
    const [approvalData, setApprovalData] = useState([]);

    let params = useParams();
    let navigate = useNavigate();
    let proposals = [];

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

                let authData = await axios.post("/api/user/auth", { "token": token });
                console.log(authData.data.id);

                // if (authData.data.id !== "644ba9a86b47fdea44b2380f") {
                //     localStorage.removeItem("token");
                //     navigate("/");
                // }

                const config = {
                    headers: {
                        "auth-token": token
                    }
                };

                let { data } = await axios.get(`/api/user/getUserByToken`, config);
                console.log(data);
                let approvalData = await axios.get(`/api/approvals/getAllApprovals`, config);
                console.log(approvalData.data);
                setuData(data.user);
                setApprovalData(approvalData.data);
                console.log(approvalData)

            } catch (error) {
                console.error(error.response.data)
            }
        }
        getData();
    }, [udata, approvalData])



    approvalData.forEach((ele) => {
        proposals.push(
            <div className="flex flex-col mb-2 mr-2 p-8 border rounded-lg border-susYGreen">
                <span onClick={(e)=>{e.preventDefault(); alert("Clicked approval profile"); navigate(`/approvalProfile/${ele._id}`) }} className='text-white cursor-pointer font-semibold'>Approval ID: <span className='hover:text-susZGreen'>{ele._id}</span></span>
                <span className='text-white mb-4 font-semibold'>Approval By: <span className='hover:text-susZGreen focus:cursor-auto' >{ele.proposalBy[0]}</span></span>
                <span className='text-white mb-4 font-semibold'>Status: <span className='hover:text-susZGreen focus:cursor-auto' >{ele.state}</span></span>
            </div>

        )
    });

  

    function consumerHandle(e) {
        e.preventDefault();
        navigate("/govtMap");
    }
  

    function logoutHandle(e) {
        e.preventDefault();
        localStorage.removeItem("token");
        navigate("/");
    }


    return (
        <div className="flex border-susZGreen border flex-row h-screen text-white">

            <div className="flex flex-nowrap  flex-col w-96 h-screen  border-susZGreen border py-3 px-3  ">

                <div className="mb-2 overscroll-auto font-semibold  text-lg items-center p-3 "> <span className="text-susZGreen text-6xl">Govt Dashboard</span></div>
                <div className="mb-2 font-semibold rounded-lg text-3xl items-center p-3 "><span className="text-susZGreen"></span></div>
                <div className="w-64 mb-2 object-fill font-semibold text-lg rounded-lg p-3 items-center"><img /></div>

               
                <button onClick={consumerHandle} className="font-semibold hover:bg-susZGreen hover:text-susBlack mb-2  text-xl p-3  rounded-lg items-center ">MONITOR</button>
                {/* <button onClick={} className="font-semibold hover:bg-susZGreen hover:text-susBlack mb-2  text-xl p-3  rounded-lg items-center ">EDIT PROFILE  </button> */}
               
                <button onClick={logoutHandle} className="font-semibold hover:bg-susZGreen hover:text-susBlack mb-2  text-xl p-3  rounded-lg items-center ">LOGOUT</button>
            </div>

            <div className="flex flex-nowrap overflow-auto flex-col w-4/5 py-9 px-5 border border-susZGreen ">
                <div className="mb-2 font-semibold  rounded-lg text-lg items-center p-3 "> <span className="text-susZGreen text-6xl">Proposals</span></div>

                {proposals}

            </div>
        </div>
    )
}
