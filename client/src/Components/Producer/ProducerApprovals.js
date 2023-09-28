import React from 'react'
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';

export default function ProducerApprovals() {
  const [approvalData,setApprovalData] = useState([]);

  let params = useParams();
  let navigate = useNavigate();
  let approvals = [];

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

            let approvalData = await axios.get(`/api/approvals/getApprovalsByToken`, config);
            console.log(approvalData.data);
            setApprovalData(approvalData.data);
        } catch (error) {
            console.error(error.response.data)
        }
    }
    getData();
}, [approvalData])

approvalData.forEach( (ele) => {
  approvals.push(
      <div className="flex flex-col mb-2 mr-2 p-8 border rounded-lg border-susYGreen">
              <span className='text-white font-semibold'>Approval ID: <span className='hover:text-susZGreen'>{ele._id}</span></span>
              <span className='text-white font-semibold'>Source name: <span className='hover:text-susZGreen'>{ele.name}</span></span>
              <span className='text-white mb-4 font-semibold'>Approval Status: <span className='hover:text-susZGreen cursor-pointer focus:cursor-auto' >{ele.state}</span></span>
      </div>

  )
});

function onGoBack(e){
  e.preventDefault();
  navigate("/producerDashBoard");
}

  return (
    <div>
      <div className="flex border-susZGreen border flex-row h-screen text-white">

        <div className="flex flex-nowrap  flex-col w-1/5 h-screen  border-susZGreen border py-3 px-3  ">

          <div className="mb-2 overscroll-auto font-semibold  text-lg items-center p-3 "> <span className="text-susZGreen text-6xl"></span></div>
          <button onClick={onGoBack}  className="font-semibold hover:bg-susZGreen hover:text-susBlack   text-xl p-3  rounded-lg items-center ">GO BACK</button>
        </div>

        <div className="flex flex-nowrap overflow-auto flex-col w-4/5 py-9 px-5 border border-susZGreen ">
          <div className="mb-2 font-semibold  rounded-lg text-lg items-center p-3 "> <span className="text-susZGreen text-6xl">APPROVALS</span></div>
        {approvals}
        </div>
      </div>
    </div>
  )
}
