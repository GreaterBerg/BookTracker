import React, { useContext } from 'react';
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { session } = UserAuth() as { session: any | null };
    const navigate = useNavigate();

    if (session === undefined) {
        return <p className="text-center">Loading...</p>;
    }

    return (
        <>
        {session ? children : (
            <>
                <p className="text-center">Please sign in to view this content.</p>
                <button
                    onClick={() => navigate('/signIn')}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-200">
                    Go to Sign In
                </button>
            </>
            )}
        </>
    )
}

export default ProtectedRoute