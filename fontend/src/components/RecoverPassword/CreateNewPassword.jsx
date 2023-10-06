import React from 'react'
import logo_blur from "../../assets/img/logo_blur.png"
function CreateNewPassword() {
    return(
        <>
            <div className="">
                <div className="w-[136px] h-[100px] my-5 mx-auto">
                    <a href="">
                        <img src={logo_blur} alt="logo"/>
                    </a>
                </div>
                <h1 className="mt-10 uppercase text-xl text-center font-bold">Create new password</h1>
                <h3 className="mt-3 text-[#000000]/50 text-center">Enter new password with at least 8 characters</h3>

            </div>
            <div className="mt-5 mx-auto space-y-5 w-[400px]">
                <div className="">
                    <label htmlFor="newPassword" className="font-medium capitalize">New password</label>
                    <input type="password" id="newPassword"
                           className="block w-full bg-[#F0F0F0] rounded-lg border-0 py-3 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-[#A4A4A4] focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                           placeholder="At least 8 characters"/>
                </div>
                <div className="">
                    <label htmlFor="confirmPassword" className="font-medium capitalize">Confirm Password</label>
                    <input type="password" id="confirmPassword"
                           className="block w-full bg-[#F0F0F0] rounded-lg border-0 py-3 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-[#A4A4A4] focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                           placeholder="Confirm your password"/>
                </div>
                <button
                    className="bg-[#3A37D5] text-white capitalize w-full py-3 px-5 rounded-lg hover:bg-[#3A37D5]/80">Save
                </button>
            </div>
        </>
    )
}
export default CreateNewPassword