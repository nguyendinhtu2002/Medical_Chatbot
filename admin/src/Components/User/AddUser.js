import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Toast from "../LoadingError/Toast";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/LoadingError";
import { useMutationHooks } from "../../hooks/useMutationHooks";
import * as UserService from "../../Services/UserService";

const AddProductMain = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState();
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

  // const mutationAddCategory = useMutationHooks((data) => {
  //   const { access_token, ...rests } = data;
  //   const res = UserService.createCategory(rests, access_token);
  //   return res;
  // });
  //
  // const submitHandler = async (event) => {
  //   event.preventDefault();
  //   if (name === "") {
  //     if (!toast.isActive(toastId.current)) {
  //       toastId.current = toast.error("Không được để trống!", Toastobjects);
  //     }
  //   } else {
  //     const access_token = JSON.parse(localStorage.getItem("access_token"));
  //     mutationAddCategory.mutate({
  //       name,
  //       access_token,
  //     });
  //   }
  // };
  //
  // const { error, isLoading, isSuccess, isError } = mutationAddCategory;
  // useEffect(() => {
  //   if (!error && isSuccess) {
  //     if (!toast.isActive(toastId.current)) {
  //       toastId.current = toast.success("Thành công!", Toastobjects);
  //     }
  //   } else if (error) {
  //     if (!toast.isActive(toastId.current)) {
  //       toastId.current = toast.error(
  //         error.response.data.message,
  //         Toastobjects
  //       );
  //     }
  //   }
  // }, [error, isSuccess]);
  return (
    <>
      <Toast />
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form >
          <div className="content-header">
            <Link to="/category" className="btn btn-danger text-white">
              Return to Users
            </Link>
            <h2 className="content-title">Add New User</h2>
            <div>
              <button type="submit" className="btn btn-primary">
                Accept Add
              </button>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-xl-12 col-lg-12">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  {/* {error && <Message variant="alert-danger">{error}</Message>}
                  {loading && <Loading />} */}
                  <div className="mb-4">
                    <label htmlFor="firstName" className="form-label">
                      First Name
                    </label>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="form-control"
                      id="firstName"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="lastName" className="form-label">
                      Last Name
                    </label>
                    <input
                        type="text"
                        placeholder="Type here"
                        className="form-control"
                        id="lastName"
                        required
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                        type="text"
                        placeholder="Type here"
                        className="form-control"
                        id="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="role" className="form-label">
                      Role
                    </label>
                    <div className="d-flex gap-4">
                      <div className="">
                        <input
                            type="radio"
                            id="user"
                            name="role"
                            value="user"
                            onChange={() => setRole("user")}
                        />
                        <label htmlFor="user" className="m-1">
                          User
                        </label>

                      </div>

                      <div className="">
                        <input
                            type="radio"
                            id="doctor"
                            name="role"
                            value="doctor"
                            onChange={() => setRole("doctor")}
                        />
                        <label htmlFor="doctor" className="m-1">
                          Doctor
                        </label>
                      </div>

                      <div className="">
                        <input
                            type="radio"
                            id="specialist"
                            name="role"
                            value="specialist"
                            onChange={() => setRole("specialist")}
                        />
                        <label htmlFor="specialist" className="m-1">
                          Specialist
                        </label>
                      </div>

                      <div className="">
                        <input
                            type="radio"
                            id="admin"
                            name="role"
                            value="admin"
                            onChange={() => setRole("admin")}
                        />
                        <label htmlFor="doctor" className="m-1">
                          Admin
                        </label>
                      </div>

                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default AddProductMain;
