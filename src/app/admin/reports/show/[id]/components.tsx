import React from 'react';
interface Client {
  client_id: {
    name: string;
    phone: string;
    entity: {
      name: string;
    };
    division: {
      name: string;
      department: {
        name: string;
      };
    };
  };
}
export const Clients = ({ client_id }: Client) => {
  return (
    <section className="mb-6">
      <h3 className="mb-2 border-b pb-1 text-lg font-semibold">
        معلومات العميل
      </h3>
      <p>
        <strong>الاسم:</strong> {client_id?.name || '-'}
      </p>
      <p>
        <strong>الهاتف:</strong> {client_id?.phone || '-'}
      </p>
      <p>
        <strong>الجهة:</strong> {client_id?.entity?.name || '-'}
      </p>
      <p>
        <strong>الشعبة:</strong> {client_id?.division?.name || '-'}
      </p>
      <p>
        <strong>القسم:</strong> {client_id?.division?.department?.name || '-'}
      </p>
    </section>
  );
};

interface RoomTypes {
  room_id: {
    name: string;
    division: {
      name: string;
      department: {
        name: string;
      };
    };
    asset_items_count: any;
  };
}
export const Room = ({ room_id }: RoomTypes) => {
  return (
    <section className="mb-6">
      <h3 className="mb-2 border-b pb-1 text-lg font-semibold">
        معلومات الغرفة
      </h3>
      <p>
        <strong>اسم الغرفة:</strong> {room_id?.name || '-'}
      </p>
      <p>
        <strong>الشعبة:</strong> {room_id?.division?.name || '-'}
      </p>
      <p>
        <strong>القسم:</strong> {room_id?.division?.department?.name || '-'}
      </p>
      <p>
        <strong>عدد العناصر:</strong> {room_id?.asset_items_count ?? '-'}
      </p>
    </section>
  );
};

interface ResultType {
  result: {
    stats: {
      labels_count: string;
      new_count: string;
      found_count: string;
      damaged_count: string;
      unknown_count: string;
      other_room_count: string;
    };
  };
}

export const Result = ({ result }: ResultType) => {
  return (
    <section className="mb-6">
      <h3 className="mb-2 border-b pb-1 text-lg font-semibold">
        إحصائيات التقرير
      </h3>
      <ul className="list-inside list-disc space-y-1">
        <li>عدد الوسوم: {result?.stats?.labels_count ?? '-'}</li>
        <li>جديدة: {result?.stats?.new_count ?? '-'}</li>
        <li>موجودة: {result?.stats?.found_count ?? '-'}</li>
        <li>تالفة: {result?.stats?.damaged_count ?? '-'}</li>
        <li>غير معروفة: {result?.stats?.unknown_count ?? '-'}</li>
        <li>في غرفة أخرى: {result?.stats?.other_room_count ?? '-'}</li>
      </ul>
    </section>
  );
};


export const TableAsset = ({
    currentItems,
    handlePrev,
    handleNext,
    currentPage,
    totalPages
}) => {
  return (    <section>
        <h3 className="mb-2 border-b pb-1 text-lg font-semibold">
          تفاصيل العناصر
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full rounded border text-right text-sm">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="border px-4 py-2">الوسم</th>
                <th className="border px-4 py-2">الحالة</th>
                <th className="border px-4 py-2">اسم الأصل</th>
                <th className="border px-4 py-2">في الغرفة المطلوبة</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length ? (
                currentItems.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td className="border px-4 py-2">{item.label}</td>
                    <td className="border px-4 py-2 capitalize">
                      {item.status}
                    </td>
                    <td className="border px-4 py-2">{item.asset_name}</td>
                    <td className="border px-4 py-2">
                      {item.in_requested_room ? 'نعم' : 'لا'}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="p-4 text-center text-gray-500 dark:text-gray-400"
                  >
                    لا توجد عناصر لعرضها
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-4 flex justify-center space-x-6 m-5 ">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className={`rounded-lg px-4 py-2 font-semibold ${
              currentPage === 1
                ? 'cursor-not-allowed bg-gray-300'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            السابق
          </button>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages || totalPages === 0}
            className={`rounded-lg px-4 py-2 font-semibold ${
              currentPage === totalPages || totalPages === 0
                ? 'cursor-not-allowed bg-gray-300'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            التالي
          </button>
        </div>
      </section>
  )
}
