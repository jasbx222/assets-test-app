'use client';
import React, { useState } from 'react';
import AssetsTable from 'components/admin/data-assets/AssetsTable';
import AddNewEssets from './add/AddNewEssets';
import useGet from 'hooks/useGet';
import { useRouter, useSearchParams } from 'next/navigation';

const Tables = () => {
  const router = useRouter();
  const [showAddNewAssets, setShowAddNewAssets] = useState(false);

  interface RowObj {
    id: number;
    name: string;
    image: string;
    note: string | null;
    created_at: string;
    department?: string;
    room?: string;
    group?: string;
  };

  const searchParams = useSearchParams();

  // جلب قيم الفلاتر من الرابط
  const departmentFilter = searchParams.get('departments') || '';
  const roomFilter = searchParams.get('room') || '';
  const groupFilter = searchParams.get('group') || '';

  const itemsPerPage = 10; // عدد العناصر لكل صفحة
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  // بناء رابط API مع الفلاتر كـ query parameters
  const queryString = new URLSearchParams();
  if (departmentFilter) queryString.append('department', departmentFilter);
  if (roomFilter) queryString.append('room', roomFilter);
  if (groupFilter) queryString.append('group', groupFilter);


  queryString.append('page', currentPage.toString());
  queryString.append('limit', itemsPerPage.toString());

  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/assets?${queryString.toString()}`;


  const { data: assets, loading } = useGet<any>(url);

  if (!Array.isArray(assets)) return null;

 
  const totalPages = 1;
  const currentItems = assets;

  // تغيير الصفحة وتحديث الرابط مع الفلاتر
  const goToPage = (page: number) => {
    const params = new URLSearchParams();
    if (departmentFilter) params.append('department', departmentFilter);
    if (roomFilter) params.append('room', roomFilter);
    if (groupFilter) params.append('group', groupFilter);
    params.append('page', page.toString());
    router.push(`?${params.toString()}`);
  };

  const handleAddNewAssets = () => {
    setShowAddNewAssets(!showAddNewAssets);
  };

  return (
    <div>
      <div className="mt-5 grid h-full w-[100%]">
        {!showAddNewAssets && (
          <AssetsTable
            tableData={currentItems}
            goToPage={goToPage}
            handleAddNewAssets={handleAddNewAssets}
            showAddNewAssets={showAddNewAssets}
            currentPage={currentPage}
            totalPages={totalPages}
          />
        )}
      </div>

      <div className="mt-5 flex h-full items-center justify-center">
        {showAddNewAssets && (
          <AddNewEssets
            isOpen={showAddNewAssets}
            onClose={handleAddNewAssets}
          />
        )}
      </div>
    </div>
  );
};

export default Tables;
