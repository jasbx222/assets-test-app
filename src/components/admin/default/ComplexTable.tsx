import React from "react";
import Card from "components/card";
import { MdCancel, MdCheckCircle, MdOutlineError } from "react-icons/md";
import Pageination from "components/pageination/Pageination";

type AssetObj = {
  id: string;
  name: string;
  description: string;
  category: string;
  location: string;
  status: string;
  created_at: string;
  updated_at: string;
};

type RowObj = {
  name: string;
  status: string;
  date: string;
  label: string;
  asset: AssetObj;
};

export default function SimpleTable({ tableData, totalPages, goToPage, currentPage }) {
  return (
    <Card extra="w-full container   relative top-10 h-full px-4 pb-6">
      <div className="relative flex flex-wrap items-center justify-between pt-4">
        <div className="text-xl font-bold text-navy-700 dark:text-white">
       الاصول
        </div>
      </div>

      <div className="mt-6 w-full overflow-x-auto">
        <table className="w-full min-w-[600px] text-right">
          <thead>
            <tr className="border-b border-gray-300 dark:border-gray-600">
              <th className="py-3 px-4 text-sm font-bold text-gray-600 dark:text-white">
                اسم الأصل
              </th>
              <th className="py-3 px-4 text-sm font-bold text-gray-600 dark:text-white">
                الحالة
              </th>
              <th className="py-3 px-4 text-sm font-bold text-gray-600 dark:text-white">
                التاريخ
              </th>
              <th className="py-3 px-4 text-sm font-bold text-gray-600 dark:text-white">
                الليبل
              </th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row: RowObj,idx) => (
              <tr key={idx} className="border-b border-gray-200 dark:border-gray-700">
                <td className="py-3 px-4 text-sm font-medium text-navy-700 dark:text-white">
                  {row.asset.name}
                </td>
                <td className="py-3 px-4 text-sm font-medium text-navy-700 dark:text-white">
                  <div className="flex items-center gap-2">
                    {row.status === "new" && (
                      <MdCheckCircle className="text-green-500 dark:text-green-300" />
                    )}
                    {row.status === "damaged" && (
                      <MdCancel className="text-red-500 dark:text-red-300" />
                    )}
                    {row.status === "مستعمل" && (
                      <MdOutlineError className="text-amber-500 dark:text-amber-300" />
                    )}
                    <span>{row.status}</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-sm font-medium text-navy-700 dark:text-white">
                  {row.asset.created_at}
                </td>
                <td className="py-3 px-4 text-sm font-medium text-navy-700 dark:text-white">
                  {row.label}
                </td>
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
}
