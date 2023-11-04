import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signin from "./components/Signin/Signin";
import Signup from "./components/Signup/Signup";
import ForgotPassword from "./components/RecoverPassword/ForgotPassword";
import CreateNewPassword from "./components/RecoverPassword/CreateNewPassword";
import Homepage from "./pages/HomePage/Homepage";
import PrivateRoutes from "./PrivateRoutes";
import BlogPage from "./pages/BlogPage/BlogPage";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/*<Header></Header>*/}
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path={"/"} element={<Homepage />}></Route>
            <Route path={"/g/:id"} element={<Homepage />}></Route>

          </Route>
          <Route path={"/signin"} element={<Signin />}></Route>
          <Route path={"/signup"} element={<Signup />}></Route>
          <Route path={"/forgot-password"} element={<ForgotPassword />}></Route>
          <Route
            path={"/create-new-password"}
            element={<CreateNewPassword />}
          ></Route>

          <Route path={"/blog"} element={<BlogPage />}></Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
