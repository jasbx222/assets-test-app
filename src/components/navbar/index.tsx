'use client';

import { useState, useEffect } from 'react';
import Dropdown from 'components/dropdown';
import { FiAlignJustify } from 'react-icons/fi';
import NavLink from 'components/link/NavLink';
import { RiMoonFill, RiSunFill } from 'react-icons/ri';
import { FaUser } from 'react-icons/fa';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Bell } from 'lucide-react';
import useGetnotific from 'hooks/useGetNotifcations';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const Navbar = (props: {
  onOpenSidenav: () => void;
  brandText: string;
  secondary?: boolean | string;
  [x: string]: any;
}) => {
  const { onOpenSidenav, brandText } = props;
  const [darkmode, setDarkmode] = useState(
    typeof window !== 'undefined' && document.body.classList.contains('dark'),
  );
  const [slice, setSlice] = useState(6);
  const [popupVisible, setPopupVisible] = useState(false);
  const [lastNotifId, setLastNotifId] = useState<string | null>(null);
  const navigate = useRouter();

  type NotificationItem = {
    id: string;
    notification: {
      title: string;
      body: string;
      report_id: number;
    };
    created_at: string;
    read_at: string | null;
  };

  const { data } = useGetnotific<NotificationItem>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/notification`,
  );

  // مراقبة وصول إشعار جديد
  useEffect(() => {
    if (data && data.length > 0) {
      const newest = data[0];
      if (newest.id !== lastNotifId) {
        setLastNotifId(newest.id);
        setPopupVisible(true);
        setTimeout(() => setPopupVisible(false), 4000); // اختفاء بعد 4 ثواني
      }
    }
  }, [data]);

  const handleLogout = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/logout`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then(() => {
        localStorage.clear();
        navigate.push('/login');
      })
      .catch(console.log);
  };

  const handleSliceChange = (newSlice: number) => {
    setSlice(newSlice);
  };

  return (
    <>
      {/* إشعار يطفو */}

       <AnimatePresence  >
        {popupVisible && data && data[0] && (
          <Link href={`/admin/reports/show/${data[0].notification.report_id}`}>
       <div  className='flex justify-center items-center'>
             <motion.div
              initial={{ opacity: 0, y: -50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              className="fixed top-5 z-[9999] md:right-24 right-5 w-[300px] rounded-xl bg-white p-4 shadow-lg dark:bg-navy-800 dark:text-white"
              dir="rtl"
            >
              <div className="flex flex-col gap-1">
                <p className="text-base font-semibold text-navy-700 dark:text-white">
                  {data[0].notification.title}
                </p>
                <span className="text-sm text-gray-800 dark:text-gray-300">
                  {data[0].notification.body}
                </span>
              </div>
            </motion.div>
       </div>
          </Link>
        )}
      </AnimatePresence>


      <nav
        dir="rtl"
        className="sticky top-4 z-40 flex flex-row flex-wrap items-center justify-between rounded-xl bg-white/10 p-2 backdrop-blur-xl dark:bg-[#0b14374d]"
      >
        <div className="mr-[6px]">
          <div className="h-6 w-[224px] pt-1">
            <a
              className="text-sm font-normal text-navy-700 hover:underline dark:text-white dark:hover:text-white"
              href=" "
            >
              الصفحات
              <span className="mx-1 text-sm text-navy-700 hover:text-navy-700 dark:text-white">
                {' / '}
              </span>
            </a>
            <NavLink
              className="text-sm font-normal capitalize text-navy-700 hover:underline dark:text-white dark:hover:text-white"
              href="#"
            >
              {brandText}
            </NavLink>
          </div>
          <p className="shrink text-[33px] capitalize text-navy-700 dark:text-white">
            <NavLink
              href="#"
              className="font-bold capitalize hover:text-navy-700 dark:hover:text-white"
            >
              {brandText}
            </NavLink>
          </p>
        </div>

        <div className="relative mt-[3px] flex h-[61px] w-full flex-grow items-center justify-around gap-2 rounded-full bg-white px-2 py-2 shadow-xl dark:!bg-navy-800 md:w-[365px] md:flex-grow-0 xl:w-[365px]">
          {/* الجرس */}
          <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
            <Dropdown
              button={
                <div className="flex w-full items-center justify-between gap-2 rounded-full px-4 py-2 transition-colors hover:bg-gray-100 dark:hover:bg-navy-800">
                  <div className="flex items-center gap-2">
                    <Bell className="h-5 w-5 text-red-600 dark:text-red-400" />
                    <span className="text-sm font-semibold text-red-600 dark:text-red-400">
                      {data?.length ?? 0} إشعارات
                    </span>
                  </div>
                </div>
              }
              classNames="py-2 top-10 right-0 w-[300px] z-50"
            >
              <div className="flex w-full flex-col gap-3 rounded-xl bg-white p-4 shadow-md dark:bg-navy-700" dir="rtl">
                {data?.slice(slice - 6, slice).map((notification) => (
                  <div
                    key={notification.id}
                    className="flex flex-col gap-1 rounded-lg border border-gray-200 bg-gray-50 p-3 transition hover:bg-gray-100 dark:border-navy-600 dark:bg-navy-600 dark:hover:bg-navy-500"
                  >
                    <Link href={`/admin/reports/show/${notification.notification.report_id}`}>
                      <p className="text-sm font-medium text-gray-800 dark:text-white">
                        {notification?.notification.title}
                      </p>
                    </Link>
                    <span className="text-xs text-gray-800 dark:text-gray-300">
                      {new Date(notification.created_at).toLocaleString()}
                    </span>
                  </div>
                ))}
                <div className="flex items-center justify-center space-x-2 space-x-reverse">
                  <button
                    onClick={() => handleSliceChange(slice - 6)}
                    disabled={slice <= 6}
                    className="rounded-md bg-gray-200 px-3 py-1 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
                  >
                    السابق
                  </button>
                  <span className="text-sm text-gray-600">
                    عرض {slice} من {data?.length}
                  </span>
                  <button
                    onClick={() => handleSliceChange(slice + 6)}
                    disabled={slice >= (data?.length ?? 0)}
                    className="rounded-md bg-gray-200 px-3 py-1 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
                  >
                    التالي
                  </button>
                </div>
              </div>
            </Dropdown>
          </div>

          {/* زر فتح القائمة الجانبية */}
          <span
            className="flex cursor-pointer text-xl text-gray-600 dark:text-white xl:hidden"
            onClick={onOpenSidenav}
          >
            <FiAlignJustify className="h-5 w-5" />
          </span>

          {/* زر تبديل الثيم */}
          <div
            className="cursor-pointer text-gray-600"
            onClick={() => {
              document.body.classList.toggle('dark');
              setDarkmode(!darkmode);
            }}
          >
            {darkmode ? (
              <RiSunFill className="h-4 w-4" />
            ) : (
              <RiMoonFill className="h-4 w-4" />
            )}
          </div>

          {/* القائمة الشخصية */}
          <Dropdown
            button={<FaUser className='dark:text-white' />}
            classNames={'py-2 top-8  -right-[180px] w-max'}
          >
            <div
              className="flex fixed text-center h-48 w-56 flex-col justify-start rounded-[20px] bg-white bg-cover bg-no-repeat shadow-xl dark:bg-navy-700 dark:text-white"
              
            >
        
              <div className="mt-3  h-px w-full bg-gray-200 dark:bg-white/20" />
              <div className=" mt-3 grid grid-cols-1 gap-5 items-end">
                <button
                  onClick={handleLogout}
                  className="mt-3 text-sm text-center font-medium text-red-500 hover:text-red-500"
                >
                  إعدادات الحساب
                </button>
                <button
                  onClick={handleLogout}
                  className="mt-3 text-sm text-center font-medium text-red-500 hover:text-red-500"
                >
                  تسجيل الخروج
                </button>
              </div>
            </div>
          </Dropdown>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
