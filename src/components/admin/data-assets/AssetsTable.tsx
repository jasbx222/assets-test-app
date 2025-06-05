'use client';
import React from 'react';
import CardMenu from 'components/card/CardMenu';
import Card from 'components/card';
import Pagination from 'components/pageination/Pageination';
import useDelete from 'hooks/useDelete';
import Link from 'next/link';
type RowObj = {
  id: number;
  name: string;
  image: string;
  note: string | null;
  created_at: string;
};

function AssetsTable({
  tableData,
  totalPages,
  goToPage,
  currentPage,
  handleAddNewAssets,
  showAddNewAssets = false,
}: {
  tableData: RowObj[];
  totalPages: any;
  goToPage: (page: number) => void;
  currentPage: number;
  handleAddNewAssets?: () => void;
  showAddNewAssets?: boolean;
}) {
  const [activeActionIndex, setActiveActionIndex] = React.useState<
    number | null
  >(null);
  const { remove, response } = useDelete();
  const handleOperation = (index: number) => {
    setActiveActionIndex((prevIndex) => (prevIndex === index ? null : index));
  };
  const handleDelete = (id: number) => {
    remove(`${process.env.NEXT_PUBLIC_BASE_URL}/assets/${id}`);
    setActiveActionIndex(null);
    // يمكنك هنا تحديث الحالة أو إعادة تحميل البيانات بعد الحذف
  };

  return (
    <Card extra="w-full h-full sm:overflow-auto px-6">
      <header className="relative flex items-center justify-between pt-4">
        <CardMenu />
        {/* إضافة أصول جديدة */}
        <div className="flex items-center justify-around space-x-2">
          <button
            onClick={handleAddNewAssets}
            className="rounded bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            إضافة أصل جديد
          </button>
          <button
            onClick={() => {
              // هنا يمكنك إضافة منطق لتصدير البيانات إلى ملف Excel
              console.log('تصدير البيانات إلى Excel');
            }}
            className="rounded bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            تصدير إلى Excel
          </button>
        </div>
      </header>

      <div className="mt-8  ">
        <table className="w-full text-right">
          <thead>
            <tr className="border-b border-gray-400 dark:border-white/30">
              <th className="p-2 text-sm font-bold text-gray-600 dark:text-white">
                الصورة
              </th>
              <th className="p-2 text-sm font-bold text-gray-600 dark:text-white">
                اسم الأصل
              </th>
              <th className="p-2 text-sm font-bold text-gray-600 dark:text-white">
                ملاحظات
              </th>
              <th className="p-2 text-sm font-bold text-gray-600 dark:text-white">
                تاريخ الإضافة
              </th>
              <th className="p-2 text-sm font-bold text-gray-600 dark:text-white">
                الإجراءات
              </th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((item: RowObj, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 dark:border-white/10"
              >
                <td className="p-2">
                  <img
                    src={item.image}
                    alt="asset"
                    className="h-16 w-24 rounded-md border object-contain"
                  />
                </td>
                <td className="p-2 text-sm font-bold text-navy-700 dark:text-white">
                  {item.name}
                </td>
                <td className="p-2 text-sm text-navy-700 dark:text-white">
                  {item.note || 'لا يوجد'}
                </td>
                <td className="p-2 text-sm font-bold text-navy-700 dark:text-white">
                  {item.created_at}
                </td>

                <td className="relative top-5 p-2">
                  <button
                    className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none"
                    onClick={() => handleOperation(index)}
                  >
                    الإجراءات
                    <svg
                      className="-mr-1 ml-2 h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.23 8.27a.75.75 0 01.02-1.06z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>

                  {activeActionIndex === index && (
                    <div className="ring-black absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-opacity-5">
                      <div className="py-1">
                        <button
                          onClick={() =>
                            console.log(`عرض التفاصيل: ${item.name}`)
                          }
                          className="w-full px-4 py-2 text-right text-sm text-gray-700 hover:bg-gray-100"
                        >
                          عرض التفاصيل
                        </button>
                        <Link href={`/admin/data-assets/update/${item.id}`}>
                          <button
                            onClick={() => console.log(`تعديل: ${item.name}`)}
                            className="w-full px-4 py-2 text-right text-sm text-gray-700 hover:bg-gray-100"
                          >
                            التعديل
                          </button>
                        </Link>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="w-full px-4 py-2 text-right text-sm text-red-600 hover:bg-gray-100"
                        >
                          الحذف
                        </button>
                      </div>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 text-sm text-gray-500 dark:text-white">
        إجمالي الأصول: {tableData.length}
      </div>
      <Pagination
        totalPages={totalPages}
        goToPage={goToPage}
        currentPage={currentPage}
      />
    </Card>
  );
}

export default AssetsTable;
