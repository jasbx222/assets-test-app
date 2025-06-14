import React from 'react'

const TableReports = ({
    currentReports,
    
    
handleViewDetails
}) => {
  return (
     <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full border bg-white dark:bg-navy-800 text-right text-sm" dir='rtl'>
          <thead className="bg-gray-100 font-semibold text-gray-700 dark:bg-navy-800 dark:text-white/80">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">اسم المستخدم</th>
              <th className="px-4 py-3">الهيئة</th>
              <th className="px-4 py-3">الشعبة</th>
              <th className="px-4 py-3">القسم</th>
              <th className="px-4 py-3">الغرفة</th>
              <th className="px-4 py-3">عدد العناصر</th>
              <th className="px-4 py-3">جديدة</th>
              <th className="px-4 py-3">تالفة</th>
              <th className="px-4 py-3">موجودة</th>
              <th className="px-4 py-3">الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {currentReports.map((report: any) => (
              <tr key={report.id} className="border-b hover:bg-gray-50 dark:bg-navy-800 dark:text-white/80">
                <td className="px-4 py-3 font-medium">#{report.id}</td>
                <td className="px-4 py-3">{report.client_id?.name || '-'}</td>
                <td className="px-4 py-3">
                  {report.client_id?.organization?.name || '-'}
                </td>
                <td className="px-4 py-3">
                  {report.client_id?.division?.name || '-'}
                </td>
                <td className="px-4 py-3">
                  {report.client_id?.department?.name || '-'}
                </td>
                <td className="px-4 py-3">{report.room_id?.name || '-'}</td>
                <td className="px-4 py-3">
                  {report.result?.stats?.labels_count ?? '-'}
                </td>
                <td className="px-4 py-3">
                  {report.result?.stats?.new_count ?? '-'}
                </td>
                <td className="px-4 py-3">
                  {report.result?.stats?.damaged_count ?? '-'}
                </td>
                <td className="px-4 py-3">
                  {report.result?.stats?.found_count ?? '-'}
                </td>
                <td className="flex justify-end gap-2 px-4 py-3">
                  <button
                    onClick={() => handleViewDetails(report.id)}
                    className="rounded bg-blue-500 px-2 py-1 text-white hover:bg-blue-600"
                  >
                    تفاصيل
                  </button>
                </td>
              </tr>
            ))}
            {currentReports.length === 0 && (
              <tr>
                <td colSpan={11} className="p-4 text-center text-gray-500">
                  لا توجد تقارير مطابقة
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
  )
}

export default TableReports