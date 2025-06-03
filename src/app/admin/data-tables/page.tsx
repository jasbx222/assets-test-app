'use client';
import React from 'react';
import tableDataDevelopment from 'variables/data-tables/tableDataDevelopment';
import tableDataCheck from 'variables/data-tables/tableDataCheck';
import CheckTable from 'components/admin/data-tables/CheckTable';
import tableDataColumns from 'variables/data-tables/tableDataColumns';
import tableDataComplex from 'variables/data-tables/tableDataComplex';
import DevelopmentTable from 'components/admin/data-tables/DevelopmentTable';
import ColumnsTable from 'components/admin/data-tables/ColumnsTable';
import ComplexTable from 'components/admin/data-tables/ComplexTable';
// import AddNewEmpolyee from '../nft-marketplace/AddNewEmpolyee';
import AddNewEssets from './AddNewEssets';

const Tables = () => {
  const [showAddNewAssets, setShowAddNewAssets] = React.useState(false);
  const handleAddNewAssets = () => {
    setShowAddNewAssets(!showAddNewAssets);
  };
  return (
    <div>
      <div className="mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols-2">
        <DevelopmentTable tableData={tableDataDevelopment} />
        <CheckTable tableData={tableDataCheck} />
      </div>

      <div className="mt-5  h-full flex justify-center  items-center">
      
        <button
          onClick={handleAddNewAssets}
          className="h-[40px] w-full relative top-10 max-w-md rounded-md bg-brand-500 font-semibold text-white hover:bg-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
        >
          {showAddNewAssets ? 'إغلاق نموذج إضافة الأصول' : 'إضافة أصول جديدة'}
        </button>
        {showAddNewAssets && <AddNewEssets  isOpen={showAddNewAssets} onClose={handleAddNewAssets}/>}
        {/* <ColumnsTable tableData={tableDataColumns} />


        <ComplexTable tableData={tableDataComplex} /> */}
      </div>
    </div>
  );
};

export default Tables;
