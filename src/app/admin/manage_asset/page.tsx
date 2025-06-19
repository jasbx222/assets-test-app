'use client';

import ComplexTable from 'components/admin/default/ComplexTable';
import useGet from 'hooks/useGet';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import { AssetItem } from 'types/data';

const Page = () => {
  const { data: tableDataComplex = [] } = useGet<AssetItem>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/asset-item`
  );

  const [searchTerm, setSearchTerm] = React.useState('');
  const searchParams = useSearchParams();
  const router = useRouter();

  // فلاتر
  const [selectedRoom, setSelectedRoom] = React.useState('');
  const [selectedDivision, setSelectedDivision] = React.useState('');
  const [selectedDepartment, setSelectedDepartment] = React.useState('');

  // باجينيشن
  const itemsPerPage = 10;
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  // فلترة حسب الغرفة والشعبة والقسم
  const filteredByFilters = tableDataComplex.filter((item) => {
    const matchRoom = selectedRoom ? item.room?.name === selectedRoom : true;
    const matchDivision = selectedDivision
      ? item.room?.division?.name === selectedDivision
      : true;
    const matchDepartment = selectedDepartment
      ? item.room?.division?.department?.name === selectedDepartment
      : true;
    return matchRoom && matchDivision && matchDepartment;
  });

  // فلترة حسب البحث
  const filteredBySearch = filteredByFilters.filter((item) =>
    item.label?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredBySearch.length / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const currentItems = filteredBySearch.slice(start, end);

  const goToPage = (page: number) => {
    router.push(`?page=${page}`);
  };

  return (
    <div className="container w-full space-y-4" dir='rtl'>
      <input
        type="search"
        placeholder="ابحث عن طريق الكود"
        value={searchTerm}
        onChange={(e:any) => setSearchTerm(e.target.value)}
        className="rounded-lg border p-2 relative top-12 w-full md:w-1/3"
      />


      <ComplexTable
        tableData={currentItems}
        goToPage={goToPage}
        totalPages={totalPages}
        currentPage={currentPage}
      />
    </div>
  );
};

export default Page;
