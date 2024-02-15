import { ILoginForm } from '@/types/loginForm';

import supabase from './supabase';

export const loginUser = async ({ email, password }: ILoginForm) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return data;
};
