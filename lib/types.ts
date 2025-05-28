// types.ts
// Định nghĩa các interface cho dữ liệu xe, hãng xe, loại thân xe, FAQ

export interface Car {
  id: number;
  make: string;
  model: string;
  year: number;
  price: number;
  images: string[];
  transmission: string;
  fuelType: string;
  bodyType: string;
  mileage: number;
  color: string;
  wishlisted: boolean;
}

export interface Brand {
  id: number;
  name: string;
  imageUrl: string;
}

export interface BodyType {
  id: number;
  name: string;
  imageUrl: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}
