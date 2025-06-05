'use client';

import React from 'react';
import Card from 'components/card';

export default function Page() {
  return (
    <div className="rtl mt-4 space-y-6">
      {/* Page Header */}
      <div className="mb-4 text-right">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          التقارير
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-300">
          عرض إحصائيات وتقارير النظام
        </p>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card>
          <div className="flex flex-col items-end">
            <p className="text-sm text-gray-500">عدد المستخدمين</p>
            <p className="text-2xl font-bold">1,250</p>
          </div>
        </Card>
        <Card>
          <div className="flex flex-col items-end">
            <p className="text-sm text-gray-500">التقارير المكتملة</p>
            <p className="text-2xl font-bold">830</p>
          </div>
        </Card>
        <Card>
          <div className="flex flex-col items-end">
            <p className="text-sm text-gray-500">تقارير قيد المراجعة</p>
            <p className="text-2xl font-bold">142</p>
          </div>
        </Card>
        <Card>
          <div className="flex flex-col items-end">
            <p className="text-sm text-gray-500">بلاغات جديدة</p>
            <p className="text-2xl font-bold">78</p>
          </div>
        </Card>
      </div>

      {/* Table Section */}
      <div className="mt-6">
        {/* <Card extra="p-4">
          <p className="mb-4 text-right text-lg font-bold">
            جدول التقارير
          </p> */}
        <div className="overflow-x-auto">
          <table className="rtl min-w-full table-auto border-collapse text-right">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700">
                <th className="px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
                  رقم التقرير
                </th>
                <th className="px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
                  المستخدم
                </th>
                <th className="px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
                  الحالة
                </th>
                <th className="px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
                  التاريخ
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b dark:border-gray-600">
                <td className="px-4 py-3">#1001</td>
                <td className="px-4 py-3">أحمد السالمي</td>
                <td className="px-4 py-3 text-green-600">مكتمل</td>
                <td className="px-4 py-3">2025-06-01</td>
              </tr>
              <tr className="border-b dark:border-gray-600">
                <td className="px-4 py-3">#1002</td>
                <td className="px-4 py-3">سارة العتيبي</td>
                <td className="px-4 py-3 text-yellow-500">قيد المراجعة</td>
                <td className="px-4 py-3">2025-06-03</td>
              </tr>
              <tr>
                <td className="px-4 py-3">#1003</td>
                <td className="px-4 py-3">محمد الغامدي</td>
                <td className="px-4 py-3 text-red-600">مرفوض</td>
                <td className="px-4 py-3">2025-06-02</td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* </Card> */}
      </div>
    </div>
  );
}
