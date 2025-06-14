'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { handleExport } from 'hooks/useExportToEx';
import TableReports from './TableReports';

export default function Page() {
  const [reports, setReports] = useState<any[]>([]);
  const [divisions, setDivisions] = useState<any[]>([]);
  const [filters, setFilters] = useState({ division: '', department: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const reportsPerPage = 5;
  const router = useRouter();

  // جلب التقارير
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get(
          'https://jaradalasul.com/admin/v1/reports',
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
              Accept: 'application/json; charset=UTF-8',
            },
          }
        );

        const sorted = response.data.data.sort(
          (a: any, b: any) =>
            new Date(b.created_at).getTime() -
            new Date(a.created_at).getTime()
        );
        setReports(sorted);
      } catch (error) {
        console.error('فشل تحميل التقارير:', error);
      }
    };

    fetchReports();
  }, []);

  // جلب الأقسام والشعب
  useEffect(() => {
    const fetchDivisions = async () => {
      try {
        const response = await axios.get(
          'https://jaradalasul.com/admin/v1/divisions',
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
              Accept: 'application/json; charset=UTF-8',
            },
          }
        );
        setDivisions(response.data.data);
      } catch (error) {
        console.error('فشل تحميل الأقسام والشعب:', error);
      }
    };

    fetchDivisions();
  }, []);

  // إعداد خيارات الفلاتر
  const uniqueDepartments = Array.from(
    new Set(divisions.map((d) => d.department?.name))
  ).filter(Boolean);

  const uniqueDivisions = Array.from(
    new Set(divisions.map((d) => d.name))
  ).filter(Boolean);

  // فلترة التقارير
  const filteredData = reports.filter((r) => {
    const division = r?.room_id?.division?.name;
    const department = r?.room_id?.division?.department?.name;

    return (
      (!filters.division || division === filters.division) &&
      (!filters.department || department === filters.department)
    );
  });

  // تحديد التقارير حسب الصفحة
  const indexOfLastReport = currentPage * reportsPerPage;
  const indexOfFirstReport = indexOfLastReport - reportsPerPage;
  const currentReports = filteredData.slice(
    indexOfFirstReport,
    indexOfLastReport
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleViewDetails = (id: number) => {
    router.push(`/admin/reports/show/${id}`);
  };

  return (
    <div className="rtl min-h-screen space-y-6 bg-gray-50 p-6 dark:bg-gray-900">
      {/* العنوان والتصدير */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            التقارير
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-300">
            عرض تقارير الجرد حسب القسم والشعبة
          </p>
        </div>
        <button
          onClick={() => handleExport(filteredData)}
          className="rounded-lg bg-blue-600 px-4 py-2 text-white shadow transition hover:bg-blue-700"
        >
          تصدير Excel
        </button>
      </div>

      {/* واجهة الفلاتر */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <select
          className="p-2 border rounded"
          value={filters.department}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, department: e.target.value }))
          }
        >
          <option value="">كل الأقسام</option>
          {uniqueDepartments.map((dept, i) => (
            <option key={i} value={dept}>
              {dept}
            </option>
          ))}
        </select>

        <select
          className="p-2 border rounded"
          value={filters.division}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, division: e.target.value }))
          }
        >
          <option value="">كل الشعب</option>
          {uniqueDivisions.map((div, i) => (
            <option key={i} value={div}>
              {div}
            </option>
          ))}
        </select>
      </div>

      {/* جدول */}
      <TableReports
        currentReports={currentReports}
        handleViewDetails={handleViewDetails}
      />

      {/* Pagination */}
      <div className="mt-6 flex justify-center space-x-2" dir="rtl">
        {Array.from({
          length: Math.ceil(filteredData.length / reportsPerPage),
        }).map((_, i) => (
          <button
            key={i}
            onClick={() => paginate(i + 1)}
            className={`h-8 w-8 rounded-full text-sm font-semibold ${
              currentPage === i + 1
                ? 'bg-blue-600 text-white'
                : 'border border-gray-300 bg-white text-gray-700'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
