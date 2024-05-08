'use client';

import { useTransactionMetrics } from '@/services/queries/transaction';
import { loadingChartData } from '@/utils/dashboardItems';
import { formatAmount, formatDateString } from '@/utils/helpers';
import {
  Area,
  AreaChart,
  Label,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

function Chart({ className = '' }: { className?: string }) {
  const today = new Date();
  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(today.getDate() - 7);

  const { data } = useTransactionMetrics(
    formatDateString(sevenDaysAgo.toString(), 'YYYY-MM-DD'),
    formatDateString(today.toString(), 'YYYY-MM-DD'),
  );

  const chartData = data?.map(item => ({
    day: formatDateString(item.day, 'dddd'),
    amount: item.totalAmount,
    type: item.type,
  }));

  chartData?.forEach(chart => {
    const index = loadingChartData.findIndex(
      defaultItem => defaultItem.day.toLowerCase() === chart.day.toLowerCase(),
    );
    if (index !== -1) {
      const flow = chart.type === 'CREDIT' ? 'inflow' : 'outflow';
      loadingChartData[index][flow] = chart.amount;
    }
  });

  return (
    <div className={`h-full w-full rounded-lg bg-white py-3 pl-2 pr-5 md:col-span-4 ${className}`}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          height={250}
          data={loadingChartData}
          margin={{ top: 10, right: 0, left: 0, bottom: 20 }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#1977F2" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#1977F2" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#FFAB00" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#FFAB00" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="day" className="text-[12px]">
            <Label
              className="text-[12px] text-grey-700"
              offset={-10}
              value="Days"
              position="insideBottom"
            />
          </XAxis>
          <YAxis className="text-[12px]">
            <Label
              className="text-[12px] text-grey-700"
              angle={-90}
              offset={20}
              value="Amount(₦)"
              position="insideBottom"
            />
          </YAxis>
          <Tooltip
            formatter={value => formatAmount(Number(value))}
            itemStyle={{ textTransform: 'capitalize' }}
          />
          <Legend
            verticalAlign="top"
            align="right"
            iconType="circle"
            iconSize={8}
            height={36}
            formatter={value => value.charAt(0).toUpperCase() + value.slice(1)}
          />
          <Area
            type="monotone"
            dataKey="inflow"
            stroke="#1977F2"
            fillOpacity={0.3}
            strokeWidth={2.5}
            fill="url(#colorUv)"
          />
          <Area
            type="monotone"
            dataKey="outflow"
            stroke="#FFAB00"
            fillOpacity={0.3}
            strokeWidth={2.5}
            fill="url(#colorPv)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Chart;
