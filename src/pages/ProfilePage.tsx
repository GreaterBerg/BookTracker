import { UserAuth } from '../context/AuthContext';
import Navbar from '../components/NavBar';
import { supabase } from '../supabaseClient';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
    const { session } = UserAuth() as { session: any | null };
    const [data, setData] = useState<any | null>(null);

    async function fetchProfileData() {
        if (!session) return;

        const { data, error } = await supabase
            .from('Profile Settings')
            .select('*')
            .eq('email', session.user.email)
            .single();
        
        if (error) {
            console.error('Error fetching profile data:', error);
        } else {
            console.log('Profile data:', data);
            setData(data);
        }
    }   

    useEffect(() => {
        fetchProfileData();
    }, [session]);

    const navigate = useNavigate()

    return (
        <div className="bg-gray-100 min-h-screen">
            <Navbar />
            <div className="m-4 shadow-lg rounded-lg p-4 h-[calc(100vh-130px)] bg-white">
                <p className="text-xl mb-4">Profile</p>
                <div>
                    <p className="text-sm my-4">Top Favorite Books</p>
                    <div className="flex flex-row justify-evenly my-10">
                        {Array.from({length: 3}).map((book) => (
                            <div className="flex flex-col items-center justify-center">
                                {  data?.favorite_book_2_cover ? (
                                    <img src={data?.favorite_book_2_cover} alt="Favorite Book 2" className="w-25 h-32 object-cover rounded-lg shadow-md" />
                                ) : (
                                    <div className="w-25 h-32 bg-gray-300 rounded-lg shadow-md flex items-center justify-center" onClick={() => navigate("/search")}>
                                        <p className="text-gray-500">set favorite book</p>
                                    </div>
                                ) }
                                <p className="text-lg mt-2">{data?.favorite_book_2_title}</p>
                            </div>
                        ))}
                        
                    </div>
                </div>
                <p className="text-lg mb-4">Username: {data?.username}</p>
                <p className="text-sm mb-4">Email: {session?.user.email}</p>
                <p className="text-sm mb-4">Account created on: {session?.user.created_at.split('T')[0]}</p>
            </div>
        </div>
    )
}

export default ProfilePage