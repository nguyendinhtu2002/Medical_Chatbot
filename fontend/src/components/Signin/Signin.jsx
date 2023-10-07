import React, {useEffect, useState} from 'react'
import logo_blur from "../../dist/assets/img/logo_blur.png"
import {Link} from "react-router-dom";
import {userMutationHook} from "../../hooks/UserMutationHook";
import * as UserService from "../../services/UserService"
import {useDispatch, useSelector} from "react-redux";
import {updateUser} from "../../features/UserSlide";

function Signin() {
    const dispatch = useDispatch()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const userLogin = useSelector((state)=>state.user)
    const {id}= userLogin
    const handleEmail = () => {
        setEmail(email)
    }
    const handlePassword = () => {
        setPassword(password)
    }

    const mutation = userMutationHook((data) => UserService.loginUser(data))
    const {data, error, isLoading, isError, isSuccess} = mutation

    const submitHandler = async (e) => {
        e.preventDefault()

        mutation.mutate({
            email,
            password
        })
    }

    const handleGetDetailsUser= async(id,token)=>{
        const res=await UserService.getDetailUser(id,token)

        dispatch(updateUser({...res?.data,access_token:token}))
    }
    useEffect(()=>{
        if(error===null && isSuccess){
            localStorage.setItem("access_token",JSON.stringify(data?.access_token))
            localStorage.setItem("refresh_token",JSON.stringify(data?.refresh_token))
            if(data?.access_token){
                const decoded=jwt_decode(data?.access_token)
                if(decoded?.id){
                    handleGetDetailsUser(decoded?.id,data?.access_token)
                }
            }
        }
    },[isSuccess])
    return (
        <>
            <div className="">
                <div className="w-[136px] h-[100px] my-5 mx-auto">
                    <Link href="">
                        <img src={logo_blur} alt="logo"/>
                    </Link>
                </div>
                <h1 className="mt-10 uppercase text-xl text-center font-bold">Welcome back</h1>
            </div>
            <div className="mt-5 mx-auto space-y-5 w-[400px]">
                <div className="text-start">
                    <label htmlFor="email" className="font-medium ">Email</label>
                    <input type="text" id="email"
                           className="block w-full bg-[#F0F0F0] rounded-lg border-0 py-3 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-[#A4A4A4] focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                           placeholder="Enter your email address"
                           onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="text-start">
                    <label htmlFor="password" className="font-medium">Password</label>
                    <input type="password" id="password"
                           className="block w-full bg-[#F0F0F0] rounded-lg border-0 py-3 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-[#A4A4A4] focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                           placeholder="At least 8 characters"
                           onChange={(e) => setPassword(e.target.value)}

                    />
                    <div className="text-end ">
                        <Link to="/forgot-password"
                              className="text-[#167EE6] text-sm font-medium hover:cursor-pointer ">Forgot
                            Password?</Link>
                    </div>
                </div>
                <button
                    className="bg-[#3A37D5] text-white capitalize w-full py-3 px-5 rounded-lg hover:bg-[#3A37D5]/80"
                    onClick={submitHandler}
                >Sign
                    in
                </button>

                <div className="text-center">
            <span className="font-semibold text-lg">Don't have an account? <span><Link to="/register"
                                                                                       className="text-[#F8DA4B]">Register</Link></span></span>
                </div>
            </div>
        </>
    )
}

export default Signin