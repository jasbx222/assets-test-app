'use client';
import MiniCalendar from 'components/calendar/MiniCalendar';
import WeeklyRevenue from 'components/admin/default/WeeklyRevenue';
import TotalSpent from 'components/admin/default/TotalSpent';
import PieChartCard from 'components/admin/default/PieChartCard';
import { IoMdHome } from 'react-icons/io';
import { IoDocuments } from 'react-icons/io5';
import { MdBarChart, MdDashboard } from 'react-icons/md';

import Widget from 'components/widget/Widget';
import CheckTable from 'components/admin/default/CheckTable';
import ComplexTable from 'components/admin/default/ComplexTable';
import DailyTraffic from 'components/admin/default/DailyTraffic';
import TaskCard from 'components/admin/default/TaskCard';
import tableDataCheck from 'variables/data-tables/tableDataCheck';
import tableDataComplex from 'variables/data-tables/tableDataComplex';
import useGet from 'hooks/useGet';
import { useRouter, useSearchParams } from 'next/navigation';

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
  }
};
const { data } = useGet<RowObj[]>(`${process.env.NEXT_PUBLIC_BASE_URL}/asset-item`);

   const searchParams = useSearchParams();
  const router = useRouter();

  const itemsPerPage = 10; // Number of items per page
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  if (!Array.isArray(data)) return null;

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const currentItems = data.slice(start, end);

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
          icon={<IoDocuments className="h-6 w-6" />}
          title={'  اخر الجرد'}
          subtitle={'642.39'}
        />
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={'الاصول التالفه'}
          subtitle={'574.34'}
        />
        <Widget
          icon={<MdDashboard className="h-6 w-6" />}
          title={'الموظفين '}
          subtitle={'1000'}
        />
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={'الاقسام '}
          subtitle={'45'}
        />
        <Widget
          icon={<IoMdHome className="h-6 w-6" />}
          title={'الشعب '}
          subtitle={'33'}
        />
      </div>

      {/* Charts */}

      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        <TotalSpent />
        <WeeklyRevenue />
      </div>

      {/* Tables & Charts */}

      <div className=" w-full container ">
        {/* Complex Table , Task & Calendar */}

        <ComplexTable tableData={currentItems}  goToPage={goToPage}totalPages={totalPages} currentPage={currentPage}/>
      </div>
    </div>
  );
};

export default Dashboard;
