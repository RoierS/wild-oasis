import { useState, useCallback } from 'react';

import { eachDayOfInterval, format, isSameDay, subDays } from 'date-fns';
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Payload } from 'recharts/types/component/DefaultLegendContent';
import styled from 'styled-components';

import { useDarkMode } from '@/hooks/useDarkMode';
import { IBooking } from '@/types/booking';
import Heading from '@/ui/Heading/Heading';

import DashboardBox from './DashboardBox';

const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  /* Change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }

  & .recharts-legend-item {
    cursor: pointer;
  }
`;

interface ISalesChartProps {
  recentBookings: IBooking[];
  numDays: number;
}

const SalesChart: React.FC<ISalesChartProps> = ({
  recentBookings,
  numDays,
}) => {
  const { isDarkMode } = useDarkMode();

  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });

  const data = allDates.map((date) => {
    return {
      label: format(date, 'MMM dd'),

      totalSales: recentBookings
        .filter((booking) => isSameDay(date, new Date(booking.created_at)))
        .reduce((total, booking) => total + booking.totalPrice, 0),

      extrasSales: recentBookings
        .filter((booking) => isSameDay(date, new Date(booking.created_at)))
        .reduce((total, booking) => total + booking.extrasPrice, 0),
    };
  });

  const colors = isDarkMode
    ? {
        totalSales: { stroke: '#4f46e5', fill: '#4f46e5' },
        extrasSales: { stroke: '#22c55e', fill: '#22c55e' },
        text: '#e5e7eb',
        background: '#18212f',
      }
    : {
        totalSales: { stroke: '#4f46e5', fill: '#c7d2fe' },
        extrasSales: { stroke: '#16a34a', fill: '#dcfce7' },
        text: '#374151',
        background: '#fff',
      };

  const [opacity, setOpacity] = useState({
    totalSales: 1,
    extrasSales: 1,
  });

  const handleMouseEnter = useCallback(
    (data: Payload) => {
      const { dataKey } = data as { dataKey: string };
      setOpacity({ ...opacity, [dataKey]: 1 });
    },
    [opacity, setOpacity],
  );

  const handleMouseLeave = useCallback(
    (data: Payload) => {
      const { dataKey } = data as { dataKey: string };
      setOpacity({ ...opacity, [dataKey]: 0.5 });
    },
    [opacity, setOpacity],
  );

  return (
    <StyledSalesChart>
      <Heading as="h3">
        Sales from {format(allDates[0], 'MMM dd yyyy')} &ndash;{' '}
        {format(allDates[allDates.length - 1], 'MMM dd yyyy')}
      </Heading>
      <ResponsiveContainer height={300} width="100%">
        <AreaChart data={data}>
          <XAxis
            dataKey="label"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <YAxis
            unit="$"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <CartesianGrid strokeDasharray="4" />
          <Legend
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: colors.background,
              borderRadius: 'var(--border-radius-md)',
            }}
          />
          <Area
            dataKey="totalSales"
            type="monotone"
            stroke={colors.totalSales.stroke}
            fill={colors.totalSales.fill}
            strokeWidth={2}
            name="Total Sales"
            unit="$"
            strokeOpacity={opacity.totalSales}
            fillOpacity={opacity.totalSales}
          />
          <Area
            dataKey="extrasSales"
            type="monotone"
            stroke={colors.extrasSales.stroke}
            fill={colors.extrasSales.fill}
            name="Extras Sales"
            unit="$"
            strokeOpacity={opacity.extrasSales}
            fillOpacity={opacity.extrasSales}
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  );
};

export default SalesChart;
