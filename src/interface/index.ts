export interface Order {
  id: number;
  description: string;
  status: boolean;
  createdAt: string;
  updateAt: string;
  value: string;
  customerId: number;
  bicycleId: number;
  customer: Customer;
  bicycle: Bicycle;
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
