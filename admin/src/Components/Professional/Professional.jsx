import React from 'react'
import {Link} from "react-router-dom";
import Toast from "../LoadingError/Toast";
import Table from "../Table/Table";

function Professional() {
    const columns = [
        {
            name: "User Name",
            selector: (row) => row.name,
        },
        {
            name: "Question",
            selector: (row) => row.message,
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
                        to={`/users/${row._id}/edit`}
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
            <Toast />
            <Table data={data} columns={columns} sub={true} />

        </>
    )
}

export default Professional
