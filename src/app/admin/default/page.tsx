'use client';

import { useState } from 'react';
import Chart from 'components/admin/default/WeeklyRevenue';
import TotalSpent from 'components/admin/default/TotalSpent';
import { IoMdHome } from 'react-icons/io';
import { MdBarChart } from 'react-icons/md';
import Widget from 'components/widget/Widget';
import ComplexTable from 'components/admin/default/ComplexTable';
import useGet from 'hooks/useGet';
import { useRouter, useSearchParams } from 'next/navigation';
import { FaBell, FaUser } from 'react-icons/fa';

const Dashboard = () => {
  const { data: tableDataComplex = [] } = useGet<any>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/asset-item`,
  );
  const { data: empolyee = [] } = useGet<any>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/clients`,
  );
  const { data: notifaction = [] } = useGet<any>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/notification`,
  );
  const { data: departments = [] } = useGet<any>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/departments`,
  );
  const { data: entities = [] } = useGet<any>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/entities`,
  );
  const { data: assets = [] } = useGet<any>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/assets`,
  );

  const searchParams = useSearchParams();
  const router = useRouter();

  const itemsPerPage = 10;
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  // حالات الفلاتر
  const [selectedRoom, setSelectedRoom] = useState('');
  const [selectedDivision, setSelectedDivision] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');

  // استخراج القيم الفريدة
  const rooms = Array.from(new Set(tableDataComplex.map((item) => item.room?.name).filter(Boolean)));
  const divisions = Array.from(new Set(tableDataComplex.map((item) => item.room?.division?.name).filter(Boolean)));
  const departmentsList = Array.from(new Set(tableDataComplex.map((item) => item.room?.division?.department?.name).filter(Boolean)));

  // فلترة البيانات
  const filteredData = tableDataComplex.filter((item) => {
    const matchRoom = selectedRoom ? item.room?.name === selectedRoom : true;
    const matchDivision = selectedDivision ? item.room?.division?.name === selectedDivision : true;
    const matchDepartment = selectedDepartment ? item.room?.division?.department?.name === selectedDepartment : true;
    return matchRoom && matchDivision && matchDepartment;
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const currentItems = filteredData.slice(start, end);

  const goToPage = (page: number) => {
    router.push(`?page=${page}`);
  };

  return (
    <div>
      {/* Widgets */}
      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title="اجمالي الاصول"
          subtitle={tableDataComplex.length.toString()}
        />
        <Widget
          icon={<MdBarChart className="h-6 w-6" />}
          title="اخر الجرد"
          subtitle={assets[assets.length - 1]?.created_at.slice(12, 20) || 'لا يوجد بيانات'}
        />
        <Widget
          icon={<FaBell className="h-7 w-7" />}
          title="الاشعارات"
          subtitle={notifaction.length.toString()}
        />
        <Widget
          icon={<FaUser className="h-6 w-6" />}
          title="الموظفين"
          subtitle={empolyee.length.toString()}
        />
        <Widget
          icon={<IoMdHome className="h-7 w-7" />}
          title="الاقسام"
          subtitle={departments.length.toString()}
        />
        <Widget
          icon={<IoMdHome className="h-6 w-6" />}
          title="الشعب"
          subtitle={entities.length.toString()}
        />
      </div>

      {/* Charts */}
      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        <TotalSpent />
        <Chart />
      </div>

      {/* جدول الأصول */}
      <div className="container w-full">
        <ComplexTable
          tableData={currentItems}
          goToPage={goToPage}
          totalPages={totalPages}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default Dashboard;
