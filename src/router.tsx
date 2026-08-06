import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import SignIn from "./components/signIn";
import SignUp from "./components/signUp";

export const router = createBrowserRouter([
    { path: "/", element: <App/> },
    { path: "/signIn", element: <SignIn/> },
    { path: "/signUp", element: <SignUp/> },
])