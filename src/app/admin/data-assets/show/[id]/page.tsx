'use client';

import { useParams } from 'next/navigation';
import useShow from 'hooks/useShow';
import { CalendarDays, StickyNote, Tag } from 'lucide-react';
import React from 'react';

interface Asset {
  id: number;
  name: string;
  image: string;
  note: string | null;
  created_at: string;
}

export default function AssetDetail() {
  const { id } = useParams();
  const { data: asset, loading } = useShow<Asset>(`${process.env.NEXT_PUBLIC_BASE_URL}/assets`, id);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[40vh] text-gray-600 dark:text-gray-300 text-lg font-medium">
        جاري تحميل البيانات...
      </div>
    );
  }

  if (!asset) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-400 py-20">
        لم يتم العثور على بيانات الأصل.
      </div>
    );
  }

  return (
    <div className="rtl max-w-4xl mx-auto mt-10 p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">
       تفاصيل الأصل رقم #{asset.id}
      </h1>

      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* صورة الأصل */}
        <div className="md:w-1/2 w-full">
          <img
            src={asset.image}
            alt={asset.name}
            className="rounded-2xl border border-gray-300 dark:border-gray-600 object-cover w-full h-72 shadow-md"
          />
        </div>

        {/* التفاصيل النصية */}
        <div className="md:w-1/2 w-full space-y-6">
          <div className="flex items-start gap-3">
            <Tag className="text-blue-500 mt-1" />
            <div>
              <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">اسم الأصل</h2>
              <p className="text-gray-800 dark:text-gray-300">{asset.name}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <StickyNote className="text-green-500 mt-1" />
            <div>
              <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">ملاحظة</h2>
              <p className="text-gray-800 dark:text-gray-300">
                {asset.note ?? <span className="text-sm text-gray-400">لا توجد ملاحظات</span>}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CalendarDays className="text-yellow-500 mt-1" />
            <div>
              <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">تاريخ الإضافة</h2>
              <p className="text-gray-800 dark:text-gray-300">
               {
                asset.created_at ?? ''
               }
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
