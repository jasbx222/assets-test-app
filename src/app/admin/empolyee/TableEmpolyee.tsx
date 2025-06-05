// components/admin/empolyees/TableEmpolyee.tsx
'use client';
import { useState } from 'react';
import { Empolyee } from 'types/data';
import {  BsEye, BsPen } from 'react-icons/bs';
import { FiDelete } from 'react-icons/fi';
import useDelete from 'hooks/useDelete';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const TableEmpolyee = ({ items = [] }: { items: Empolyee[] }) => {
  if (!items || items.length === 0) {
    return (
      <p className="py-4 text-center text-gray-500">لا يوجد موظفين حالياً</p>
    );
  }
  //   {
  //     slice من العميل
  //   }
const route = useRouter();
  const [slice, setSlice] = useState(10); // يمكنك تعديل هذا الرقم حسب الحاجة
  const handleSliceChange = (newSlice: number) => {
    setSlice(newSlice);
  };
  const {remove}=useDelete();
  const handleDelete = (id: string) => {
    // هنا يمكنك إضافة منطق حذف الموظف
    remove(`
        ${process.env.NEXT_PUBLIC_BASE_URL}/clients/${id}`,);
  
    // بعد الحذف، يمكنك تحديث الحالة أو إعادة تحميل البيانات
 route.refresh();
    }

  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-full table-auto rounded-md border border-gray-200 bg-white dark:bg-navy-800 text-right shadow">
        <thead className="bg-gray-100  dark:bg-navy-800">
          <tr className='text-gray-700 dark:text-white'>
            <th className="px-4 py-2 dark:text-white ">الاسم</th>
            <th className="px-4 py-2">الهاتف</th>
            {/* <th className="px-4 py-2">تاريخ الإنشاء</th> */}
            <th className="px-4 py-2">تاريخ الانتهاء</th>
            <th className="px-4 py-2">الحالة</th>
            <th className="px-4 py-2 text-center">الاجرائات</th>
          </tr>
        </thead>
        <tbody className=" dark:text-white">
          {items.slice(0, slice).map((item, index) => (
            <tr key={index} className={`${!item.is_active ? 'bg-red-50' : ''}`}>
              <td className="px-4 py-3">{item.name}</td>
              <td className="px-4 py-3">{item.phone}</td>
              {/* <td className="px-4 py-3">{item.created_at}</td>/ */}
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
              <td className="px-4 py-3 text-center grid grid-cols-3 gap-2">
                <button onClick={()=>handleDelete(item.id)} className="text-gray-500 hover:text-red-500">
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
            {/* {العميل يدخل الرقم من عنده } */}
            <td colSpan={6} className="px-4 py-2 text-center">
              <div className="flex items-center justify-center space-x-2">
                <button
                  onClick={() => handleSliceChange(slice - 10)}
                  disabled={slice <= 10}
                  className="rounded-md bg-gray-200 px-3 py-1 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
                >
                  السابق
                </button>
                <span className="text-sm text-gray-600">
                  عرض {slice} من {items.length}
                </span>
                <button
                  onClick={() => handleSliceChange(slice + 10)}
                  disabled={slice >= items.length}
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
