
import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ProducerProposal() {

  let navigate = useNavigate();
  const [file, setFile] = useState(null); //
  const [xfile, setxFile] = useState(null);
  const [sourceData, setSourceData] = useState({
    name: "",
    proposedResourceType: "",
    proposedEnergyType: "",
    proposedEnergyGenerated: "",
    proposedSourceCost: "",
    proposedSubscriptionPrice: "",
    description: "",
    locationString: "",
    locationLat: "",
    locationLong: "",
  });

  function OnChangeHandler(e) {
    setSourceData({
      ...sourceData,
      [e.target.name]: e.target.value
    })
    console.log(sourceData)
  }

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileXChange = (e) => {
    setxFile(e.target.files[0]);
  };

 async function onSubmit(e) {
    e.preventDefault();

    let token = localStorage.getItem("token");
    token = JSON.parse(token);

    const formDataToSend = new FormData();
    formDataToSend.append('data', JSON.stringify(sourceData));
    formDataToSend.append('picture', file);
    formDataToSend.append('proposal', xfile);


    await axios.post('/api/approvals/addProposal', formDataToSend, {
      headers: {
        'Content-Type': 'multipart/form-data',
        "auth-token": token
      }
    }).then((response) => {
      console.log(response.data);
      navigate("/producerDashBoard");
    }).catch((error) => {
      console.log(error);
    });

  }

 

  return (
    <>

      <section className="bg-black ">
        <div className="flex flex-col items-center justify-center mx-auto h-screen w-screen lg:py-0">
          <div className="w-full p-3 overflow-auto shadow dark:border md:mt-0 sm:max-w-md xl:p-0  dark:border-susZGreen">
            <div className="p-6 space-y-4 bg-black  md:space-y-6 sm:p-8">

              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Make a proposal
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                <div>
                  <label className='text-white'>
                    Upload SourcePic <br />
                  </label>
                  <br />
                  <input className="profile-input text-white" type="file" name="picture" id="picture" onChange={handleFileChange} />
                </div>
                <div>
                  <label className='text-white'>
                    Upload  Report <br />
                  </label>
                  <br />
                  <input className="profile-input text-white" type="file" name="proposal" id="proposal" onChange={handleFileXChange} />
                </div>

                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    id="name"
                    onChange={OnChangeHandler}
                    className="bg-susBlack border sm:text-sm rounded-lg  block w-full p-2.5 border-susZGreen text-white"
                    required="true"
                  />

                </div>

                <div>
                  <label
                    htmlFor="resourceType"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    proposedResourceType
                  </label>

                  <input
                    type="text"
                    name="proposedResourceType"
                    id="proposedResourceType"
                    onChange={OnChangeHandler}
                    className="bg-susBlack border sm:text-sm rounded-lg  block w-full p-2.5 border-susZGreen text-white"
                    required="true"
                  />

                </div>

                <div>
                  <label
                    htmlFor="EnergyType"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    proposedEnergyType
                  </label>

                  <input
                    type="text"
                    name="proposedEnergyType"
                    id="proposedEnergyType"
                    onChange={OnChangeHandler}
                    className="bg-susBlack border sm:text-sm rounded-lg  block w-full p-2.5 border-susZGreen text-white"
                    required="true"
                  />

                </div>


                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    proposedEnergyGenerated
                  </label>
                  <input
                    type="text"
                    name="proposedEnergyGenerated"
                    id="proposedEnergyType"
                    onChange={OnChangeHandler}
                    className="bg-susBlack border sm:text-sm rounded-lg  block w-full p-2.5 border-susZGreen text-white"
                    required="true"
                  />
                </div>
                <div>
                  <label
                    htmlFor="confirm-password"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    proposedSourceCost
                  </label>
                  <input
                    type="text"
                    name="proposedSourceCost"
                    id="proposedSourceCost"
                    onChange={OnChangeHandler}
                    className="bg-susBlack border sm:text-sm rounded-lg  block w-full p-2.5 border-susZGreen text-white"
                    required="true"
                  />
                </div>

                <div>
                  <label
                    htmlFor="proposedSubscriptionPrice"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                   proposedSubscriptionPrice
                  </label>
                  <input
                    type="text"
                    name="proposedSubscriptionPrice"
                    id="proposedSubscriptionPrice"
                    onChange={OnChangeHandler}
                    className="bg-susBlack border sm:text-sm rounded-lg  block w-full p-2.5 border-susZGreen text-white"
                    required="true"
                  />
                </div>

                <div>
                  <label
                    htmlFor="confirm-password"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    description
                  </label>
                  <input
                    type="text"
                    name="description"
                    id="description"
                    onChange={OnChangeHandler}
                    className="bg-susBlack border sm:text-sm rounded-lg  block w-full p-2.5 border-susZGreen text-white"
                    required="true"
                  />
                </div>

                <div>
                  <label
                    htmlFor="confirm-password"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                   locationString
                  </label>
                  <input
                    type="text"
                    name="locationString"
                    id="locationString"
                    onChange={OnChangeHandler}
                    className="bg-susBlack border sm:text-sm rounded-lg  block w-full p-2.5 border-susZGreen text-white"
                    required="true"
                  />
                </div>
          
                <div>
                  <label
                    htmlFor="locationLat"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                   locationLat
                  </label>
                  <input
                    type="text"
                    name="locationLat"
                    id="locationLat"
                    onChange={OnChangeHandler}
                    className="bg-susBlack border sm:text-sm rounded-lg  block w-full p-2.5 border-susZGreen text-white"
                    required="true"
                  />
                </div>
                <div>
                  <label
                    htmlFor="locationLong"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                   locationLong
                  </label>
                  <input
                    type="text"
                    name="locationLong"
                    id="locationLong"
                    onChange={OnChangeHandler}
                    className="bg-susBlack border sm:text-sm rounded-lg  block w-full p-2.5 border-susZGreen text-white"
                    required="true"
                  />
                </div>

                <button
                  onClick={onSubmit}
                  type="submit"
                  className="w-full border text-white bg-primary-600 hover:bg-susZGreen hover:text-susBlack focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 "
                >
                  Send Proposal
                </button>

                <p className="text-sm text-white ">
                  Changed your mind?{" "}
                  <a
                    href="/producerDashBoard"
                    className="font-medium text-white hover:underline dark:text-primary-500"
                  >
                    Go back
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>

  )
}
