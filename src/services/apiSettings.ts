import { ISettings } from '@/types/settings';

import supabase from './supabase';

// fetch settings data
export const getSettings = async () => {
  const { data, error } = await supabase.from('settings').select('*').single();

  if (error) {
    console.error(error);
    throw new Error('Settings could not be loaded');
  }

  return data;
};

// update settings
export const updateSettings = async (newSettings: ISettings) => {
  const { data, error } = await supabase
    .from('settings')
    .update(newSettings)
    .eq('id', 1)
    .single();

  if (error) {
    console.error(error);
    throw new Error('Settings could not be updated');
  }

  return data;
};
