import React from 'react'
import logo_blur from "../../dist/assets/img/logo_blur.png"

function ForgotPassword() {
    return (
        <>
            <div className="">
                <div className="w-[136px] h-[100px] my-5 mx-auto">
                    <a href="">
                        <img src={logo_blur} alt="logo"/>
                    </a>
                </div>
                <h1 className="mt-10 uppercase text-xl text-center font-bold">Forgot Password</h1>
                <h3 className="mt-3 text-[#000000]/50 text-center">Enter email address to recover your password</h3>
            </div>
            <div className="mt-5 mx-auto space-y-5 w-[400px]">
                <div className="">
                    <label htmlFor="email" className="font-medium">Email</label>
                    <input type="text" id="email"
                           className="block w-full bg-[#F0F0F0] rounded-lg border-0 py-3 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-[#A4A4A4] focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                           placeholder="Enter your email address"/>
                </div>
                <button
                    className="bg-[#3A37D5] text-white capitalize w-full py-3 px-5 rounded-lg hover:bg-[#3A37D5]/80">Continue
                </button>
            </div>
        </>
)
}
export default ForgotPassword