import { MdArrowDropUp, MdOutlineCalendarToday, MdBarChart } from "react-icons/md";
import Card from "components/card";
import LineChart from "components/charts/LineChart";
import dayjs from "dayjs";
import { useMemo, useState } from "react";
import { ApexOptions } from "apexcharts";
import useGet from "hooks/useGet";

const TotalSpent = () => {
  const [period, setPeriod] = useState<"month" | "3months" | "year">("month");

  const { data: tableDataComplex } = useGet<any[]>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/asset-item`
  );

  const filteredData = useMemo(() => {
    if (!tableDataComplex) return [];

    const now = dayjs();
    let fromDate = now.startOf("month");

    if (period === "3months") fromDate = now.subtract(3, "month").startOf("month");
    if (period === "year") fromDate = now.subtract(1, "year").startOf("month");

    return tableDataComplex.filter((item: any) =>
      dayjs(item.created_at).isAfter(fromDate)
    );
  }, [tableDataComplex, period]);

  const { chartData, chartOptions, percentageChange } = useMemo(() => {
    if (!filteredData) return { chartData: [], chartOptions: {}, percentageChange: 0 };

    const groupedByMonth = filteredData.reduce((acc: Record<string, number>, item: any) => {
      const month = dayjs(item.created_at).format('YYYY-MM');
      acc[month] = (acc[month] || 0) + 1;
      return acc;
    }, {});

    const currentMonth = dayjs().format("YYYY-MM");
    const previousMonth = dayjs().subtract(1, 'month').format("YYYY-MM");

    const currentCount = groupedByMonth[currentMonth] || 0;
    const previousCount = groupedByMonth[previousMonth] || 0;

    const percentageChange = previousCount > 0 
      ? ((currentCount - previousCount) / previousCount) * 100
      : 0;

    const chartData = [
      {
        name: 'عدد الأصول',
        data: Object.values(groupedByMonth),
        color: '#4318FF',
      },
    ];

    const chartOptions: ApexOptions = {
      chart: { type: 'line', toolbar: { show: false } },
      dataLabels: { enabled: false },
      stroke: { curve: 'smooth' },
      tooltip: { theme: 'dark' },
      xaxis: {
        categories: Object.keys(groupedByMonth).map(month => dayjs(month).format('MMM')),
        labels: {
          style: { colors: '#A3AED0', fontSize: '12px', fontWeight: '500' },
        },
      },
      yaxis: { show: false },
      grid: { show: false },
      legend: { show: false },
    };

    return { chartData, chartOptions, percentageChange };
  }, [filteredData]);

  return (
    <Card extra="!p-[20px] text-center">
      <div className="flex justify-between">
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value as any)}
          className="linear mt-1 rounded-lg bg-lightPrimary p-2 text-sm text-gray-600 hover:bg-gray-100"
        >
          <option value="month">هذا الشهر</option>
          <option value="3months">آخر 3 أشهر</option>
          <option value="year">آخر سنة</option>
        </select>

        <button className="z-[1] flex items-center rounded-lg bg-lightPrimary p-2 text-brand-500 hover:bg-gray-100">
          <MdBarChart className="h-6 w-6" />
        </button>
      </div>

      <div className="flex flex-row justify-between sm:flex-wrap lg:flex-nowrap">
        <div className="flex flex-col">
          <p className="mt-[20px] text-3xl font-bold text-navy-700 dark:text-white">
            {filteredData?.length || 0}
          </p>
          <div className="flex flex-col items-start">
            <p className="mt-2 text-sm text-gray-600">مجموع الأصول</p>
            <div className="flex flex-row items-center">
              {percentageChange >= 0 ? (
                <MdArrowDropUp className="text-green-500" />
              ) : (
                <MdArrowDropUp className="rotate-180 text-red-500" />
              )}
              <p
                className={`text-sm font-bold ${
                  percentageChange >= 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                {percentageChange.toFixed(2)}%
              </p>
            </div>
          </div>
        </div>

        <div className="h-full w-full">
          <LineChart chartOptions={chartOptions} chartData={chartData} />
        </div>
      </div>
    </Card>
  );
};

export default TotalSpent;
