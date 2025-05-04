export interface Document {
  id: string;
  title: string;
  categories: string[];
  file: File | string;
  createdAt: string;
}
