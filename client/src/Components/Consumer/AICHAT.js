import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AICHAT() {

    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');

    let navigate = useNavigate();

    const handleUserInput = async () => {

        setMessages([...messages, { text: inputValue }]);

        let ls = localStorage.getItem("token");
        ls = JSON.parse(ls)

        const config = {
            headers: {
                "auth-token": ls
            }
        };

        const response = await axios.post('/api/ai/chat', { "query": inputValue }, config);

        console.log(response);

        const botResponse = response.data;

        
        setMessages([...messages, { text: botResponse}]);

        setInputValue('');
    };

    function onGoBack(e){
        e.preventDefault();
        navigate("/consumerDashBoard");
    };




    return (
        <>

            <div className="grid justify-center items-center w-screen h-screen overflow-auto">
           
                <div className="flex flex-row h-4/5 justify-between bg-susYGreen">

                    <div className="px-5 py-5 flex justify-between items-center bg-white border-b-2">
                        <div className="font-semibold text-2xl">Talk to Groot</div>
                    </div>

                    {/* message */}
                    <div className="w-full px-5 overflow-auto flex flex-col justify-between">
                        <div className="flex flex-col mt-5">
                            <div className="flex justify-start mb-4">
                                <div className="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white">
                                    I am Groot.
                                </div>
                            </div>
                            <div className="overscroll-auto">
                                {messages.map((message, index) => (
                                    <div key={index} className="overflow-auto">
                                        {message.text}
                                        <div>---------------------------------------------------------</div>
                                    </div>
                                    
                                ))}
                            </div>
                        </div>

                        
                        <div className="flex py-5">

                            <input
                                value={inputValue}
                                className="w-full bg-gray-300 py-5 px-3 rounded-xl"
                                type="text"
                                onChange={(e) => setInputValue(e.target.value)} 
                                placeholder="type your message here..."
                            />
                             <button className='p-2 border bg-white rounded-lg' onClick={handleUserInput}>Send</button>
                        </div>

                        
                    </div>

                    <div className="w-2/5 border-l-2 px-5">
                        <div className="flex flex-col">
                            <div className="font-semibold text-xl py-4">Groot is a Fine tuned AI model which can talk to you everything regarding renewable sources</div>
                            <div className="font-semibold py-4">Created 24 Apr 2023</div>

                        </div>
                        <button onClick={onGoBack} className=" border-white font-semibold hover:bg-susYGreen hover:text-susBlack w-40 h-10 py-1 mr-3 mt-10 mb-10 text-white text-center border">Go Back</button>

                    </div>
                </div>
            </div>
        </>

    )
}
