export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  createdDate: Date;
  categoryId: number;
  barcode:string;
}
