import React from 'react'
import {Link} from "react-router-dom";
import Toast from "../LoadingError/Toast";
import Table from "../Table/Table";
import {toast} from "react-toastify";

import data from "./MOCK_DATA.json";
function Professional(props) {
    // const {data} = props;

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
    const customField = (row) => {
        if(row.length >100){
            return row.slice(0,200) + "..."
        }
        return row
    }
    const customFieldEmail = (row) => {
        if(row.length >10){
            return row.slice(0,20) + "..."
        }
        return row
    }
    const columns = [
        {
            name: "Email",
            selector: (row) => customFieldEmail(row.email),
        },
        {
            name: "Question",
            selector: (row) => customField(row.question),
        },
        {
            name: "Answer",
            selector: (row) => customField(row.answer),
        },
        {
            name: "Different Answer",
            selector: (row) => customField(row.different_answer),
        },
        {

            name: "Actions",
            selector: (row) => (
                <div className="d-flex " style={{width: "450px"}}>
                    <button
                        type="button"
                        className="btn btn-danger"
                    >
                        Accept
                    </button>
                    <Link
                        to={`/professional/${row._id}/edit`}
                        style={{paddingRight: "5px"}}
                        // className="btn btn-sm btn-outline-success p-2 pb-3 col-md-6"
                    >
                        <button className="btn btn-primary">Edit</button>
                    </Link>
                </div>

            ),
        },
    ]
    return (
        <>
            <Toast/>
            <Table data={data} columns={columns} sub={true}/>
        </>
    )
}

export default Professional
