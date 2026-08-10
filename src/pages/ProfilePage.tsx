import { UserAuth } from '../context/AuthContext';
import Navbar from '../components/NavBar';
import { supabase } from '../supabaseClient';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

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

    return (
        <div className="bg-gray-100 min-h-screen">
            <Navbar />
            <div className="m-4 shadow-lg rounded-lg p-4 h-[calc(100vh-130px)] bg-white">
                <div className="flex flex-col items-center h-full bg-gray-100 rounded-lg p-4 shadow-md overflow-x-auto w-[40vw]">
                    <p className="text-xl mb-4">Profile</p>
                    <p className="text-lg mb-4">Username: {data?.username}</p>
                    <p className="text-sm mb-4">Email: {session?.user.email}</p>
                    <p className="text-sm mb-4">Account created on: {session?.user.created_at.split('T')[0]}</p>
                    <button 
                        className="bg-gray-800 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-900 transition-colors my-10"
                        >
                            Update Profile
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage