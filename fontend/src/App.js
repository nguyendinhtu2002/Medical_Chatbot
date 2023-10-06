import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "./components/Header/Header";
import Signin from "./components/Signin/Signin";
import Signup from "./components/Signup/Signup";
import ForgotPassword from "./components/RecoverPassword/ForgotPassword";
import CreateNewPassword from "./components/RecoverPassword/CreateNewPassword";
import Homepage from "./pages/HomePage/Homepage";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Header></Header>
                <Routes>
                    <Route path={'/'} element={<Homepage/>}></Route>
                    <Route path={'/signin'} element={<Signin/>}></Route>
                    <Route path={'/signup'} element={<Signup/>}></Route>
                    <Route path={'/forgot-password'} element={<ForgotPassword/>}></Route>
                    <Route path={'/create-new-password'} element={<CreateNewPassword/>}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
