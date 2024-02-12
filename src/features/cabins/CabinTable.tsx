import toast from 'react-hot-toast';

import { useSearchParams } from 'react-router-dom';

import { useCabins } from '@/hooks/useCabins';
import { ICabin } from '@/types/cabin';
import Empty from '@/ui/Empty/Empty';
import Menus from '@/ui/Menus/Menus';
import Spinner from '@/ui/Spinner/Spinner';

import Table from '@/ui/Table/Table';

import CabinRow from './CabinRow';

const CabinTable: React.FC = () => {
  const { isLoading, cabins, error } = useCabins();
  const [searchParams] = useSearchParams();

  // FILTER
  const filterValue = searchParams.get('discount') || 'all';

  const filteredCabins = cabins?.filter((cabin: ICabin) => {
    if (filterValue === 'all') return true;
    if (filterValue === 'no-discount') return !cabin.discount;
    if (filterValue === 'with-discount') return cabin.discount;
  });

  // SORT
  const sortValue = searchParams.get('sortBy') || 'name-asc';
  const [sortField, sortOrder] = sortValue.split('-');
  const modifier = sortOrder === 'asc' ? 1 : -1;

  const sortedCabins = filteredCabins?.sort((a: ICabin, b: ICabin) => {
    if (sortField === 'name') {
      return a.name && b.name ? a.name.localeCompare(b.name) * modifier : 0;
    } else if (
      sortField === 'regularPrice' ||
      sortField === 'maxCapacity' ||
      sortField === 'discount'
    ) {
      const aValue = a[sortField] ?? 0;
      const bValue = b[sortField] ?? 0;
      return (aValue - bValue) * modifier;
    } else {
      return 0;
    }
  });

  if (!cabins?.length) return <Empty resourceName="cabins" />;

  if (isLoading) return <Spinner />;

  if (error) toast.error(error.message);

  return (
    <Menus>
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
          data={sortedCabins as ICabin[]}
          render={(cabin: ICabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
};

export default CabinTable;
