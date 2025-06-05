import useGet from '../../../hooks/useGet';
import { useMemo } from 'react';
import dayjs from 'dayjs';
import { ApexOptions } from 'apexcharts';
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });
export default function AssetChart() {
  const { data: assets, loading } = useGet<any[]>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/assets`,
  );

  const chartData = useMemo(() => {
    if (!assets) return { data: [], categories: [] };

    const groupedByDay = assets.reduce(
      (acc: Record<string, number>, asset: any) => {
        const day = dayjs(asset.created_at).format('DD/MM');
        acc[day] = (acc[day] || 0) + 1;
        return acc;
      },
      {},
    );

    return {
      data: [
        {
          name: 'عدد الأصول اليومية',
          data: Object.values(groupedByDay),
        },
      ],
      categories: Object.keys(groupedByDay),
    };
  }, [assets]);

  const barChartOptions: ApexOptions = {
    chart: { toolbar: { show: false } },
    xaxis: {
      categories: chartData.categories,
      labels: {
        style: {
          colors: '#A3AED0',
          fontSize: '14px',
          fontWeight: '500',
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: '#CBD5E0',
          fontSize: '14px',
        },
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        colorStops: [
          [
            { offset: 0, color: '#4318FF', opacity: 1 },
            { offset: 100, color: 'rgba(67, 24, 255, 1)', opacity: 0.28 },
          ],
        ],
      },
    },
    plotOptions: {
      bar: { borderRadius: 10, columnWidth: '40px' },
    },
    dataLabels: { enabled: false },
    tooltip: { theme: 'dark' },
  };

  if (loading) return <p>تحميل البيانات...</p>;

  return (
    <Chart
      options={barChartOptions}
      series={chartData.data}
      type="bar"
      height={350}
    />
  );
}
