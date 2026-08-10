import { UserAuth } from '../context/AuthContext';
import Navbar from '../components/NavBar';
import { supabase } from '../supabaseClient';
import { useState } from 'react';

const ProfilePage = () => {
    const { session } = UserAuth() as { session: any | null };

    const [ username, setUsername ] = useState<string | null>("gx2bit");
    const [ bio, setBio ] = useState<string | null>("я крутой парень люблю вкусный чизбургер");

    const insertProfile = async () => {
        const profileData = {
            Username: username,
            Bio: bio,
        }

        const { data, error } = await supabase
            .from("Profile Settings")
            .insert([profileData])
            .single();
        if (error) {
            console.error('Error inserting profile:', error);
        } else {
            console.log('Profile inserted:', data);
        }
    }

    return (
        <div className="bg-gray-100 min-h-screen">
            <Navbar />
            <div className="m-4 shadow-lg rounded-lg p-4 h-[calc(100vh-130px)] bg-white">
                <div className="flex flex-col items-center h-full bg-gray-100 rounded-lg p-4 shadow-md overflow-x-auto w-[40vw]">
                    <p className="text-2xl mb-4">Profile</p>
                    <p className="text-sm mb-4">Email: {session?.user.email}</p>
                    <p className="text-sm mb-4">Account created on: {session?.user.created_at.split('T')[0]}</p>
                    <button 
                        className="bg-gray-800 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-900 transition-colors my-10"
                        onClick={insertProfile}>
                            Update Profile
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage