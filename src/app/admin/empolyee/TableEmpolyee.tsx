'use client';
import { useState, useMemo } from 'react';
import { Empolyee } from 'types/data';
import { BsEye, BsPen } from 'react-icons/bs';
import { FiDelete } from 'react-icons/fi';
import useDelete from 'hooks/useDelete';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const TableEmpolyee = ({ items = [] }: { items: Empolyee[] }) => {
  const route = useRouter();
  const [slice, setSlice] = useState(10);
  const { remove } = useDelete();

  // حالات البحث
  const [searchName, setSearchName] = useState('');
  const [searchPhone, setSearchPhone] = useState('');

  const handleDelete = (id: string) => {
    remove(`${process.env.NEXT_PUBLIC_BASE_URL}/clients/${id}`);
    route.refresh();
  };

  // فلترة البيانات حسب الاسم ورقم الهاتف
  const filteredItems = useMemo(() => {
    return items.filter(
      (item) =>
        item.name.toLowerCase().includes(searchName.toLowerCase()) &&
        item.phone.includes(searchPhone),
    );
  }, [items, searchName, searchPhone]);

  if (!items || items.length === 0) {
    return (
      <p className="py-4 text-center text-gray-500">لا يوجد موظفين حالياً</p>
    );
  }

  return (
    <div className="w-full overflow-x-auto">
      {/* حقول البحث */}
      <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-end">
        <input
          type="text"
          placeholder="ابحث بالاسم"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-right placeholder:text-gray-400 dark:border-navy-600 dark:bg-navy-800 dark:text-white md:w-48"
        />
        <input
          type="text"
          placeholder="ابحث برقم الهاتف"
          value={searchPhone}
          onChange={(e) => setSearchPhone(e.target.value)}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-right placeholder:text-gray-400 dark:border-navy-600 dark:bg-navy-800 dark:text-white md:ml-2 md:w-48"
        />
      </div>

      <table className="min-w-full table-auto rounded-md border border-gray-200 bg-white text-right shadow dark:bg-navy-800">
        <thead className="bg-gray-100 dark:bg-navy-800">
          <tr className="text-gray-700 dark:text-white">
            <th className="px-4 py-2 dark:text-white ">الاسم</th>
            <th className="px-4 py-2">الهاتف</th>
            <th className="px-4 py-2">تاريخ الانتهاء</th>
            <th className="px-4 py-2">الحالة</th>
            <th className="px-4 py-2 text-center">الاجرائات</th>
          </tr>
        </thead>
        <tbody className="dark:text-white">
          {filteredItems.slice(0, slice).map((item, index) => (
            <tr key={index} className={`${!item.is_active ? 'bg-red-50' : ''}`}>
              <td className="px-4 py-3">{item.name}</td>
              <td className="px-4 py-3">{item.phone}</td>
              <td className="px-4 py-3">{item.expiry_date}</td>
              <td className="px-4 py-3">
                <span
                  className={`rounded-full px-2 py-1 text-xs font-semibold ${
                    item.is_active
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {item.is_active ? 'نشط' : 'غير نشط'}
                </span>
              </td>
              <td className="grid grid-cols-3 gap-2 px-4 py-3 text-center">
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-gray-500 hover:text-red-500"
                >
                  <FiDelete className="inline-block text-lg" />
                </button>
                <Link href={`/admin/empolyee/update/${item.id}`}>
                  <button className="text-gray-500 hover:text-blue-500">
                    <BsPen className="inline-block text-lg" />
                  </button>
                </Link>
                <Link href={`/admin/empolyee/show/${item.id}`}>
                  <button className="text-gray-500 hover:text-green-500">
                    <BsEye className="inline-block text-lg" />
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={6} className="px-4 py-2 text-center">
              <div className="flex items-center justify-center space-x-2">
                <button
                  onClick={() => setSlice(slice - 10)}
                  disabled={slice <= 10}
                  className="rounded-md bg-gray-200 px-3 py-1 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
                >
                  السابق
                </button>
                <span className="text-sm text-gray-600">
                  عرض {slice} من {filteredItems.length}
                </span>
                <button
                  onClick={() => setSlice(slice + 10)}
                  disabled={slice >= filteredItems.length}
                  className="rounded-md bg-gray-200 px-3 py-1 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
                >
                  التالي
                </button>
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default TableEmpolyee;
