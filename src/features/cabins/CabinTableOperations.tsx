import Filter from '@/ui/Filter/Filter';
import SortBy from '@/ui/SortBy/SortBy';
import TableOperations from '@/ui/TableOperations/TableOperations';

const CabinTableOperations: React.FC = () => {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          { label: 'All', value: 'all' },
          { label: 'No discount', value: 'no-discount' },
          { label: 'With discount', value: 'with-discount' },
        ]}
      />

      <SortBy
        options={[
          {
            label: 'Sort by name (A-Z)',
            value: 'name-asc',
          },
          {
            label: 'Sort by name (Z-A)',
            value: 'name-desc',
          },
          {
            label: 'Sort by price (min → max)',
            value: 'regularPrice-asc',
          },
          {
            label: 'Sort by price (max → min)',
            value: 'regularPrice-desc',
          },
          {
            label: 'Sort by capacity (low → high)',
            value: 'maxCapacity-asc',
          },
          {
            label: 'Sort by capacity (hight → low)',
            value: 'maxCapacity-desc',
          },
          {
            label: 'Sort by discount (min → max)',
            value: 'discount-asc',
          },
          {
            label: 'Sort by discount (max → min)',
            value: 'discount-desc',
          },
        ]}
      />
    </TableOperations>
  );
};

export default CabinTableOperations;
