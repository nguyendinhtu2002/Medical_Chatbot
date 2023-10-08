import React, { useEffect, useState } from "react";
import logo_blur from "../../dist/assets/img/logo_blur.png";
import { Link, useNavigate } from "react-router-dom";
import { useUserMutationHook } from "../../hooks/useUserMutationHook";
import * as UserService from "../../services/UserService";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../features/UserSlice";
import jwt_decode from "jwt-decode";
import Toast from "../../components/LoadingError/Toast";
import { toast } from "react-toastify";
import * as GroupService from "../../services/GroupService";
import { API } from "../../utils/apiURL";
import { updateGroup } from "../../features/GroupSlice";

function Signin() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [dataGroup, setData] = useState([]);

  const dispatch = useDispatch();

  const history = useNavigate();
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

  const userLogin = useSelector((state) => state.user);
  const { access_token } = userLogin;

  const mutation = useUserMutationHook((data) => UserService.loginUser(data));
  const { data, error, isLoading, isError, isSuccess } = mutation;

  const submitHandler = async (e) => {
    e.preventDefault();

    mutation.mutate({
      email,
      password,
    });
  };

  const handleGetDetailsUser = async (id, token) => {
    const res = await UserService.getDetailUser(id, token);

    dispatch(updateUser({ ...res?.data, access_token: token }));
  };
  useEffect(() => {
    const fetchData = async (id) => {
      try {
        const response = await fetch(`${API}/api/v1/group/${id}`);
        const result = await response.json();
        if (result.groups) {
          result.groups.forEach(async (group) => {
            // Fetch messages for this group
            const messagesResponse = await fetch(
              `${API}/api/v1/message/${group._id}`
            );
            const messagesResult = await messagesResponse.json();

            // Update the group with the fetched messages
            dispatch(
              updateGroup({ ...group, messages: messagesResult.messages })
            );
          });
        } else {
          dispatch(updateGroup([]));
        }
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu: ", error);
      }
    };
    if (error === null && isSuccess) {
      localStorage.setItem("access_token", JSON.stringify(data?.access_token));
      localStorage.setItem(
        "refresh_token",
        JSON.stringify(data?.refresh_token)
      );
      if (data?.access_token) {
        const decoded = jwt_decode(data?.access_token);

        if (decoded?.id) {
          handleGetDetailsUser(decoded?.id, data?.access_token);
        }
        if (!toast.isActive(toastId.current)) {
          toastId.current = toast.success("Thành công", Toastobjects);
        }
        fetchData(decoded?.id);

        history("/");
      }

      // dispatch(updateUser({ data }))
    } else if (error) {
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.error(
          error.response.data.message,
          Toastobjects
        );
      }
    }

    if (access_token !== "") {
      history("/");
    }
    if (dataGroup) {
      console.log(dataGroup);
    }
  }, [isSuccess, access_token, email, error, dataGroup]);
  return (
    <>
      <Toast />
      <div className="">
        <div className="w-[136px] h-[100px] my-5 mx-auto">
          <Link href="">
            <img src={logo_blur} alt="logo" />
          </Link>
        </div>
        <h1 className="mt-10 uppercase text-xl text-center font-bold">
          Welcome back
        </h1>
      </div>
      <div className="mt-5 mx-auto space-y-5 w-[400px]">
        <div className="text-start">
          <label htmlFor="email" className="font-medium ">
            Email
          </label>
          <input
            type="text"
            id="email"
            className="block w-full bg-[#F0F0F0] rounded-lg border-0 py-3 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-[#A4A4A4] focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Enter your email address"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="text-start">
          <label htmlFor="password" className="font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="block w-full bg-[#F0F0F0] rounded-lg border-0 py-3 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-[#A4A4A4] focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="At least 8 characters"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="text-end ">
            <Link
              to="/forgot-password"
              className="text-[#167EE6] text-sm font-medium hover:cursor-pointer "
            >
              Forgot Password?
            </Link>
          </div>
        </div>
        <button
          className="bg-[#3A37D5] text-white capitalize w-full py-3 px-5 rounded-lg hover:bg-[#3A37D5]/80"
          onClick={submitHandler}
        >
          Sign in
        </button>

        <div className="text-center">
          <span className="font-semibold text-lg">
            Don't have an account?{" "}
            <span>
              <Link to="/signup" className="text-[#F8DA4B]">
                Sign up
              </Link>
            </span>
          </span>
        </div>
      </div>
    </>
  );
}

export default Signin;
