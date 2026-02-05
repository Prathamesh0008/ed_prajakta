'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';

export default function AccountPage() {
  const router = useRouter();
  const { loading, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (isAuthenticated) {
        router.push('/account/profile');
      } else {
        router.push('/auth/signin');
      }
    }
  }, [loading, isAuthenticated, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-[#8B0035] border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="mt-4 text-gray-600">Redirecting...</p>
      </div>
    </div>
  );
}




// // edpharma-webshop/app/account/page.jsx
// 'use client';

// import { useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { useAuth } from '@/app/context/AuthContext';

// export default function AccountPage() {
//   const router = useRouter();
//   const { loading, isAuthenticated } = useAuth();

//   useEffect(() => {
//     if (!loading) {
//       if (isAuthenticated) {
//         router.push('/account/profile');
//       } else {
//         router.push('/auth/signin');
//       }
//     }
//   }, [loading, isAuthenticated, router]);

//   return (
//     <div className="min-h-screen flex items-center justify-center">
//       <div className="text-center">
//         <div className="w-16 h-16 border-4 border-[#8B0035] border-t-transparent rounded-full animate-spin mx-auto"></div>
//         <p className="mt-4 text-gray-600">Redirecting...</p>
//       </div>
//     </div>
//   );
// }