import DashboardFilter from '@/features/dashboard/DashboardFilter';
import DashboardLayout from '@/features/dashboard/DashboardLayout';
import Heading from '@/ui/Heading/Heading';
import Row from '@/ui/Row/Row';

const Dashboard = () => {
  return (
    <>
      <Row $type="horizontal">
        <Heading as="h1">Dashboard</Heading>
        <DashboardFilter />
      </Row>
      <DashboardLayout />
    </>
  );
};

export default Dashboard;
