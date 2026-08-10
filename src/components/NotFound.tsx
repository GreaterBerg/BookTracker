import { useNavigate } from 'react-router-dom'

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div>
            <h1 className="text-4xl font-bold text-gray-800">404 - Page Not Found</h1>
            <p className="text-gray-600 mt-4">The page you are looking for does not exist.</p>
            <button onClick={() => navigate('/profile')} className="mt-6 px-4 py-2 bg-blue-500 cursor-pointer text-white rounded hover:bg-blue-600 transition-colors">
                Go to Home
            </button>
        </div>
    )
}

export default NotFound