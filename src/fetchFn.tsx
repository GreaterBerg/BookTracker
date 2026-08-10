import { UserAuth } from "./context/AuthContext";
import { supabase } from "./supabaseClient";

const API_OPTIONS = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
};
export default async function fetchFn(url: string) {
  const response = await fetch(url, API_OPTIONS);
  const jsonData = await response.json();
  console.log(jsonData);
  return jsonData;
}



// const { session } = UserAuth() as { session: any | null };
// export async function fetchProfileData() {
//         if (!session) return;

//         const { data, error } = await supabase
//             .from('Profile Settings')
//             .select('*')
//             .eq('email', session.user.email)
//             .single();
        
//         if (error) {
//             console.error('Error fetching profile data:', error);
//         } else {
//             console.log('Profile data:', data);
//             return data;
//         }
//     }   