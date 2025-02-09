export interface Category {
    categoryId: number;
    name: string;
  }
  
export interface Business {
  businessId: number;  
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phoneNumber: string;
  website: string;
  rating: number;
  categoryId?: number;
  category: Category;   
  createdAt?: string;
  updatedAt?: string;
}
  