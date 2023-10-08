import React, {useEffect} from 'react'
import Sidebar from "../../components/Sidebar/Sidebar";
import Chat from "../../components/Chat/Chat";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

function Homepage() {
    const history = useNavigate();
    const userLogin = useSelector((state) => state.user)
    const {access_token} = userLogin

    useEffect(() => {
        if(!access_token) {
            history('/signin')
        }
    },[access_token])
    return (
        <>
            <Sidebar/>
            <Chat/>


        </>
    )
}

export default Homepage