import React from "react";
import Sidebar from "./../Components/sidebar";
import Header from "./../Components/Header";
import Main from "./../Components/Professional/ProfessionalMain";

const ProfessionalScreen = () => {
    return (
        <>
            <Sidebar />
            <main className="main-wrap">
                <Header />
                <Main />
            </main>
        </>
    );
};

export default ProfessionalScreen;