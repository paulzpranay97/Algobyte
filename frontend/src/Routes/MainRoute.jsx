import { Route, Routes } from "react-router-dom";
import Login from "../Components/Login";
import SignUp from "../Components/SignUp";


function MainRoute(){

    return(
        <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/singup" element={<SignUp/>}/>
        </Routes>
    )
}


export default MainRoute;