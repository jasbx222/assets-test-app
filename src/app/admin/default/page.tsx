'use client';
// import MiniCalendar from 'components/calendar/MiniCalendar';
import Chart from 'components/admin/default/WeeklyRevenue';
import TotalSpent from 'components/admin/default/TotalSpent';
// import PieChartCard from 'components/admin/default/PieChartCard';
import { IoMdHome } from 'react-icons/io';
// import { IoDocuments, IoHomeOutline } from 'react-icons/io5';
import { MdBarChart } from 'react-icons/md';

import Widget from 'components/widget/Widget';
// import CheckTable from 'components/admin/default/CheckTable';
import ComplexTable from 'components/admin/default/ComplexTable';
// import DailyTraffic from 'components/admin/default/DailyTraffic';
// import TaskCard from 'components/admin/default/TaskCard';
// import tableDataCheck from 'variables/data-tables/tableDataCheck';
// import tableDataComplex from 'variables/data-tables/tableDataComplex';
import useGet from 'hooks/useGet';
import { useRouter, useSearchParams } from 'next/navigation';
import { FaBell, FaUser } from 'react-icons/fa';

const Dashboard = () => {
  type RowObj = {
    name: string;
    status: string;
    created_at: string;
    label: string;
    asset: {
      id: string;
      name: string;
      description: string;
      category: string;
      location: string;
      status: string;
      created_at: string;
      updated_at: string;
    };
  };
  const { data: tableDataComplex } = useGet<RowObj[]>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/asset-item`,
  );
  const { data: empolyee } = useGet<RowObj[]>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/clients`,
  );
  const { data: notifaction } = useGet<RowObj[]>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/notification`,
  );
  const { data: departments } = useGet<RowObj[]>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/departments`,
  );
  const { data: entities } = useGet<RowObj[]>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/entities`,
  );
  const { data: assets } = useGet<any>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/assets`,
  );

  const searchParams = useSearchParams();
  const router = useRouter();

  const itemsPerPage = 10; // Number of items per page
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  if (!Array.isArray(tableDataComplex)) return null;

  const totalPages = Math.ceil(tableDataComplex.length / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const currentItems = tableDataComplex.slice(start, end);

  const goToPage = (page: number) => {
    router.push(`?page=${page}`);
  };

  return (
    <div>
      {/* Card widget */}

      <div className="mt-3 grid  grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={'اجمالي الاصول'}
          subtitle={tableDataComplex.length.toString()}
        />
        <Widget
          icon={<MdBarChart className="h-6 w-6" />}
          title={'  اخر الجرد'}
          subtitle={assets[assets.length - 1]?.created_at.slice(
            12, 20
          
          ) || 'لا يوجد بيانات'}
        />
        <Widget
          icon={<FaBell className="h-7 w-7" />}
          title={'الاشعارات'}
          subtitle={notifaction.length.toString()}
        />
        <Widget
          icon={<FaUser className="h-6 w-6" />}
          title={'الموظفين '}
          subtitle={empolyee.length.toString()}
        />
        <Widget
          icon={<IoMdHome className="h-7 w-7" />}
          title={'الاقسام '}
          subtitle={departments.length.toString()}
        />
        <Widget
          icon={<IoMdHome className="h-6 w-6" />}
          title={'الشعب '}
          subtitle={entities.length.toString()}
        />
      </div>

      {/* Charts */}

      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        <TotalSpent />
        <Chart />
      </div>

      {/* Tables & Charts */}

      <div className=" container w-full ">
        {/* Complex Table , Task & Calendar */}

        <ComplexTable
          tableData={currentItems}
          goToPage={goToPage}
          totalPages={totalPages}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default Dashboard;
