export interface IUserData {
  email: string;
  user_metadata: {
    fullName?: string;
    avatar?: string | null;
  };
}
