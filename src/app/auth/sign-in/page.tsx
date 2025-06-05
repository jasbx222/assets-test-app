'use client';

import React, { FormEvent } from 'react';
import InputField from 'components/fields/InputField';
import Default from 'components/auth/variants/DefaultAuthLayout';
import Checkbox from 'components/checkbox';
import { useRouter } from 'next/navigation';
import axios from 'axios';
// استيراد وظائف Firebase الخاصة بالرسائل
import { getMessaging, getToken as getFCMToken } from "firebase/messaging";
import {app} from '../../firebase'; 
function SignInDefault() {
  const [email, setEmail] = React.useState('');
  const [password, setPass] = React.useState('');
  const [error, setErr] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const route = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErr(null);
    setLoading(true);

    // تحقّق بسيط من الحقول
    if (!email.trim() || !password.trim()) {
      setErr('يرجى ملء جميع الحقول.');
      setLoading(false);
      return;
    }

    try {
      // طلب صلاحية الإشعارات
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') {
        setErr('يرجى السماح بالإشعارات للحصول على رمز FCM.');
        setLoading(false);
        return;
      }

      // جلب fcm token من Firebase Messaging
      const messaging = getMessaging(app);
      const fcmToken = await getFCMToken(messaging, {
        vapidKey: process.env.NEXT_PUBLIC_VAPID_KEY!,
      });

      if (!fcmToken) {
        setErr('فشل في جلب FCM Token.');
        setLoading(false);
        return;
      }

      // إرسال بيانات تسجيل الدخول إلى API
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`,
        {
          email,
          password,
          fcm_token: fcmToken,
        }
      );

      const token = res.data?.token;
      if (token) {
        localStorage.setItem('token', token);
        route.push('/admin/');
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
        <div className="mb-16 mt-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
          {/* قسم تسجيل الدخول */}
          <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
            <h3 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
              تسجيل الدخول
            </h3>
            <p className="mb-9 ml-1 text-base text-gray-600 dark:text-gray-400">
              أدخل بريدك الإلكتروني وكلمة المرور لتسجيل الدخول!
            </p>

            {/* عرض رسالة الخطأ */}
            {error && (
              <div className="mb-4 w-full rounded-md bg-red-100 p-3 text-sm text-red-700 dark:bg-red-900 dark:text-red-300">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="w-full">
              {/* البريد الإلكتروني */}
              <InputField
                variant="auth"
                extra="mb-3"
                label="البريد الإلكتروني*"
                placeholder="example@domain.com"
                id="email"
                type="text"
                value={email}
                onChange={(e:any) => setEmail(e.target.value)}
              />

              {/* كلمة المرور */}
              <InputField
                variant="auth"
                extra="mb-3"
                label="كلمة المرور*"
                placeholder="8 أحرف على الأقل"
                id="password"
                type="password"
                value={password}
                onChange={(e:any) => setPass(e.target.value)}
              />

              {/* خانة التذكّر ورابط نسيت كلمة المرور */}
              <div className="mb-4 flex items-center justify-between px-2">
                <div className="mt-2 flex items-center">
                  <Checkbox />
                  <p className="ml-2 text-sm font-medium text-navy-700 dark:text-white">
                    تذكرني
                  </p>
                </div>
                <a
                  className="text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
                  href="/auth/forgot-password"
                >
                  نسيت كلمة المرور؟
                </a>
              </div>

              {/* زر تسجيل الدخول */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full rounded-xl py-3 text-base font-medium text-white transition duration-200 ${
                  loading
                    ? 'bg-brand-300 cursor-not-allowed'
                    : 'bg-brand-500 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:bg-brand-200'
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
