"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function GoogleCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleGoogleCallback = async () => {
      try {
        // Get the authorization code from URL
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        const state = urlParams.get('state');
        
        // Verify state to prevent CSRF
        const savedState = sessionStorage.getItem('oauth_state');
        if (state !== savedState) {
          throw new Error('Invalid state parameter');
        }

        if (!code) {
          throw new Error('No authorization code found');
        }

        // Exchange the code for tokens
        const response = await axios.post(
          "http://localhost:3001/auth/google/callback",
          { code },
          { withCredentials: true }
        );

        if (response.data) {
          // Get redirect URL from sessionStorage or default to home
          const redirectUrl = sessionStorage.getItem('redirectAfterLogin') || '/';
          
          // Clear oauth state and redirect URL
          sessionStorage.removeItem('oauth_state');
          sessionStorage.removeItem('redirectAfterLogin');

          // Store user data
          if (response.data.sessionId) {
            sessionStorage.setItem("sessionId", response.data.sessionId);
          }
          if (response.data.user) {
            sessionStorage.setItem("user", JSON.stringify(response.data.user));
          }

          // Show success message
          await Swal.fire({
            title: "เข้าสู่ระบบสำเร็จ!",
            text: "ยินดีต้อนรับกลับเข้าสู่ระบบ!",
            icon: "success",
            confirmButtonText: "ตกลง",
            confirmButtonColor: "#77bfa3",
          });

          // Redirect
          router.push(redirectUrl);
        }
      } catch (error) {
        console.error('Google callback error:', error);
        
        // Show error message
        await Swal.fire({
          title: "เกิดข้อผิดพลาด!",
          text: "ไม่สามารถเข้าสู่ระบบด้วย Google ได้ กรุณาลองใหม่อีกครั้ง",
          icon: "error",
          confirmButtonText: "ตกลง",
          confirmButtonColor: "#d33",
        });

        router.push('/signin?error=google_auth_failed');
      }
    };

    handleGoogleCallback();
  }, [router]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-4">กำลังเข้าสู่ระบบ...</h2>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
      </div>
    </div>
  );
}
