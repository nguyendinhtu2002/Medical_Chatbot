import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import LoginScreen from "./Screen/LoginScreen";
import HomeScreen from "./Screen/HomeScreen";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import UserMain from "./Components/User/Usermain";
import UserScreen from "./Screen/UserScreen";
import EditUserScreen from "./Screen/EditUserScreen";
import CategoryScreen from "./Screen/CategoryScreen";
import MessageScreen from "./Screen/MessageScreen";
import EditMessageScreen from "./Screen/EditMessageScreen";

import PrivateRoutes from "./PrivateRouter";
import * as UserService from "./Services/UserService";
import { updateUser } from "./features/userSlide/userSlide";
import jwt_decode from "jwt-decode";
import { isJsonString } from "./utils";
import ProfessionalScreen from "./Screen/ProfessionalScreen";
import EditProfessionalScreen from "./Screen/EditProfessionalScreen";
import AddUserSreen from "./Screen/AddUserScreen";

function App() {
  const userLogin = useSelector((state) => state.user);
  // const location = useLocation();

  const dispatch = useDispatch();
  const { email } = userLogin;
  const pageNumber = 1;

  useEffect(() => {
    const { storageData, decoded } = handleDecoded();
    if (decoded?.id) {
      handleGetDetailsUser(decoded?.id, storageData);
    }
    //  dispatch(updateUser({data}))
  }, []);
  const handleDecoded = () => {
    let storageData = localStorage.getItem("access_token");
    let token_refresh = localStorage.getItem("refresh_token");
    let decoded = {};
    if (storageData && isJsonString(storageData)) {
      storageData = JSON.parse(storageData);
      token_refresh = JSON.parse(token_refresh);
      decoded = jwt_decode(storageData);
    }
    return { decoded, storageData, token_refresh };
  };
  UserService.axiosJWT.interceptors.request.use(
    async (config) => {
      // Do something before request is sent
      const currentTime = new Date();
      const { decoded, token_refresh } = handleDecoded();
      // console.log(decoded?.exp < currentTime.getTime() / 1000)
      if (decoded?.exp < currentTime.getTime() / 1000) {
        const data = await UserService.refreshToken(token_refresh);
        console.log(data)

        config.headers["Authorization"] = `Bearer ${data?.access_token}`;
      }
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );
  const handleGetDetailsUser = async (id, token) => {
    const res = await UserService.getDetailsUser(id, token);
    dispatch(updateUser({ ...res?.data, access_token: token }));
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/professional" element={<ProfessionalScreen />} />
          <Route path="/professional/:id/edit" element={<EditProfessionalScreen />} />
          <Route path="/users" element={<UserScreen />} />
          <Route path="/users/add" element={<AddUserSreen />} />
          <Route path="/users/:id/edit" element={<EditUserScreen />} />

          <Route path="/category" element={<CategoryScreen />} />


          <Route path="/message" element={<MessageScreen />} />
          <Route path="/message/:id/edit" element={<EditMessageScreen />} />


        </Route>
        <Route path="/login" element={<LoginScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
