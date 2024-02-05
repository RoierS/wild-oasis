import toast from 'react-hot-toast';

import { useCabins } from '@/hooks/useCabins';
import { ICabin } from '@/types/cabin';
import Spinner from '@/ui/Spinner/Spinner';

import Table from '@/ui/Table/Table';

import CabinRow from './CabinRow';

const CabinTable: React.FC = () => {
  const { isLoading, cabins, error } = useCabins();

  if (isLoading) return <Spinner />;

  if (error) toast.error(error.message);

  return (
    <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
      <Table.Header>
        <div>Image</div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div>Delete</div>
      </Table.Header>
      <Table.Body
        data={cabins}
        render={(cabin: ICabin) => <CabinRow cabin={cabin} key={cabin.id} />}
      />
    </Table>
  );
};

export default CabinTable;
