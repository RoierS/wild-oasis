import DashboardFilter from '@/features/dashboard/DashboardFilter';
import DashboardLayout from '@/features/dashboard/DashboardLayout';
import useMediaQuery from '@/hooks/useMediaQuery';
import Heading from '@/ui/Heading/Heading';
import Row from '@/ui/Row/Row';

const Dashboard = () => {
  const isMobile = useMediaQuery('(max-width: 568px)');
  return (
    <>
      <Row $type={isMobile ? 'vertical' : 'horizontal'}>
        <Heading as="h1">Dashboard</Heading>
        <DashboardFilter />
      </Row>
      <DashboardLayout />
    </>
  );
};

export default Dashboard;
