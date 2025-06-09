'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import { useRouter } from 'next/navigation';

export default function ReportsPage() {
  const [reports, setReports] = useState<any[]>([]);
  const [filteredReports, setFilteredReports] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterText, setFilterText] = useState('');
  const [selectedRoom, setSelectedRoom] = useState('');
  const [selectedDivision, setSelectedDivision] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const reportsPerPage = 5;

  const router = useRouter();

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get('https://jaradalasul.com/admin/v1/reports', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            Accept: 'application/json; charset=UTF-8',
          },
        });

        const sorted = response.data.data.sort(
          (a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        setReports(sorted);
        setFilteredReports(sorted);
      } catch (error) {
        console.error('فشل تحميل التقارير:', error);
      }
    };

    fetchReports();
  }, []);

  const uniqueRooms = [...new Set(reports.map(r => r.room_id?.name).filter(Boolean))];
  const uniqueDivisions = [...new Set(reports.map(r => r.client_id?.division?.name).filter(Boolean))];
  const uniqueDepartments = [...new Set(reports.map(r => r.client_id?.department?.name).filter(Boolean))];

const applyFilters = () => {
  const filtered = reports.filter((report) => {
    const matchesText = report.client_id?.name?.toLowerCase().includes(filterText.toLowerCase());
    const matchesRoom = !selectedRoom || report.room_id?.name === selectedRoom;
    const matchesDivision = !selectedDivision || report.client_id?.division?.name === selectedDivision;
    const matchesDepartment = !selectedDepartment || report.client_id?.department?.name === selectedDepartment;

    return matchesText && matchesRoom && matchesDivision && matchesDepartment;
  });

  setFilteredReports(filtered);
  setCurrentPage(1);
};


  useEffect(() => {
    applyFilters();
  }, [filterText, selectedRoom, selectedDivision, selectedDepartment]);

  const handleExport = () => {
    const flatData = filteredReports.flatMap((report) =>
      report.result?.items_details?.map((item: any) => ({
        'رقم التقرير': report.id,
        'اسم المستخدم': report.client_id?.name || '-',
        'اسم الغرفة': report.room_id?.name || '-',
        'الحالة': item.status,
        'الوسم': item.label,
        'الاسم': item.asset_name,
        'في الغرفة المطلوبة': item.in_requested_room ? 'نعم' : 'لا',
      })) || []
    );

    const worksheet = XLSX.utils.json_to_sheet(flatData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'تفاصيل التقارير');
    XLSX.writeFile(workbook, 'reports-details.xlsx');
  };

  const indexOfLastReport = currentPage * reportsPerPage;
  const indexOfFirstReport = indexOfLastReport - reportsPerPage;
  const currentReports = filteredReports.slice(indexOfFirstReport, indexOfLastReport);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // إجراءات الأزرار
  const handleViewDetails = (id: number) => {
    router.push(`/admin/reports/show/${id}`); // صفحة تفاصيل التقرير
  };

 

 

  return (
    <div className="rtl p-6 space-y-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">التقارير</h1>
          <p className="text-sm text-gray-500 dark:text-gray-300">عرض تقارير الجرد حسب المستخدمين والغرف</p>
        </div>
        <button
          onClick={handleExport}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          تصدير Excel
        </button>
      </div>

      {/* فلاتر البحث */}
      <div className="flex flex-wrap gap-4 justify-end">
        <input
          type="text"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          placeholder="ابحث باسم المستخدم..."
          className="p-2 border border-gray-300 rounded-lg w-64"
        />

        <select
          value={selectedRoom}
          onChange={(e) => setSelectedRoom(e.target.value)}
          className="p-2 border rounded-lg"
        >
          <option value="">كل الغرف</option>
          {uniqueRooms.map((room) => (
            <option key={room} value={room}>
              {room}
            </option>
          ))}
        </select>

        <select
          value={selectedDivision}
          onChange={(e) => setSelectedDivision(e.target.value)}
          className="p-2 border rounded-lg"
        >
          <option value="">كل الشعب</option>
          {uniqueDivisions.map((div) => (
            <option key={div} value={div}>
              {div}
            </option>
          ))}
        </select>

        <select
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
          className="p-2 border rounded-lg"
        >
          <option value="">كل الأقسام</option>
          {uniqueDepartments.map((dep) => (
            <option key={dep} value={dep}>
              {dep}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full bg-white text-sm text-right border">
          <thead className="bg-gray-100 text-gray-700 font-semibold">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">اسم المستخدم</th>
              <th className="px-4 py-3">الشعبة</th>
              <th className="px-4 py-3">الغرفة</th>
              <th className="px-4 py-3">عدد العناصر</th>
              <th className="px-4 py-3">جديدة</th>
              <th className="px-4 py-3">تالفة</th>
              <th className="px-4 py-3">موجودة</th>
              <th className="px-4 py-3">الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {currentReports.map((report: any) => (
              <tr key={report.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">#{report.id}</td>
                <td className="px-4 py-3">{report.client_id?.name || '-'}</td>
                <td className="px-4 py-3">{report.client_id?.division?.name || '-'}</td>
                <td className="px-4 py-3">{report.room_id?.name || '-'}</td>
                <td className="px-4 py-3">{report.result?.stats?.labels_count ?? '-'}</td>
                <td className="px-4 py-3">{report.result?.stats?.new_count ?? '-'}</td>
                <td className="px-4 py-3">{report.result?.stats?.damaged_count ?? '-'}</td>
                <td className="px-4 py-3">{report.result?.stats?.found_count ?? '-'}</td>
                <td className="px-4 py-3 flex gap-2 justify-end">
                  <button
                    onClick={() => handleViewDetails(report.id)}
                    className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    title="عرض التفاصيل"
                  >
                    تفاصيل
                  </button>
            
                </td>
              </tr>
            ))}
            {currentReports.length === 0 && (
              <tr>
                <td colSpan={9} className="text-center p-4 text-gray-500">
                  لا توجد تقارير مطابقة
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 space-x-2">
        {Array.from({ length: Math.ceil(filteredReports.length / reportsPerPage) }).map((_, i) => (
          <button
            key={i}
            onClick={() => paginate(i + 1)}
            className={`w-8 h-8 rounded-full text-sm font-semibold ${
              currentPage === i + 1
                ? 'bg-blue-600 text-white'
                : 'bg-white border border-gray-300 text-gray-700'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
