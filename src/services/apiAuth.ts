import { ILoginForm } from '@/types/loginForm';
import { ISignupForm } from '@/types/signupForm';

import supabase, { supabaseUrl } from './supabase';

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

export const getCurrentUser = async () => {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return data?.user;
};

export const logoutUser = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

export const signupUser = async ({
  fullName,
  email,
  password,
}: ISignupForm) => {
  // get and save current session
  const { data: savedSessionData } = await supabase.auth.getSession();

  // create new user
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: '',
      },
    },
  });

  // sign out new user and restore previous session
  await supabase.auth.signOut();

  if (savedSessionData && savedSessionData.session) {
    localStorage.setItem(
      'currentSessionData',
      JSON.stringify(savedSessionData),
    );

    await supabase.auth.setSession({
      access_token: savedSessionData.session.access_token,
      refresh_token: savedSessionData.session.refresh_token,
    });

    localStorage.removeItem('currentSessionData');
  }

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return data;
};

// check if email exists in database
export const checkEmailExistence = async (email: string) => {
  const { data, error } = await supabase
    .from('users')
    .select('email')
    .eq('email', email);

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return data.length > 0;
};

export const updateCurrentUser = async ({
  password,
  fullName,
  avatar,
}: {
  password?: string;
  fullName?: string;
  avatar?: File | null;
}) => {
  let updateData = {};

  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };

  // Update password or fullName
  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  if (!avatar) return data;

  // Delete old avatar
  if (data.user.user_metadata.avatar && avatar) {
    const imageName = data.user.user_metadata.avatar.split('/').pop();
    if (imageName) {
      const { error: deleteError } = await supabase.storage
        .from('avatars')
        .remove([imageName]);

      if (deleteError) {
        console.error(deleteError);
        throw new Error(deleteError.message);
      }
    }
  }

  // Upload avatar
  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  const { error: storageError } = await supabase.storage
    .from('avatars')
    .upload(fileName, avatar);

  if (storageError) {
    console.error(storageError);
    throw new Error(storageError.message);
  }

  // Update avatar
  const { data: updatedUser, error: updateError } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
      },
    });

  if (updateError) {
    console.error(updateError);
    throw new Error(updateError.message);
  }

  return updatedUser;
};
