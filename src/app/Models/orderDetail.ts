import { Order } from './order';
import { Product } from './product';

export interface OrderDetail {
  id: number;
  orderId: number;
  order?: Order; // opsiyonel, bazen sadece ID olabilir
  productId: number;
  product?: Product; // opsiyonel
  quantity: number;
  unitPrice: number;
  totalPrice: number; // serverdan geliyorsa, yoksa clientta hesaplayabiliriz
}
