'use client';

import useShow from 'hooks/useShow';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';

type ItemDetail = {
  division?: { name?: string };
  department?: { name?: string };
  label?: string;
  status?: string;
  asset_name?: string;
  in_requested_room?: boolean;
};

export default function ReportDetail() {
  const { id } = useParams();
  const { data: report } = useShow<any>('https://jaradalasul.com/admin/v1/reports', id);

  const [filteredItems, setFilteredItems] = useState<ItemDetail[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDivision, setSelectedDivision] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const itemsPerPage = 10;

  useEffect(() => {
    if (!report?.result?.items_details) return;

    let items: ItemDetail[] = report.result.items_details;

    if (selectedDivision) {
      items = items.filter((item) => item.division?.name === selectedDivision);
    }

    if (selectedDepartment) {
      items = items.filter((item) => item.department?.name === selectedDepartment);
    }

    setFilteredItems(items);
    setCurrentPage(1);
  }, [report, selectedDivision, selectedDepartment]);

  // احسب عدد الصفحات مباشرة
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  // احصل على العناصر التي يجب عرضها في الصفحة الحالية
  const currentItems = filteredItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // استخراج القيم الفريدة للشعب والأقسام
  const uniqueDivisions: string[] =
    Array.from(new Set(report?.result?.items_details?.map((item: ItemDetail) => item.division?.name).filter(Boolean))) || [];

  const uniqueDepartments: string[] =
    Array.from(new Set(report?.result?.items_details?.map((item: ItemDetail) => item.department?.name).filter(Boolean))) || [];

  // وظيفة تغيير الصفحة
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // تصدير Excel
  const handleExport = () => {
    if (filteredItems.length === 0) {
      alert('لا توجد عناصر لتصديرها');
      return;
    }

    const exportData = filteredItems.map((item) => ({
      'الوسم': item.label,
      'الحالة': item.status,
      'اسم الأصل': item.asset_name,
      'في الغرفة المطلوبة': item.in_requested_room ? 'نعم' : 'لا',
      'الشعبة': item.division?.name || '-',
      'القسم': item.department?.name || '-',
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, `تفاصيل تقرير ${id}`);
    XLSX.writeFile(workbook, `report-detail-${id}.xlsx`);
  };

  if (!report) {
    return <p className="p-6 text-center text-gray-500">لا توجد بيانات لعرضها</p>;
  }

  const { client_id, room_id, result } = report;

  return (
    <div className="rtl p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800 dark:text-gray-200">
      <h2 className="text-xl font-bold mb-4">تفاصيل التقرير #{id}</h2>

      {/* معلومات العميل */}
      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-2 border-b border-gray-300 dark:border-gray-600 pb-1">معلومات العميل</h3>
        <p><strong>الاسم:</strong> {client_id?.name || '-'}</p>
        <p><strong>الهاتف:</strong> {client_id?.phone || '-'}</p>
        <p><strong>الجهة:</strong> {client_id?.entity?.name || '-'}</p>
        <p><strong>الشعبة:</strong> {client_id?.division?.name || '-'}</p>
        <p><strong>القسم:</strong> {client_id?.division?.department?.name || '-'}</p>
      </section>

      {/* معلومات الغرفة */}
      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-2 border-b border-gray-300 dark:border-gray-600 pb-1">معلومات الغرفة</h3>
        <p><strong>اسم الغرفة:</strong> {room_id?.name || '-'}</p>
        <p><strong>الشعبة:</strong> {room_id?.division?.name || '-'}</p>
        <p><strong>القسم:</strong> {room_id?.division?.department?.name || '-'}</p>
        <p><strong>عدد العناصر:</strong> {room_id?.asset_items_count ?? '-'}</p>
      </section>

      {/* إحصائيات التقرير */}
      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-2 border-b border-gray-300 dark:border-gray-600 pb-1">إحصائيات التقرير</h3>
        <ul className="list-disc list-inside space-y-1">
          <li>عدد الوسوم: {result?.stats?.labels_count ?? '-'}</li>
          <li>جديدة: {result?.stats?.new_count ?? '-'}</li>
          <li>موجودة: {result?.stats?.found_count ?? '-'}</li>
          <li>تالفة: {result?.stats?.damaged_count ?? '-'}</li>
          <li>غير معروفة: {result?.stats?.unknown_count ?? '-'}</li>
          <li>في غرفة أخرى: {result?.stats?.other_room_count ?? '-'}</li>
        </ul>
      </section>

      {/* فلترة */}
      <section className="mb-4 flex gap-4 justify-end">
        <select
          value={selectedDivision}
          onChange={(e) => setSelectedDivision(e.target.value)}
          className="p-2 border rounded-lg"
        >
          <option value="">كل الشعب</option>
          {uniqueDivisions.map((div) => (
            <option key={div} value={div}>{div}</option>
          ))}
        </select>

        <select
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
          className="p-2 border rounded-lg"
        >
          <option value="">كل الأقسام</option>
          {uniqueDepartments.map((dep) => (
            <option key={dep} value={dep}>{dep}</option>
          ))}
        </select>

        <button
          onClick={handleExport}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          تصدير Excel
        </button>
      </section>

      {/* جدول العناصر مع الباجينيشن */}
      <section>
        <h3 className="text-lg font-semibold mb-2 border-b border-gray-300 dark:border-gray-600 pb-1">تفاصيل العناصر</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-right text-sm border rounded">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="px-4 py-2 border">الوسم</th>
                <th className="px-4 py-2 border">الحالة</th>
                <th className="px-4 py-2 border">اسم الأصل</th>
                <th className="px-4 py-2 border">في الغرفة المطلوبة</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length ? (
                currentItems.map((item, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-4 py-2 border">{item.label}</td>
                    <td className="px-4 py-2 border capitalize">{item.status}</td>
                    <td className="px-4 py-2 border">{item.asset_name}</td>
                    <td className="px-4 py-2 border">{item.in_requested_room ? 'نعم' : 'لا'}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center p-4 text-gray-500 dark:text-gray-400">لا توجد عناصر لعرضها</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* أزرار الباجينيشن */}
        <div className="flex justify-center mt-4 space-x-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => paginate(i + 1)}
              className={`w-8 h-8 rounded-full text-sm font-semibold ${
                currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-white border border-gray-300 text-gray-700'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
