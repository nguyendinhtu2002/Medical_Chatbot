import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {updateMessage} from "../../features/MessageSlice";
import * as MessageService from "../../services/MessageService";
import {useUserMutationHook} from "../../hooks/useUserMutationHook";
import {useParams} from "react-router-dom";
import LoaderIcon from "react-loader-icon";
import {updateCount, updateMessageToGroup} from "../../features/GroupSlice";

function Chat() {
    const [message, setMessage] = useState("");
    const [messageTemp, setMessageTemp] = useState("");
    const [statusSend, setStatus] = useState(false);
    //   const [nameThread, setName] = useState("");
    const dispatch = useDispatch();
    const messageList = useSelector((state) => state.messages);
    let messages = [];
    let nameThread = "";

    const groupsList = useSelector((state) => state.groups);
    const {groups} = groupsList;

    let {id: idGroup} = useParams();

    if (idGroup) {
        const selectedGroup = groups.find((group) => group._id === idGroup);
        if (selectedGroup) {
            messages = selectedGroup.messages;
            nameThread = selectedGroup.nameGroup;
        }
    }

    //   const { messages } = selectedGroup;
    const mutation = useUserMutationHook(
        async (data) => await MessageService.createMessage(data)
    );
    const {data, error, isLoading, isError, isSuccess} = mutation;

    const userLogin = useSelector((state) => state.user);
    const {id} = userLogin;

    const handelSend = () => {
        if (message.trim() === "") {
            return;
        }
        setMessageTemp(message);
        mutation.mutate({
            contentSend: message,
            sender: id,
            groupMessage: idGroup,
        });
        setMessage("");
        setStatus(true);
    };

    useEffect(() => {
        if (error === null && isSuccess) {
            dispatch(updateMessageToGroup(data.message));
            dispatch(updateCount({groupId: idGroup}));
            setStatus(false);
        } else if (error) {
            console.log("🚀 ~ file: Chat.jsx:64 ~ useEffect ~ error:", error);
        }
    }, [isSuccess, error]);

    return (
        <>
            <div className="p-4 sm:ml-64 flex-1 p:2 sm:p-6 justify-between flex flex-col h-screen">
                <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
                    <div className="relative flex items-center space-x-4">
                        <div className="flex flex-col leading-tight">
                            <div className="text-2xl mt-1 flex items-center">
                <span className={idGroup ? "text-gray-700 mr-3" : "hidden"}>
                  {nameThread}
                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button
                            type="button"
                            className="inline-flex items-center justify-center rounded-lg border h-10 w-10 transition duration-500 ease-in-out text-white bg-black hover:bg-gray-300 focus:outline-none"
                        >
                            <i className="fa fa-pencil-square" style={{fontSize: '20px'}}></i>

                        </button>

                        <button
                            type="button"
                            className="inline-flex items-center justify-center rounded-lg border h-10 w-10 transition duration-500 ease-in-out text-white bg-red-500 hover:bg-gray-300 focus:outline-none"
                        >
                            <i className="fa fa-trash" style={{fontSize: '20px'}}></i>

                        </button>
                    </div>
                </div>
                <div
                    id="messages"
                    className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
                >
                    {messages.map((item, index) => (
                        <>
                            <div key={index} className="chat-message">
                                <div className="flex items-end justify-end">
                                    <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
                                        <div>
                      <span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white">
                        {item.contentSend}
                      </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="chat-message">
                                <div className="flex items-end">
                                    <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                                        <div>
                      <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">
                        {item.contentRep}
                      </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    ))}

                    {/* Hiển thị tin nhắn tạm thời khi đang gửi */}
                    {statusSend && (
                        <>
                            <div className="chat-message">
                                <div className="flex items-end justify-end">
                                    <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
                                        <div>
                      <span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white">
                        {messageTemp}
                      </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="chat-message">
                                <div className="flex items-end">
                                    <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                                        <div>
                      <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600 relative">
                        {/*<LoaderIcon type={"bars"}/>*/}
                          Tin nhắn reply
                          <span className="">
                              <div className="text-end h-2 relative">
                              <i className="fa fa-check-circle absolute top-0" aria-hidden="true"></i>
                             </div>
                              <div className="absolute mt-2 p-1 rounded-lg border text-black bg-[#F5C33B]">
                                  Sau đây là thông tin được sửa bởi chuyên gia
                              </div>
                          </span>

                      </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
                <div
                    className={
                        idGroup
                            ? "border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0"
                            : "hidden"
                    }
                >
                    <div className="relative flex">
            <textarea
                className="w-full focus:outline-none text-gray-600 bg-gray-200 rounded-md p-3"
                placeholder="Write your message!"
                onChange={(e) => setMessage(e.target.value)}
                value={message}
                style={{paddingLeft: "40px"}}
            />
                        <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">
                            <button
                                type="button"
                                className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover-bg-blue-400 focus:outline-none"
                                disabled={statusSend}
                                onClick={(e) => handelSend()}
                            >
                                <span className="font-bold">Send</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className="h-6 w-6 ml-2 transform rotate-90"
                                >
                                    <path
                                        d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Chat;
