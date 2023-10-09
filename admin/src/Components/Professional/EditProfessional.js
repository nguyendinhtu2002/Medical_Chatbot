import React, { useState, useEffect } from "react";
import Toast from "./../LoadingError/Toast";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/LoadingError";
import { useMutationHooks } from "../../hooks/useMutationHooks";
import { useQuery } from "react-query";
import * as MessageService from "../../Services/MessageService";
import { toast } from "react-toastify";

const ToastObjects = {
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 2000,
};

const EditProfessional = (props) => {
    const { id } = props;
    const [message, setMessage] = useState("");
    const [differentMessage, setDifferentMessage] = useState("");

    const dispatch = useDispatch();

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
    const handleGetDetailsVoucher = async () => {
        const access_token = JSON.parse(localStorage.getItem("access_token"));
        const res = await MessageService.getDetilsPay(id, access_token);
        setMessage(res.message);
        setDifferentMessage(res.differentMessage);
        // setStatus(res.status);
        return res;
    };
    const mutation = useMutationHooks((data) => {
        const { id, access_token, ...rests } = data;
        MessageService.updatePay(id, rests, access_token);
    });
    const { data, error, isLoading, isError, isSuccess } = mutation;
    const handleUpdate = (e) => {
        e.preventDefault();
        const access_token = JSON.parse(localStorage.getItem("access_token"));

        mutation.mutate({
            id: id,
            message,
            differentMessage,
            access_token,
        });

        // mutation.mutate(decoded?.id, { phone, name, email, sex })
    };

    const { isLoading: getDetail, data: dataDetail } = useQuery(
        ["products"],
        handleGetDetailsVoucher
    );
    useEffect(() => {
        if (dataDetail) {
        }
    }, [dataDetail]);
    useEffect(() => {
        if (!error && isSuccess) {
            if (!toast.isActive(toastId.current)) {
                toastId.current = toast.success("Thành công!", Toastobjects);
            }
        } else if (error) {
            if (!toast.isActive(toastId.current)) {
                toastId.current = toast.error(
                    error.response.data.message,
                    Toastobjects
                );
            }
        }
    }, [id, error, isSuccess]);
    return (
        <>
            <Toast />
            <section className="content-main" style={{ maxWidth: "1200px" }}>
                <form onSubmit={handleUpdate}>
                    <div className="content-header">
                        <Link to="/professional" className="btn btn-danger text-white">
                            Go to professional
                        </Link>
                        <h2 className="content-title">Edit Message</h2>
                        <div>
                            <button type="submit" className="btn btn-primary">
                                Edit now
                            </button>
                        </div>
                    </div>

                    <div className="row mb-4">
                        <div className="col-xl-12 col-lg-12">
                            <div className="card mb-4 shadow-sm">
                                <div className="card-body">
                                    {/* Error Loading */}
                                    {false && <Message variant="alert-danger">error</Message>}
                                    {/* Update Loading */}

                                    {/* {productSingleStatus && <Loading />} */}

                                    {/* productSingleStatus Loading */}
                                    {getDetail ? (
                                        <Loading />
                                    ) : (
                                        <>
                                            <div className="mb-4">
                                                <label htmlFor="discount" className="form-label">Message</label>
                                                <input
                                                    type="text"
                                                    placeholder="Type here"
                                                    className="form-control"
                                                    id="discount"
                                                    required
                                                    value={message}
                                                    onChange={(e) => setMessage(e.target.value)}
                                                />
                                            </div>

                                            <div className="mb-4">
                                                <label htmlFor="expiryDays" className="form-label">Thời gian giảm giá</label>
                                                <input
                                                    type="text"
                                                    placeholder="Type here"
                                                    className="form-control"
                                                    id="expiryDays"
                                                    required
                                                    value={differentMessage}
                                                    onChange={(e) => setDifferentMessage(e.target.value)}
                                                />
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </section>
        </>
    );
};

export default EditProfessional
