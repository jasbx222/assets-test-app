'use client';
import React, { useState } from 'react';
import tableDataDevelopment from 'variables/data-tables/tableDataDevelopment';
import tableDataCheck from 'variables/data-tables/tableDataCheck';
import AssetsTable from 'components/admin/data-assets/AssetsTable';
import tableDataColumns from 'variables/data-tables/tableDataColumns';
import tableDataComplex from 'variables/data-tables/tableDataComplex';
import DevelopmentTable from 'components/admin/data-assets/DevelopmentTable';
import ColumnsTable from 'components/admin/data-assets/ColumnsTable';
import ComplexTable from 'components/admin/data-assets/ComplexTable';
// import AddNewEmpolyee from '../nft-marketplace/AddNewEmpolyee';
import AddNewEssets from './AddNewEssets';
import useGet from 'hooks/useGet';
import { useRouter, useSearchParams } from 'next/navigation';

const Tables = () => {
    const router = useRouter();
  const [showAddNewAssets, setShowAddNewAssets] = useState(false);
  type RowObj = {
    id: number;
    name: string;
    image: string;
    note: string | null;
    created_at: string;
  };
  const { data: assets, loading } = useGet<RowObj>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/assets`,
  );
  const searchParams = useSearchParams();

  const itemsPerPage = 10; // Number of items per page
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  if (!Array.isArray(assets)) return null;

  const totalPages = Math.ceil(assets.length / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const currentItems = assets.slice(start, end);

  const goToPage = (page: any) => {
    router.push(`?page=${page}`);
  };

  const handleAddNewAssets = () => {
    setShowAddNewAssets(!showAddNewAssets);
  };
  return (
    <div>
      <div className="mt-5 grid h-full w-[100%]">
        {/* <DevelopmentTable tableData={DevelopmentTable} />/ */}
        {showAddNewAssets ? (
          ''
        ) : (
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

      <div className="mt-5  flex h-full items-center  justify-center">
        {showAddNewAssets && (
          <AddNewEssets
            isOpen={showAddNewAssets}
            onClose={handleAddNewAssets}
          />
        )}
        {/* <ColumnsTable tableData={tableDataColumns} />


        <ComplexTable tableData={tableDataComplex} /> */}
      </div>
    </div>
  );
};

export default Tables;
