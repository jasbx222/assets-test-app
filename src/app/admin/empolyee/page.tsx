'use client';

import React from 'react';
import Banner from 'components/admin/empolyees/Banner';
import AddNewEmpolyee from './AddNewEmpolyee';
import useGet from 'hooks/useGet';
import TableEmpolyee from './TableEmpolyee';
import { Empolyee } from 'types/data';

const Page = () => {
  const [showAddNewEmpolyee, setShowAddNewEmpolyee] = React.useState(false);

  const handleAddNewEmpolyee = () => {
    setShowAddNewEmpolyee(!showAddNewEmpolyee);
  };

  const { data: employees, loading ,refetch} = useGet<Empolyee>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/clients`,
  );

  return (
    <div className="mt-3 grid h-full w-full " dir='rtl'>
      {/* القسم الأيسر - البانر + الموظفين المضافين حديثاً */}
      <div className="h-fit w-full">
        <Banner />

        <div className="mb-5 mt-5 flex items-center justify-between px-[26px]">
          <button
            onClick={handleAddNewEmpolyee}
            className="rounded-lg bg-blue-600  px-4 py-2 text-base font-medium hover:text-gray-800 text-gray-200 hover:bg-gray-100 active:bg-gray-200 dark:bg-navy-700 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10"
          >
            إضافة موظف جديد
          </button>
        </div>
        <div className="h-full w-full rounded-xl">
          {showAddNewEmpolyee && (
            <div className="px-[26px]">
              <AddNewEmpolyee refetch={refetch} onClose={handleAddNewEmpolyee} />
            </div>
          )}
        </div>

        {showAddNewEmpolyee ? null : (
          <div className="h-full w-full rounded-xl">
            <TableEmpolyee refetch={refetch} items={employees} />
          </div>
        )}
      </div>

      {/* القسم الأيمن - جدول الموظفين + زر الإضافة */}
    </div>
  );
};

export default Page;
