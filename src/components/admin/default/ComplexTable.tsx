'use client';
import React, { useState, useMemo } from 'react';
import Card from 'components/card';
import { MdCancel, MdCheckCircle, MdOutlineError } from 'react-icons/md';
import Pageination from 'components/pageination/Pageination';
import * as XLSX from 'xlsx';
import { AssetItem } from 'types/data';

type Props = {
  tableData:  AssetItem[];
  totalPages: number;
  currentPage: number;
  goToPage: (page: number) => void;
};

const AssetTable = ({ tableData, totalPages, currentPage, goToPage }: Props) => {
  // الحالات المختارة للفلترة
  const [selectedAsset, setSelectedAsset] = useState('');
  const [selectedRoom, setSelectedRoom] = useState('');
  const [selectedDivision, setSelectedDivision] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');

  // استخرج قائمة الأصول المميزة (الأسماء فقط)
  const assets = useMemo(() => {
    // Set يستخدم لضمان عدم تكرار الأسماء
    return [...new Set(tableData.map(item => item.asset.name))];
  }, [tableData]);

  // استخراج الخيارات بدون تكرار لباقي الفلاتر
  const rooms = useMemo(() => [...new Set(tableData.map(item => item.room.name))], [tableData]);
  const divisions = useMemo(() => [...new Set(tableData.map(item => item.room.division.name))], [tableData]);
  const departments = useMemo(() => [...new Set(tableData.map(item => item.room.division.department.name))], [tableData]);

  // الفلترة الأساسية حسب الأصل وباقي الفلاتر
  const filteredData = useMemo(() => {
    return tableData.filter(item => {
      const matchesAsset = !selectedAsset || item.asset.name === selectedAsset;
      const matchesRoom = !selectedRoom || item.room.name === selectedRoom;
      const matchesDivision = !selectedDivision || item.room.division.name === selectedDivision;
      const matchesDepartment = !selectedDepartment || item.room.division.department.name === selectedDepartment;

      return matchesAsset && matchesRoom && matchesDivision && matchesDepartment;
    });
  }, [tableData, selectedAsset, selectedRoom, selectedDivision, selectedDepartment]);

  const exportToExcel = () => {
    const worksheetData = filteredData.map((row) => ({
      'اسم الأصل': row.asset.name,
      'الحالة': row.status,
      'التاريخ': row.asset.created_at,
      'الليبل': row.label,
      'الغرفة': row.room.name,
      'الشعبة': row.room.division.name,
      'القسم': row.room.division.department.name,
    }));
    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'الأصول');
    XLSX.writeFile(workbook, 'filtered_assets.xlsx');
  };

  return (
    <Card extra="w-full container top-10 h-full px-4 pb-6"  >
      <div  className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-4" dir='rtl'>
        <div className="text-xl font-bold text-navy-700 dark:text-white">الأصول</div>
        <div className="flex flex-wrap gap-2">
          {/* فلتر حسب الأصل */}
          <select
            value={selectedAsset}
            onChange={(e) => setSelectedAsset(e.target.value)}
            className="p-2 border rounded-md text-sm dark:text-navy-700"
          >
            <option value="" className='dark:text-navy-700'>كل الأصول</option>
            {assets.map((assetName, idx) => (
              <option key={idx} value={assetName}>{assetName}</option>
            ))}
          </select>

          {/* فلاتر أخرى */}
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="p-2 border rounded-md text-sm dark:text-navy-700"
          >
            <option value="" className='dark:text-navy-700'>كل الأقسام</option>
            {departments.map((dep, idx) => (
              <option key={idx} value={dep}>{dep}</option>
            ))}
          </select>
          <select
            value={selectedDivision}
            onChange={(e) => setSelectedDivision(e.target.value)}
            className="p-2 border rounded-md text-sm dark:text-navy-700"
          >
            <option value="">كل الشعب</option>
            {divisions.map((div, idx) => (
              <option key={idx} value={div}>{div}</option>
            ))}
          </select>
          <select
            value={selectedRoom}
            onChange={(e) => setSelectedRoom(e.target.value)}
            className="p-2 border rounded-md dark:text-navy-600 text-sm"
          >
            <option value="">كل الغرف</option>
            {rooms.map((room, idx) => (
              <option key={idx} value={room}>{room}</option>
            ))}
          </select>
          <button
            onClick={exportToExcel}
            className="bg-blue-600 text-white text-sm px-4 py-2 rounded-md"
          >
            تصدير Excel
          </button>
        </div>
      </div>

      {/* جدول الأصول */}
      <div className="mt-6 overflow-x-auto" dir='rtl'> 
        <table className="w-full min-w-[600px] text-right">
          <thead>
            <tr className="border-b border-gray-300 dark:border-gray-600">
              <th className="py-3 px-4 text-sm font-bold text-gray-600 dark:text-white">اسم الأصل</th>
              <th className="py-3 px-4 text-sm font-bold text-gray-600 dark:text-white">الحالة</th>
              <th className="py-3 px-4 text-sm font-bold text-gray-600 dark:text-white">التاريخ</th>
              <th className="py-3 px-4 text-sm font-bold text-gray-600 dark:text-white">الليبل</th>
              <th className="py-3 px-4 text-sm font-bold text-gray-600 dark:text-white">الغرفة</th>
              <th className="py-3 px-4 text-sm font-bold text-gray-600 dark:text-white">الشعبة</th>
              <th className="py-3 px-4 text-sm font-bold text-gray-600 dark:text-white">القسم</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, idx) => (
              <tr key={idx} className="border-b border-gray-200 dark:border-gray-700">
                <td className="py-3 px-4 text-sm">{row.asset.name}</td>
                <td className="py-3 px-4 text-sm flex items-center gap-2">
                  {row.status === 'new' && <MdCheckCircle className="text-green-500" />}
                  {row.status === 'damaged' && <MdCancel className="text-red-500" />}
                  {row.status === 'مستعمل' && <MdOutlineError className="text-yellow-500" />}
                  <span>{row.status}</span>
                </td>
                <td className="py-3 px-4 text-sm">{row.asset.created_at}</td>
                <td className="py-3 px-4 text-sm">{row.label}</td>
                <td className="py-3 px-4 text-sm">{row.room.name}</td>
                <td className="py-3 px-4 text-sm">{row.room.division.name}</td>
                <td className="py-3 px-4 text-sm">{row.room.division?.department.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4">
        <Pageination
          totalPages={totalPages}
          goToPage={goToPage}
          currentPage={currentPage}
        />
      </div>
    </Card>
  );
};

export default AssetTable;
