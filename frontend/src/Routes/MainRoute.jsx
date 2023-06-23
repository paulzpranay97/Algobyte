import { Route, Routes } from "react-router-dom";
import Login from "../Components/Login";
import SignUp from "../Components/SignUp";
import { Chat } from "../Pages/Chat/Chat";


function MainRoute(){

    return(
        <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<SignUp/>}/>
            <Route path="/chat" element={<Chat/>}/>
        </Routes>
    )
}


export default MainRoute;