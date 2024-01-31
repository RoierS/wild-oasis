export interface ICabin {
  created_at?: string;
  description: string | null;
  discount: number | null;
  id?: number;
  image?: string | File | FileList | null;
  maxCapacity: number | null;
  name: string | null;
  regularPrice: number | null;
}
