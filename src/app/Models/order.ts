import { Customer } from "./customer";

export interface Order{

       id?:number
      orderDate: Date
      customerId: number,
      totalAmount: number,
       customer?: Customer; // opsiyonel, null da olabilir

}