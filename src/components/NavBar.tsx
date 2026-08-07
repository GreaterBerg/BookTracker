import { UserAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const NavBar = () => {
    const { signOut } = UserAuth();
    const navigate = useNavigate();

    const handleSignOut = async (e) => {
        e.preventDefault();
        try {
            await signOut();
            navigate('/signIn');
        } catch (error) {
            console.error('Error signing out:', error);
        } 
    }

    return (
        <nav className="bg-gray-200 flex items-center justify-between m-3 p-3 border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <p className="text-gray-500 text-xl font-bold cursor-pointer hover:text-gray-400 transition-colors" onClick={() => navigate('/home')}>
                BookTracker
            </p>
            <div className="flex items-center gap-4">
                <p onClick={() => navigate('/profile')} className="text-gray-500 hover:text-gray-400 cursor-pointer transition-colors">
                    Profile
                </p>
                <button onClick={handleSignOut} className="text-gray-500 hover:text-gray-400 cursor-pointer transition-colors px-4 py-2 border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    Sign Out
                </button>
            </div>
        </nav>
    )
}

export default NavBar