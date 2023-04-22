import React from 'react'
import {useState} from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Registration() {

    // let navigate = useNavigate();
    const [userData,setUserData] = useState({
        name:"",
        userName:"",
        email:"",
        password:"",
        password2:""
    })

    let {name,userName,email,password,password2}= userData;

    function OnChangeHandler(e){
        setUserData({
            ...userData,
            [e.target.name]:e.target.value
        })
        console.log(userData)
    }

    async  function OnSubmitHandlder(e){
        try {
            e.preventDefault();
            let { data } = await axios.post("/api/user/register", userData);
            alert(data.message)
            console.log(data.message)
           // navigate("/login");

        } catch (error) {
            alert(error.response.data.error);
            console.log(error)
        }
     }


    return (
        <section className="bg-stone-950">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-stone-950 rounded-lg shadow border-4 md:mt-0 sm:max-w-md xl:p-0  border-lime-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl text-white">
                            Create an account
                        </h1>
                        <form className="space-y-4 md:space-y-6" action="#">

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
                                    className="bg-black border sm:text-sm rounded-lg  block w-full p-2.5 border-lime-600 text-white"
                                    placeholder="Pablo Escobar"
                                    required="true"
                                />

                            </div>

                            <div>
                                <label
                                    htmlFor="name"
                                    className="block mb-2 text-sm font-medium text-white"
                                >
                                   User name
                                </label>

                                <input
                                    type="text"
                                    name="userName"
                                    id="userName"
                                    onChange={OnChangeHandler}
                                    className="bg-black border sm:text-sm rounded-lg  block w-full p-2.5 border-lime-600 placeholder-gray-400 text-white"
                                    placeholder="pabloEscobar_99"
                                    required="true"
                                />

                            </div>
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block mb-2 text-sm font-medium text-white"
                                >
                                 Email
                                </label>

                                <input
                                    type="text"
                                    name="email"
                                    id="email"
                                    onChange={OnChangeHandler}
                                    className="bg-black border sm:text-sm rounded-lg  block w-full p-2.5 border-lime-600 placeholder-gray-400 text-white"
                                    placeholder="name@company.com"
                                    required="true"
                                />

                            </div>

                            <div>
                                <label
                                    htmlFor="role"
                                    className="block mb-2 text-sm font-medium text-white"
                                >
                                 Role
                                </label>

                                <input
                                    type="text"
                                    name="role"
                                    id="role"
                                    onChange={OnChangeHandler}
                                    className="bg-black border sm:text-sm rounded-lg  block w-full p-2.5 border-lime-600 placeholder-gray-400 text-white"
                                    placeholder="producer / consumer"
                                    required="true"
                                />

                            </div>


                            <div>
                                <label
                                    htmlFor="password"
                                    className="block mb-2 text-sm font-medium text-white"
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    onChange={OnChangeHandler}
                                    placeholder="••••••••"
                                    className="bg-black border  sm:text-sm rounded-lg  block w-full p-2.5 border-lime-600 placeholder-gray-400 text-white"
                                    required="true"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="confirm-password"
                                    className="block mb-2 text-sm font-medium text-white"
                                >
                                    Confirm password
                                </label>
                                <input
                                    type="password"
                                    name="password2"
                                    id="password2"
                                    onChange={OnChangeHandler}
                                    placeholder="••••••••"
                                    className="bg-black border sm:text-sm rounded-lg  block w-full p-2.5 border-lime-600 dark:placeholder-gray-400 text-white"
                                    required="true"
                                />
                            </div>
                          
                            <button
                                onClick={OnSubmitHandlder}
                                type="submit"
                                className="w-full text-white bg-primary-600 hover:bg-lime-700 hover:border focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800"
                            >
                                Create an account
                            </button>
                            <p className="text-sm font-light text-lime-500 ">
                                Already have an account?{" "}
                                <a
                                    href="/login"
                                    className="font-medium text-lime-600 hover:underline dark:text-primary-500"
                                >
                                    Login here
                                </a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>


    )
}
