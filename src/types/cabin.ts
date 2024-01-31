export interface ICabin {
  description: string;
  discount: number;
  id?: number;
  image?: string | File | FileList;
  maxCapacity: number;
  name: string;
  regularPrice: number;
}
