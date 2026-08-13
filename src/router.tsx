import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import HomePage from "./pages/HomePage";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./components/NotFound";
import ProfilePage from "./pages/ProfilePage";
import SearchPage from "./pages/SearchPage";
import DetailsPage from "./pages/DetailsPage";

export const router = createBrowserRouter([
    { path: "/", element: <App/> },
    { path: "/signIn", element: <SignIn/> },
    { path: "/signUp", element: <SignUp/> },
    { path: "/home", element:
        <ProtectedRoute>
            <HomePage/>
        </ProtectedRoute>
     },
    { path: "/profile", element:
        <ProtectedRoute>
            <ProfilePage/>
        </ProtectedRoute>
    },
    { path: "*", element: <NotFound/> },
    { path: "/search", element: <SearchPage/> },
    { path: "/book/:bookName", element: <DetailsPage/> }
])