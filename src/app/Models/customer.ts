import { Order } from "./order";

export interface Customer{

      id: number,
      name: string,
      email:string,
      phone: string,
      passwordHash: "",
      passwordSalt: "",
       orders: Order[];
    




}