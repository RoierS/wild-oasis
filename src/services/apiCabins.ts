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

  if (error) {
    if (error.code === '23503') {
      console.error(error);
      throw new Error('Cabin could not be deleted because it is in use');
    } else {
      console.error(error);
      throw new Error('Cabin could not be deleted');
    }
  }

  //also delete cabin image from database
  if (typeof cabin.image === 'string') {
    const { data: imageUsage, error: usageError } = await supabase
      .from('cabins')
      .select('id')
      .eq('image', cabin.image)
      .neq('id', cabin.id);

    if (usageError) {
      console.error(usageError);
      throw new Error('Error checking image usage');
    }

    if (!imageUsage?.length) {
      const imageName = cabin.image.split('/').pop();
      if (imageName) {
        await supabase.storage.from('cabin-images').remove([imageName]);
      }
    }
  }

  return data;
};

// upload image file to supabase
const uploadImage = async (image: File) => {
  if (typeof image === 'string') {
    return { path: image };
  }

  const imageName = `${Math.random()}-${image.name}`.replaceAll('/', '');

  const path = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  const { error: storageError } = await supabase.storage
    .from('cabin-images')
    .upload(imageName, image);

  return { path, error: storageError };
};

// create new cabin
export const createCabin = async (newCabin: ICabin) => {
  // 1) upload image
  const { path, error: storageError } = await uploadImage(
    newCabin.image as File,
  );

  // 2) create cabin
  const { data, error } = await supabase
    .from('cabins')
    .insert([{ ...newCabin, image: path }])
    .select() // returns newly created cabin
    .single();

  if (error) {
    console.error(error);
    throw new Error('Error during creating the Cabin');
  }

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
  // 1) if image selected upload image to supabase
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
