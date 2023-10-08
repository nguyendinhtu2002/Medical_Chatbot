import React, {useEffect, useState} from 'react'
import logo_blur from "../../dist/assets/img/logo_blur.png"
import {useDispatch, useSelector} from "react-redux";
import {useUserMutationHook} from "../../hooks/useUserMutationHook";
import * as UserService from "../../services/UserService";
import {useNavigate} from "react-router-dom";
import Toast from "../../components/LoadingError/Toast";
import {toast} from "react-toastify";
import {registerUser} from "../../services/UserService";

function Signup() {
    const history = useNavigate();
    const redirect = "/";
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isShowPassword, setIsShowPassword] = useState(false);
    const mutation = useUserMutationHook((data) => UserService.registerUser(data));
    const userLogin = useSelector((state) => state.user);

    const {data, error, isLoading, isError, isSuccess} = mutation;
    const {name: Name} = userLogin;
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

    const submitHandler = async (e) => {
        e.preventDefault();
        if (
            name === "" ||
            email === "" ||
            password === "" ||
            confirmPassword === ""
        ) {
            if (!toast.isActive(toastId.current)) {
                toastId.current = toast.error("Không được bỏ trống!");
            }
        } else {
            if (password !== confirmPassword) {
                if (!toast.isActive(toastId.current)) {
                    toastId.current = toast.error("Mật khẩu không giống nhau!");
                }
            } else {
                mutation.mutate({

                    email,
                    password,
                });
            }
        }
    };
    useEffect(() => {
        if (!error && isSuccess) {
            if (!toast.isActive(toastId.current)) {
                toastId.current = toast.success("Thành công", Toastobjects);
                history("/login");
            }
        } else if (error) {
            if (!toast.isActive(toastId.current)) {
                toastId.current = toast.error(
                    error.response.data.message,
                    Toastobjects
                );
            }
        }
    }, [isSuccess, error, name]);
    return (
        <>
            <div className="">
                <div className="w-[136px] h-[100px] my-5 mx-auto">
                    <a href="">
                        <img src={logo_blur} alt="logo"/>
                    </a>
                </div>
                <h1 className="mt-10 uppercase text-xl text-center font-bold">Create your account</h1>
            </div>
            <div className="mt-5 mx-auto space-y-5 w-[400px]">
                <div className="text-start">
                    <label htmlFor="email" className="font-medium">Email</label>
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
                </div>
                <div className="text-start">
                    <label htmlFor="confirmPassword" className="font-medium">Confirm Password</label>
                    <input type="password" id="confirmPassword"
                           className="block w-full bg-[#F0F0F0] rounded-lg border-0 py-3 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-[#A4A4A4] focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                           placeholder="Confirm your password"
                           onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <button
                    className="bg-[#3A37D5] text-white capitalize w-full py-3 px-5 rounded-lg hover:bg-[#3A37D5]/80"
                    onClick={submitHandler}
                >Sign up
                </button>
            </div>
        </>
    )
}

export default Signup