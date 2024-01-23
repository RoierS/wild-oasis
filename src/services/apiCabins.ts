import supabase from './supabase';

export const getCabins = async () => {
  const { data, error } = await supabase.from('cabins').select('*');

  if (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    throw new Error('Cabins could not be loaded');
  }

  return data;
};
