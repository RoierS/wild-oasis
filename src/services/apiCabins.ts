import { ICabin } from '@/types/cabin';

import supabase, { supabaseUrl } from './supabase';

// fetch all cabins from DB
export const getCabins = async () => {
  const { data, error } = await supabase
    .from('cabins')
    .select('*')
    .order('created_at', { ascending: true });

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be loaded');
  }

  return data;
};

// delete cabin by Id
export const deleteCabin = async (cabin: ICabin) => {
  if (!cabin.id) return;
  const { data, error } = await supabase
    .from('cabins')
    .delete()
    .eq('id', cabin.id);

  //also delete cabin image from database
  if (typeof cabin.image === 'string') {
    const imageName = cabin.image.split('/').pop();
    if (imageName) {
      await supabase.storage.from('cabin-images').remove([imageName]);
    }
  }

  if (error) {
    console.error(error);
    throw new Error('Cabin could not be deleted');
  }

  return data;
};

// upload image file to supabase
const uploadImage = async (image: File) => {
  const imageName = `${Math.random()}-${image.name}`.replaceAll('/', '');

  const { error: storageError } = await supabase.storage
    .from('cabin-images')
    .upload(imageName, image);

  const path = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  return { path, error: storageError };
};

// create new cabin
export const createCabin = async (newCabin: ICabin) => {
  //creating name for new cabin image
  const imageName =
    `${Math.random()}-${(newCabin.image as File).name}`.replaceAll('/', '');

  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1) create cabin
  const { data, error } = await supabase
    .from('cabins')
    .insert([{ ...newCabin, image: imagePath }])
    .select() // returns newly created cabin
    .single();

  if (error) {
    console.error(error);
    throw new Error('Error during creating the Cabin');
  }

  // 2) upload image
  const { error: storageError } = await supabase.storage
    .from('cabin-images')
    .upload(imageName, newCabin.image as File);

  //3) delete cabin if error during uploading
  if (storageError) {
    await supabase.from('cabins').delete().eq('id', data.id);
    console.error(storageError);
    throw new Error('Cabin image could not be uploaded');
  }

  return data;
};

// updating the existing cabin
export const updateCabin = async (editingCabin: ICabin) => {
  if (editingCabin.image instanceof File) {
    const { path, error: storageError } = await uploadImage(editingCabin.image);
    if (storageError) {
      console.error(storageError);
      throw new Error('Error during updating the Cabin');
    }

    editingCabin = { ...editingCabin, image: path };
  }

  const { data, error } = await supabase
    .from('cabins')
    .update({ ...editingCabin, image: editingCabin.image as string })
    .eq('id', editingCabin.id!)
    .select();

  if (error) {
    console.error(error);
    throw new Error('Error during updating the Cabin');
  }

  return data;
};
