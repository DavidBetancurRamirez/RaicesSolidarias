import { UserRoles } from './roles';

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
  imageUrl?: string;
}

export interface Delivery {
  _id?: string;
  description: string;
  mainImageUrl?: string;
  places?: Place[];
  statistics?: StatisticDto[];
  thankYou: ThankYouDto;
  year: number;
}

export const initialStateDelivery: Delivery = {
  description: '',
  mainImageUrl: '',
  places: [],
  statistics: [],
  thankYou: {
    imageUrl: '',
    message: '',
  },
  year: 0,
};

export interface Testimonial {
  testimonial: string;
}

export interface Place {
  _id?: string;
  deliveryDate: Date;
  deliveryId: Delivery | string;
  description: string;
  galleryImageUrls: string[];
  mainImageUrl: string;
  name: string;
  secondaryImageUrl: string;
  statistics: StatisticDto[];
  testimonials: Testimonial[];
}
