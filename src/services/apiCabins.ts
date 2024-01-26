/* eslint-disable no-console */

import { IFormData } from '@/types/formData';

import supabase, { supabaseUrl } from './supabase';

// fetch all cabins from DB
export const getCabins = async () => {
  const { data, error } = await supabase.from('cabins').select('*');

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be loaded');
  }

  return data;
};

// delete cabin by Id
export const deleteCabin = async (id: number) => {
  const { data, error } = await supabase.from('cabins').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('Cabin could not be deleted');
  }

  return data;
};

// create new cabin
export const createCabin = async (newCabin: IFormData) => {
  const imageName = `${Math.random()}-${newCabin.image[0].name}`.replaceAll(
    '/',
    '',
  );

  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1) create cabin
  const { data, error } = await supabase
    .from('cabins')
    .insert([{ ...newCabin, image: imagePath }])
    .select();

  if (error) {
    console.error(error);
    throw new Error('Cabin could not be created');
  }

  // 2) upload image
  const { error: storageError } = await supabase.storage
    .from('cabin-images')
    .upload(imageName, newCabin.image[0]);

  // 3) delete cabin if error during uploading
  if (storageError) {
    await supabase.from('cabins').delete().eq('id', data[0].id);
    console.error(storageError);
    throw new Error('Cabin image could not be uploaded');
  }

  return data;
};
