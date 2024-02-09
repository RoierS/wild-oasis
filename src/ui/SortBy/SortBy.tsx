import { ChangeEvent } from 'react';

import { useSearchParams } from 'react-router-dom';

import { IOptions } from '@/types/options';

import Select from '../Select/Select';

interface ISortByProps {
  options: IOptions[];
}

const SortBy: React.FC<ISortByProps> = ({ options }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSortBy = searchParams.get('sortBy') || options.at(0)?.value;

  const handlelChange = (e: ChangeEvent<HTMLSelectElement>) => {
    searchParams.set('sortBy', e.target.value);
    setSearchParams(searchParams);
  };

  return (
    <Select
      options={options}
      $type={'white'}
      onChange={handlelChange}
      value={currentSortBy || ''}
    />
  );
};

export default SortBy;
