import React from "react";
import Sidebar from "./../Components/sidebar";
import Header from "./../Components/Header";
import AddUser from "./../Components/User/AddUser";

const AddCategory = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <AddUser />
      </main>
    </>
  );
};

export default AddCategory;
