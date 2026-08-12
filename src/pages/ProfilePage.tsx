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
        <div className="min-h-screen bg-[var(--black)]">
            <Navbar />
            <div className="m-4 shadow-lg rounded-lg p-4 bg-[var(--gray)] border border-[var(--black)] border-3">
                <p className="text-xl">{data?.username}'s profile</p>
                <div>
                    <p className="text-sm my-4 ">Top Favorite Books</p>
                    <div className="flex flex-row gap-4 my-10 justify-center">
                        {Array.from({length: 3}).map(() => (
                            <div className="flex flex-col items-center justify-center rounded-lg shadow-2xl">
                                {  data?.favorite_book_2_cover ? (
                                    <img src={data?.favorite_book_2_cover} alt="Favorite Book 2" className="w-[10rem] h-[15rem] object-cover hover:border-3 border-[var(--black)]" />
                                ) : (
                                    <div className="w-[10rem] h-[15rem] bg-[var(--brown)] rounded-lg shadow-md flex items-center justify-center hover:border-3 border-[var(--black)]" onClick={() => navigate("/search")}>
                                        <p>set favorite book</p>
                                    </div>
                                ) }
                                <p className="text-lg mt-2">{data?.favorite_book_2_title}</p>
                            </div>
                        ))}
                        
                    </div>
                </div>
                <div>
                    <p>Recent Books</p>
                    <div className="flex flex-row gap-4 my-10 justify-center">
                        {Array.from({length: 5}).map(() => (
                            <div className="flex flex-col items-center justify-center">
                                {  data?.favorite_book_2_cover ? (
                                    <img src={data?.favorite_book_2_cover} alt="Favorite Book 2" className="w-[7rem] h-[10rem] object-cover rounded-lg shadow-md" />
                                ) : (
                                    <div className="w-[7rem] h-[10rem] bg-[var(--brown)] rounded-lg shadow-md flex items-center justify-center">
                                        <p>recent book</p>
                                    </div>
                                ) }
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <p>Want to Read</p>
                    <div className="flex flex-row gap-4 my-10 justify-center">
                        {Array.from({length: 5}).map(() => (
                            <div className="flex flex-col items-center justify-center">
                                {  data?.favorite_book_2_cover ? (
                                    <img src={data?.favorite_book_2_cover} alt="Favorite Book 2" className="w-[7rem] h-[10rem] object-cover rounded-lg shadow-md" />
                                ) : (
                                    <div className="w-[7rem] h-[10rem] bg-[var(--brown)] rounded-lg shadow-md flex items-center justify-center">
                                        <p>want to read</p>
                                    </div>
                                ) }
                            </div>
                        ))}
                    </div>
                </div>
                <p className="text-sm mb-4">Email: {session?.user.email}</p>
                <p className="text-sm mb-4">Account created on: {session?.user.created_at.split('T')[0]}</p>
            </div>
        </div>
    )
}

export default ProfilePage