'use client';

import useShow from 'hooks/useShow';
import { useParams } from 'next/navigation';
import React from 'react';
import {
  CheckCircle,
  XCircle,
  Phone,
  Calendar,
  Building2,
  User,
} from 'lucide-react';
import { DetailRow } from '../DetailRow';
import { EmployeeShow } from 'types/data';
import usePutClosedMsg from 'hooks/usePutClosedMsg';

import { useRouter } from 'next/navigation';

const EmployeeDetails = () => {
  const route = useRouter();
  const { id } = useParams();
  const { data: employee } = useShow<EmployeeShow>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/clients`,
    id,
  );
  // toggle-active/
  const { update } = usePutClosedMsg();
  const handleToggleActive = async () => {
    update(`${process.env.NEXT_PUBLIC_BASE_URL}/clients/toggle-active/${id}`);
    route.refresh();
    // هنا يمكنك إضافة منطق التحديث أو إعادة تحميل البيانات
  };
  return (
    <div className="mx-auto mt-10 max-w-4xl rounded-2xl bg-white p-8 shadow-xl dark:bg-navy-800">
      <h1 className="mb-8 border-b pb-4 text-3xl font-bold text-navy-700 dark:text-white">
        تفاصيل الموظف
      </h1>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <DetailRow
          label="الاسم الكامل"
          value={employee?.name}
          icon={<User size={20} />}
        />
        <DetailRow
          label="رقم الهاتف"
          value={employee?.phone}
          icon={<Phone size={20} />}
        />
        <DetailRow
          label="الحالة"
          value={
            employee?.is_active ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700 dark:bg-green-700/20 dark:text-green-400">
                <CheckCircle size={14} /> مفعل
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-700 dark:bg-red-700/20 dark:text-red-400">
                <XCircle size={14} /> غير مفعل
              </span>
            )
          }
        />
        <div className="flex items-center gap-3 rounded-lg border p-4 dark:border-white/10">
          <span className="text-sm font-medium text-gray-700 dark:text-white">
            زر تفعيل/إلغاء التفعيل
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={handleToggleActive}
              className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold ${
                employee?.is_active
                  ? 'bg-red-100 text-red-700 dark:bg-red-700/20 dark:text-red-400'
                  : 'bg-green-100 text-green-700 dark:bg-green-700/20 dark:text-green-400'
              }`}
            >
              {employee?.is_active ? (
                <>
                  <XCircle size={14} /> إلغاء التفعيل
                </>
              ) : (
                <>
                  <CheckCircle size={14} /> تفعيل
                </>
              )}
            </button>
          </div>
        </div>
        <DetailRow
          label="تاريخ الانتهاء"
          value={employee?.expiry_date}
          icon={<Calendar size={20} />}
        />
        <DetailRow
          label="تاريخ الإنشاء"
          value={employee?.created_at}
          icon={<Calendar size={20} />}
        />
        <DetailRow
          label="الهيئة"
          value={employee?.entity?.name}
          icon={<Building2 size={20} />}
        />
        <DetailRow
          label="القسم الرئيسي"
          value={employee?.departmen?.name || '—'}
          icon={<Building2 size={20} />}
        />
        <DetailRow
          label="القسم الفرعي"
          value={employee?.division?.name || '—'}
          icon={<Building2 size={20} />}
        />
      </div>
    </div>
  );
};

export default EmployeeDetails;
