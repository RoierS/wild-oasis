import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import styled from 'styled-components';

import { useDarkMode } from '@/hooks/useDarkMode';
import { IBooking } from '@/types/booking';
import Heading from '@/ui/Heading/Heading';

import { prepareData, startDataDark, startDataLight } from './chartData';

const ChartBox = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  grid-area: durationChart;

  padding: 2.4rem 3.2rem;

  & > *:first-child {
    margin-bottom: 1.6rem;
  }

  & .recharts-pie-label-text {
    font-weight: 600;
  }

  & .recharts-surface {
    cursor: pointer;
  }

  & .recharts-sector:focus {
    border: none;
    outline: none;
  }

  @media screen and (max-width: 768px) {
    padding: 1.5rem;
  }
`;

interface IDurationChartProps {
  confirmedStays: IBooking[];
}

const DurationChart: React.FC<IDurationChartProps> = ({ confirmedStays }) => {
  const { isDarkMode } = useDarkMode();
  const startData = isDarkMode ? startDataDark : startDataLight;
  const data = prepareData(startData, confirmedStays);

  return (
    <ChartBox>
      <Heading as="h2">Stay duration summary</Heading>
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="duration"
            innerRadius="65%"
            outerRadius="85%"
            cx="50%"
            cy="50%"
            paddingAngle={2}
          >
            {data.map((entry) => (
              <Cell
                key={entry.duration}
                fill={entry.color}
                stroke={entry.color}
                fillOpacity={0.8}
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              borderRadius: 'var(--border-radius-md)',
            }}
          />
          <Legend
            verticalAlign="middle"
            align="right"
            iconType="circle"
            iconSize={15}
            layout="vertical"
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartBox>
  );
};

export default DurationChart;
