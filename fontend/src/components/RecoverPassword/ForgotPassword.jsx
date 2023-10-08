import React, {useEffect, useState} from 'react'
import logo_blur from "../../dist/assets/img/logo_blur.png"
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import * as UserService from "../../services/UserService";
import {useUserMutationHook} from "../../hooks/useUserMutationHook";
import {toast} from "react-toastify";

function ForgotPassword() {
    const history = useNavigate();
    const [email, setEmail] = useState("");
    const userLogin = useSelector((state) => state.user);

    const {id} = userLogin;

    const toastId = React.useRef(null);
    const Toastobjects = {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    };
    const mutation = useUserMutationHook((data) => UserService.forgotPassword(data));
    const {data, error, isLoading, isError, isSuccess} = mutation;

    const submitHandler = async (e) => {
        e.preventDefault();
        mutation.mutate({
            email,
        });
    };

    useEffect(() => {
        if (error === null && isSuccess) {


            if (!toast.isActive(toastId.current)) {
                toastId.current = toast.success("Thành công", Toastobjects);
            }
            // history("/login");
        } else if (error) {
            if (!toast.isActive(toastId.current)) {
                toastId.current = toast.error(
                    error.response.data.message,
                    Toastobjects
                );
            }
        }
    }, [isSuccess, history, error]);
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
                           placeholder="Enter your email address"
                            onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <button
                    className="bg-[#3A37D5] text-white capitalize w-full py-3 px-5 rounded-lg hover:bg-[#3A37D5]/80">Continue
                </button>
            </div>
        </>
)
}
export default ForgotPassword