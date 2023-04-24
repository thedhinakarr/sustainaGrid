import React from 'react'

export default function LandingPage() {
  return (
    <div className="py-8 px-4 bg-[#000000] mx-auto justify-items-center h-screen w-screen text-center lg:py-16 lg:px-12">
    <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-[#A7D129] md:text-5xl lg:text-6xl "> SustainaGrid v1_0 </h1>
    <p className="mb-8 text-lg font-normal text-susZGreen lg:text-xl sm:px-16 xl:px-48 "> Bringing green energy to the masses, economically, efficiently. </p>
    <div clasName="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
        <a href="/register" className=" mr-4 inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg border border-gray-700 bg-primary-700 hover:bg-susYGreen focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
            Register
        </a>
        <a href="/login" className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg border border-gray-300 hover:bg-susYGreen focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-lime-700 dark:focus:ring-gray-800">
            Login
        </a>
    </div>

</div>

  )
}
