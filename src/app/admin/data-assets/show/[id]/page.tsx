'use client';

import { useParams } from 'next/navigation';
import useShow from 'hooks/useShow';
import { CalendarDays, MoreHorizontal, StickyNote, Tag } from 'lucide-react';
import React from 'react';
import Link from 'next/link';
interface Asset {
  id: number;
  name: string;
  image: string;
  note: string | null;
  created_at: string;
}

export default function Page() {
  const { id } = useParams();
  const { data: asset, loading } = useShow<Asset>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/assets`,
    id,
  );

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center text-lg font-medium text-gray-600 dark:text-gray-300">
        جاري تحميل البيانات...
      </div>
    );
  }

  if (!asset) {
    return (
      <div className="py-20 text-center text-gray-500 dark:text-gray-400">
        لم يتم العثور على بيانات الأصل.
      </div>
    );
  }

  return (
    <div className="rtl mx-auto mt-10 max-w-4xl rounded-2xl border border-gray-200 bg-white p-6 shadow-xl dark:border-gray-700 dark:bg-gray-900">
      <h1 className="mb-8 text-center text-3xl font-bold text-gray-800 dark:text-white">
        تفاصيل الأصل رقم #{asset.id}
      </h1>

      <div className="flex flex-col items-start gap-8 md:flex-row">
        {/* صورة الأصل */}
        <div className="w-full md:w-1/2">
          <img
            src={asset.image}
            alt={asset.name}
            className="h-72 w-full rounded-2xl border border-gray-300 object-cover shadow-md dark:border-gray-600"
          />
        </div>

        {/* التفاصيل النصية */}
        <div className="w-full space-y-6 md:w-1/2">
          <div className="flex items-start gap-3">
            <Tag className="mt-1 text-blue-500" />
            <div>
              <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                اسم الأصل
              </h2>
              <p className="text-gray-800 dark:text-gray-300">{asset.name}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <StickyNote className="mt-1 text-green-500" />
            <div>
              <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                ملاحظة
              </h2>
              <p className="text-gray-800 dark:text-gray-300">
                {asset.note ?? (
                  <span className="text-sm text-gray-400">لا توجد ملاحظات</span>
                )}
              </p>
            </div>
          </div>
          <Link href={`assets_branch/${id}`}>
            <div className="flex items-start gap-3">
              <MoreHorizontal className="mt-1 text-green-500" />
              <div>
                <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                  الاصول الفرعية
                </h2>
                الاصول الفرعية
              </div>
            </div>
          </Link>
          <div className="flex items-start gap-3">
            <CalendarDays className="mt-1 text-yellow-500" />
            <div>
              <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                تاريخ الإضافة
              </h2>
              <p className="text-gray-800 dark:text-gray-300">
                {asset.created_at ?? ''}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
