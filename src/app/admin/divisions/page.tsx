'use client';
import Pageination from 'components/pageination/Pageination';
import useGet from 'hooks/useGet';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import SearchInput from 'components/fields/SearchInput';

interface DivisionProps {
  id: number;
  name: string;
  department: {
    name: string;
    entity: {
      name: string;
    };
  };
  assets_count: number;
  created_at: string;
}

const DivisionCard: React.FC<{ division: DivisionProps }> = ({ division }) => {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-md transition-all hover:shadow-lg dark:bg-navy-800">
      <div className="space-y-2 text-right">
        <h2 className="text-lg font-bold text-blue-700 dark:text-white/90">
          {division.name}
        </h2>
        <p className="text-sm text-gray-700 dark:text-white/90">
          القسم:{' '}
          <span className="font-semibold">{division.department.name}</span>
        </p>
        <p className="text-sm text-gray-700 dark:text-white/90">
          الجهة:{' '}
          <span className="font-semibold">
            {division.department.entity.name}
          </span>
        </p>
        <p className="text-sm text-gray-700 dark:text-white/90">
          عدد الأصول:{' '}
          <span className="font-semibold">{division.assets_count}</span>
        </p>
        <p className="text-xs text-gray-400 dark:text-white/90">
          أنشئت في: {division.created_at}
        </p>
      </div>
    </div>
  );
};

export default function DivisionsListPage() {
  const { data } = useGet<DivisionProps>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/divisions`,
  );
  const [query, setQuery] = React.useState('');
  const router = useRouter();
  const searchParams = useSearchParams();

  if (!data) return null;

  // فلترة حسب الاسم
  const filteredData = data.filter((d) =>
    d?.name.toLowerCase().includes(query.toLowerCase()),
  );

  const itemsPerPage = 6;
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredData.slice(start, start + itemsPerPage);

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.replace(`?${params.toString()}`);
  };

  return (
    <div dir="rtl" className="container mx-auto px-4 py-10">
      <h1 className="mb-8 text-center text-2xl font-bold text-blue-800">
        الشعب المالية
      </h1>

      <SearchInput
        value={query}
        onChange={(e: any) => setQuery(e.target.value)}
        plaecholder="ابحث عن الشعبة..."
      />

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {currentItems.map((division) => (
          <DivisionCard key={division.id} division={division} />
        ))}
      </div>

      <div className="mt-10">
        <Pageination
          totalPages={totalPages}
          currentPage={currentPage}
          goToPage={goToPage}
        />
      </div>
    </div>
  );
}
