import { UserRoles } from './roles';

export interface ResponseData<T extends object | unknown> {
  data: T;
  error: boolean;
  message?: string;
  statusCode: number;
  timestamp: string;
}

export interface User {
  _id: string;
  email: string;
  roles: UserRoles[];
  userName: string;
}

export interface StatisticDto {
  name: string;
  value: number;
}

export interface ThankYouDto {
  message: string;
  mediaUrl?: string;
}

export interface Delivery {
  _id?: string;
  description: string;
  mainImageUrl?: string;
  statistics?: StatisticDto[];
  thankYou: ThankYouDto;
  year: string | number;
}

export const initialStateDelivery: Delivery = {
  description: '',
  mainImageUrl: '',
  statistics: [],
  thankYou: {
    mediaUrl: '',
    message: '',
  },
  year: new Date().getFullYear(),
};

export interface DeliveryPlaces extends Delivery {
  places: Place[];
}

export const initialStateDeliveryPlaces: DeliveryPlaces = {
  ...initialStateDelivery,
  places: [],
};

export interface Testimonial {
  _id?: string;
  createdBy: User;
  testimonial: string;
}

export interface Place {
  _id?: string;
  deliveryDate: string;
  deliveryId: string;
  description: string;
  galleryImageUrls: string[];
  mainImageUrl: string;
  name: string;
  secondaryMediaUrl: string;
  statistics: StatisticDto[];
  testimonials: Testimonial[];
}

export const initialStatePlace: Place = {
  deliveryDate: '',
  deliveryId: '',
  description: '',
  galleryImageUrls: [],
  mainImageUrl: '',
  name: '',
  secondaryMediaUrl: '',
  statistics: [],
  testimonials: [],
};
