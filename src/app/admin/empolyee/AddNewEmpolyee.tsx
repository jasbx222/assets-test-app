'use client';
import {toast} from 'react-toastify';
import React, { useEffect, useState } from 'react';
import Inputs from './Inputs';
// import axios from 'axios';
import usePost from 'hooks/usePost';
import useGet from 'hooks/useGet';
import Swal from 'sweetalert2';

type Entity = { id: number; name: string };
type Department = { id: number; name: string };
type Division = { id: number; name: string };

const AddNewEmpolyee = ({ onClose ,refetch }: { onClose: () => void ,refetch:()=>void }) => {
  const [name, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [entityId, setEntityId] = useState('');
  const [departmentId, setDepartmentId] = useState('');
  const [divisionId, setDivisionId] = useState('');
  const [password, setPass] = useState('');

  const { data: entities } = useGet<Entity>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/entities`,
  );

  const { data: departmentsData } = useGet<Department>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/departments`,
  );
  const { data: divisionsData } = useGet<Division>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/divisions`,
  );

  const { add, response } = usePost();
  const handleSubmit =async (e: React.FormEvent) => {
    e.preventDefault();

try {
      const payload = {
      name: name,
      phone,
      password,
      expiry_date: expiryDate,
      entity_id: Number(entityId),
      department_id: Number(departmentId),
      division_id: Number(divisionId),
    };
    await add(`${process.env.NEXT_PUBLIC_BASE_URL}/clients`, payload, false)

      toast.success(' تمت اضافة الموظف بنجاح')
    refetch()
} catch (error) {
     Swal.fire({
      title:`${error.message}`,
icon:"error",
  timer: 2000  
      })
}
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <button
        className=" text-gray-900 hover:text-gray-700 dark:text-gray-200 dark:hover:text-white"
        onClick={onClose}
      >
        {response && response && (
          <div className="mb-2 text-green-500">تم اضافة الموظف بنجاح</div>
        )}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <h1 className="text-2xl font-bold text-navy-700 dark:text-white">
        اضافة موظف جديد
      </h1>
      <p className="mt-2 text-base text-gray-600 dark:text-gray-400">
        يمكنك اضافة موظف جديد من خلال النموذج التالي
      </p>

      <div className="mt-5 w-full max-w-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Inputs
            label="الاسم الكامل"
            placeholder="ادخل الاسم الكامل"
            type="text"
            onChange={(e: any) => setFullName(e.target.value)}
            value={name}
          />

          <Inputs
            label="رقم الهاتف"
            placeholder="ادخل رقم الهاتف"
            type="tel"
            onChange={(e: any) => setPhone(e.target.value)}
            value={phone}
          />
          {/* {password} */}
          <Inputs
            label="كلمة المرور"
            placeholder="  ادخل كلمة المرور"
            type="password"
            onChange={(e: any) => setPass(e.target.value)}
            value={password}
          />

          <Inputs
            label="تاريخ الانتهاء"
            placeholder="ادخل تاريخ الانتهاء"
            type="date"
            onChange={(e: any) => setExpiryDate(e.target.value)}
            value={expiryDate}
          />

          {/* الهيئة */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-white">
              الهيئة
            </label>
            <select
              className="w-full rounded border px-3 py-2 dark:bg-navy-700 dark:text-white"
              value={entityId}
              onChange={(e: any) => setEntityId(e.target.value)}
            >
              <option value="">اختر الهيئة</option>
              {entities.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.name}
                </option>
              ))}
            </select>
          </div>

          {/* قسم رئيسي */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-white">
              القسم الرئيسي
            </label>
            <select
              className="w-full rounded border px-3 py-2 dark:bg-navy-700 dark:text-white"
              value={departmentId}
              onChange={(e: any) => setDepartmentId(e.target.value)}
            >
              <option value="">اختر القسم الرئيسي</option>
              {departmentsData.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          {/* قسم فرعي */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-white">
              القسم الفرعي
            </label>
            <select
              className="w-full rounded border px-3 py-2 dark:bg-navy-700 dark:text-white"
              value={divisionId}
              onChange={(e: any) => setDivisionId(e.target.value)}
            >
              <option value="">اختر القسم الفرعي</option>
              {divisionsData.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="h-[40px] w-full rounded-md bg-brand-500 font-semibold text-white hover:bg-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
          >
            اضافة موظف
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNewEmpolyee;
