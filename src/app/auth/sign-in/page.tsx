'use client';

import React, { FormEvent, useState } from 'react';
import InputField from 'components/fields/InputField';
import Default from 'components/auth/variants/DefaultAuthLayout';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';
import axios from 'axios';
import { getMessaging, getToken as getFCMToken } from 'firebase/messaging';
import { app } from '../../firebase';

function SignInDefault() {
  const [email, setEmail] = useState('');
  const [password, setPass] = useState('');
  const [error, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErr(null);
    setLoading(true);

    if (!email.trim() || !password.trim()) {
      setErr('يرجى ملء جميع الحقول.');
      setLoading(false);
      return;
    }

    try {
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') {
        setErr('يرجى السماح بالإشعارات للحصول على رمز FCM.');
        setLoading(false);
        return;
      }

      const messaging = getMessaging(app);
      const fcmToken = await getFCMToken(messaging, {
        vapidKey: process.env.NEXT_PUBLIC_VAPID_KEY!,
      });

      if (!fcmToken) {
        setErr('فشل في جلب FCM Token.');
        setLoading(false);
        return;
      }

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`,
        { email, password, fcm_token: fcmToken }
      );

      const token = res.data?.token;
      if (token) {
        localStorage.setItem('token', token);
        router.push('/admin/');
      } else {
        setErr('فشل تسجيل الدخول: لا يوجد توكين.');
      }
    } catch (err: any) {
      console.error('خطأ أثناء تسجيل الدخول:', err);
      setErr('فشل تسجيل الدخول أو فشل FCM Token.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Default
      maincard={
        <div className="flex h-screen w-full items-center justify-center bg-gray-50 px-4 dark:bg-gray-900">
          <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl dark:bg-gray-800">
            <h2 className="mb-2 text-center text-3xl font-extrabold text-gray-800 dark:text-white">
              تسجيل الدخول
            </h2>
            <p className="mb-6 text-center text-sm text-gray-500 dark:text-gray-300">
              أدخل بريدك الإلكتروني وكلمة المرور للمتابعة
            </p>

            {error && (
              <div className="mb-4 w-full rounded-md bg-red-100 p-3 text-sm text-red-700 dark:bg-red-900 dark:text-red-300">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <InputField
                variant="auth"
                label="البريد الإلكتروني*"
                placeholder="example@domain.com"
                id="email"
                type="email"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              />

              <div className="relative">
                <InputField
                  variant="auth"
                  label="كلمة المرور*"
                  placeholder="••••••••"
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPass(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-0 top-[45px] text-gray-500 hover:text-gray-700 dark:text-gray-300"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full transform rounded-xl py-3 text-base font-semibold text-white transition-all duration-300 ${
                  loading
                    ? 'bg-blue-300 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800'
                }`}
              >
                {loading ? 'جاري التحقق...' : 'تسجيل الدخول'}
              </button>
            </form>
          </div>
        </div>
      }
    />
  );
}

export default SignInDefault;
