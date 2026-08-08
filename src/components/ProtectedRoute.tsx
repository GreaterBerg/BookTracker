import { UserAuth } from "../context/AuthContext";
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { session } = UserAuth() as { session: any | null };
    const navigate = useNavigate();

    return (
        <>
        {session ? children : (
            <div className="text-center mt-10 m-auto py-10 px-5 border border-gray-300 rounded-lg shadow-md w-[50%] hover:shadow-lg transition-shadow ">
                <p className="text-center">Please sign in to view this content.</p>
                <button
                    onClick={() => navigate('/signIn')}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-200">
                    Go to Sign In
                </button>
            </div>
            )}
        </>
    )
}

export default ProtectedRoute