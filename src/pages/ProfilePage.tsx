import { UserAuth } from '../context/AuthContext';
import Navbar from '../components/NavBar';

const ProfilePage = () => {
    const { session } = UserAuth() as { session: any | null };

    return (
        <>
            <Navbar />
            <div>
                <h1 className="text-3xl font-bold text-gray-800">Profile</h1>
                <p className="text-gray-600 mt-4">This is your profile page.</p>
                {session?.user && (
                    <div className="mt-6 p-4 w-[50%] m-auto border border-gray-300 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold text-gray-700">User Information</h2>
                        <p className="text-gray-600 mt-2">Email: {session?.user?.email}</p>
                        <p className="text-gray-600 mt-2">Created At: {session?.user?.created_at.split('T')[0]}</p>
                    </div>
                )}
            </div>
        </>
    )
}

export default ProfilePage