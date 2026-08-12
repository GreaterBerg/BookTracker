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
        <nav className="bg-[var(--gray)] flex items-center justify-between m-3 p-3 border border-3 border-[var(--black)] rounded-lg shadow-md h-[73px]">
            <p className="text-xl font-bold cursor-pointer hover:text-gray-400 transition-colors" onClick={() => navigate('/home')}>
                BookTracker
            </p>
            <div className="flex items-center gap-4">
                <p onClick={() => navigate('/profile')} className="hover:text-[var(--brown)] cursor-pointer transition-colors">
                    Profile
                </p>
                <button onClick={handleSignOut} className="text-[var(--white)] hover:text-[var(--brown)] cursor-pointer transition-colors px-4 py-2 border border-[var(--brown)] rounded-lg shadow-md hover:shadow-lg transition-shadow ">
                    Sign Out
                </button>
            </div>
        </nav>
    )
}

export default NavBar