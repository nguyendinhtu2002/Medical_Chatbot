import React, { useEffect, useState } from "react";
import logo_blur from "../../dist/assets/img/logo_blur.png";
import { Link } from "react-router-dom";
import { resetUser, updateUser } from "../../features/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import { useUserMutationHook } from "../../hooks/useUserMutationHook";
import * as GroupService from "../../services/GroupService";
import { resetGroup, updateGroup } from "../../features/GroupSlice";

function Sidebar() {
  const dispatch = useDispatch();
  const [userBtn, setUserBtn] = useState(false);
  const handleUserBtn = () => {
    setUserBtn(!userBtn);
  };
  const userLogin = useSelector((state) => state.user);
  const { id } = userLogin;
  const groupsList = useSelector((state) => state.groups);
  const { groups } = groupsList;
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(resetUser());
    dispatch(resetGroup());
    localStorage.removeItem("token");
    window.location.href = "/signin";
  };

  const mutation = useUserMutationHook(
    async (data) => await GroupService.createThread(data)
  );

  const { data, error, isLoading, isError, isSuccess } = mutation;

  const handleThread = (e) => {
    e.preventDefault();

    mutation.mutate({
      user: id,
      nameGroup: "New Chat",
    });
  };
  useEffect(() => {
    if (!error && isSuccess) {
      dispatch(
        updateGroup({
          user: id,
          nameGroup: "New Chat",
          _id: data.data._id,
          countMessage: 0,
          messages: [],
        })
      );
    } else if (error) {
      //   if (!toast.isActive(toastId.current)) {
      //     toastId.current = toast.error(
      //       error.response.data.message,
      //       Toastobjects
      //     );
      //   }
      alert("Co loi");
    }
  }, [isSuccess, error]);
  return (
    <>
      {/*<button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar"*/}
      {/*        aria-controls="default-sidebar" type="button"*/}
      {/*        className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200">*/}
      {/*    <span className="sr-only">Open sidebar</span>*/}
      {/*    <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"*/}
      {/*         xmlns="http://www.w3.org/2000/svg">*/}
      {/*        <path clip-rule="evenodd" fill-rule="evenodd"*/}
      {/*              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>*/}
      {/*    </svg>*/}
      {/*</button>*/}

      <aside
        id="default-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
      >
        <div className="w-[70px] h-[65px] mx-auto">
          <Link href="/">
            <img src={logo_blur} alt="logo" />
          </Link>
        </div>
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50">
          <ul className="space-y-2 font-medium">
            {/*Start thread*/}
            {groups?.map((item) => (
              <li>
                <Link
                  to={`/g/${item._id}`}
                  className="flex justify-between items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
                >
                  <span className="flex whitespace-nowrap">
                    {item.nameGroup}
                  </span>
                  <span className="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                    {item.countMessage}
                  </span>
                </Link>
              </li>
            ))}

            {/*End thread*/}
          </ul>
        </div>
        <div className="absolute space-y-2 bottom-0 w-60">
          <a
            type="button"
            onClick={handleThread}
            className="flex justify-between items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
          >
            <span className="flex whitespace-nowrap">New Chat</span>
            <span className="inline-flex items-center w-7 h-7 p-2 ml-3 text-sm font-medium bg-black rounded-full">
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 18"
              >
                <path
                  stroke="white"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 1v16M1 9h16"
                />
              </svg>
            </span>
          </a>

          <a
            type="button"
            onClick={handleUserBtn}
            className="flex justify-between items-center p-2 text-white rounded-lg bg-black cursor-pointer hover:bg-gray-900 group"
          >
            <span className="flex whitespace-nowrap">Username</span>
            <span className="inline-flex items-center w-7 h-7 p-2 ml-3 text-sm  font-medium rounded-full">
              ...
            </span>
            {userBtn && (
              <>
                <div className="top-0 -translate-y-12 left-0 space-y-2 absolute z-60 text-white w-60 p-2 rounded-lg bg-gray-700">
                  <a className="flex hover:bg-gray-500 p-2 rounded">
                    Change Password
                  </a>
                  <a
                    className="flex hover:bg-gray-500 p-2 rounded"
                    onClick={handleLogout}
                  >
                    Logout
                  </a>
                </div>
              </>
            )}
          </a>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
