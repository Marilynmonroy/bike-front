export interface Order {
  id: number;
  description: string;
  status: Status;
  createdAt: string;
  updateAt: string;
  value: number;
  customerId: number;
  bicycleId: number;
  customer: Customer;
  bicycle: Bicycle;
}

export enum Status {
  COMPLETED = "completed",
  INCOMPLETE = "incomplete",
}
export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
}

export interface Bicycle {
  id: number;
  model: string;
  color: string;
  characteristics: string;
  customerEmail: string;
}

export interface User {
  id: number;
  username: string;
  password: string;
  createdAt: string;
  updateAt: string;
}
