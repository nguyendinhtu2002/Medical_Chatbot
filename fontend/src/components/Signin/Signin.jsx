import React from 'react'
import logo_blur from "../../assets/img/logo_blur.png"

function Signin() {
    return (
        <>
            <div className="">
                <div className="w-[136px] h-[100px] my-5 mx-auto">
                    <a href="">
                        <img src={logo_blur} alt="logo"/>
                    </a>
                </div>
                <h1 className="mt-10 uppercase text-xl text-center font-bold">Welcome back</h1>
            </div>
            <div className="mt-5 mx-auto space-y-5 w-[400px]">
                <div className="text-start">
                    <label htmlFor="email" className="font-medium ">Email</label>
                    <input type="text" id="email"
                           className="block w-full bg-[#F0F0F0] rounded-lg border-0 py-3 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-[#A4A4A4] focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                           placeholder="Enter your email address"/>
                </div>
                <div className="text-start">
                    <label htmlFor="password" className="font-medium">Password</label>
                    <input type="password" id="password"
                           className="block w-full bg-[#F0F0F0] rounded-lg border-0 py-3 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-[#A4A4A4] focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                           placeholder="At least 8 characters"/>
                        <div className="text-end ">
                            <a href="" className="text-[#167EE6] text-sm font-medium hover:cursor-pointer ">Forgot
                                Password?</a>
                        </div>
                </div>
                <button
                    className="bg-[#3A37D5] text-white capitalize w-full py-3 px-5 rounded-lg hover:bg-[#3A37D5]/80">Sign
                    in
                </button>

                <div className="text-center">
            <span className="font-semibold text-lg">Don't have an account? <span><a href=""
                                                                                    className="text-[#F8DA4B]">Register</a></span></span>
                </div>
            </div>
        </>
)
}
export default Signin