'use client';

import React, { useState, useEffect } from 'react';
import Inputs from '../../Inputs';
import useGet from 'hooks/useGet';
import useUpdate from 'hooks/useUpdate';
import { useRouter, useParams } from 'next/navigation';
import useShow from 'hooks/useShow';
import { EmployeeShow } from '../../../../../types/data';

type Entity = { id: number; name: string };
type Department = { id: number; name: string };
type Division = { id: number; name: string };

const Page = () => {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();

  const { data: empolyee } = useShow<EmployeeShow>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/clients`,
    id
  );

  const [name, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [entityId, setEntityId] = useState('');
  const [departmentId, setDepartmentId] = useState('');
  const [divisionId, setDivisionId] = useState('');
  const [password, setPass] = useState('');

  useEffect(() => {
    if (empolyee) {
      setFullName(empolyee.name || '');
      setPhone(empolyee.phone || '');
      setExpiryDate(empolyee.expiry_date || '');
      setEntityId(empolyee.entity?.id?.toString() || '');
      setDepartmentId(empolyee.department?.id?.toString() || '');
      setDivisionId(empolyee.division?.id?.toString() || '');
    }
  }, [empolyee]);

  const { data: entities = [] } = useGet<Entity>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/entities`
  );
  const { data: departmentsData = [] } = useGet<Department>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/departments`
  );
  const { data: divisionsData = [] } = useGet<Division>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/divisions`
  );

  const { update, response } = useUpdate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!id) return;

    const payload = {
      name,
      phone,
      password,
      expiry_date: expiryDate,
      entity_id: Number(entityId),
      department_id: Number(departmentId),
      division_id: Number(divisionId),
    };

    update(`${process.env.NEXT_PUBLIC_BASE_URL}/clients/${id}`, payload);
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <button
        className="text-gray-900 hover:text-gray-700 dark:text-gray-200 dark:hover:text-white"
        onClick={() => router.push('/empolyee')}
      >
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

      {response && (
        <div className="mb-2 text-green-500">تم التعديل الموظف بنجاح</div>
      )}

      <h1 className="text-2xl font-bold text-navy-700 dark:text-white">
        تعديل معلومات الموظف
      </h1>

      <div className="mt-5 w-full max-w-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Inputs
            label="الاسم الكامل"
            placeholder="ادخل الاسم الكامل"
            type="text"
            onChange={(e) => setFullName(e.target.value)}
            value={name}
          />

          <Inputs
            label="رقم الهاتف"
            placeholder="ادخل رقم الهاتف"
            type="tel"
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
          />

          <Inputs
            label="كلمة المرور"
            placeholder="ادخل كلمة المرور"
            type="password"
            onChange={(e) => setPass(e.target.value)}
            value={password}
          />

          <Inputs
            label="تاريخ الانتهاء"
            placeholder="ادخل تاريخ الانتهاء"
            type="date"
            onChange={(e) => setExpiryDate(e.target.value)}
            value={expiryDate}
          />

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-white">
              الهيئة
            </label>
            <select
              className="w-full rounded border px-3 py-2 dark:bg-navy-700 dark:text-white"
              value={entityId}
              onChange={(e) => setEntityId(e.target.value)}
            >
              <option value="">اختر الهيئة</option>
              {entities.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-white">
              القسم الرئيسي
            </label>
            <select
              className="w-full rounded border px-3 py-2 dark:bg-navy-700 dark:text-white"
              value={departmentId}
              onChange={(e) => setDepartmentId(e.target.value)}
            >
              <option value="">اختر القسم الرئيسي</option>
              {departmentsData.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-white">
              الشعبة
            </label>
            <select
              className="w-full rounded border px-3 py-2 dark:bg-navy-700 dark:text-white"
              value={divisionId}
              onChange={(e) => setDivisionId(e.target.value)}
            >
              <option value="">اختر الشعبة</option>
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
            تعديل موظف
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
