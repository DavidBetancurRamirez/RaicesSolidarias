import { UserRoles } from './roles';

//? Response
export interface ResponseData<T extends object | unknown> {
  data: T;
  error: boolean;
  message?: string;
  statusCode: number;
  timestamp: string;
}

export interface DeleteResponse {
  deleted: boolean;
}

//? User
export interface User {
  _id: string;
  avatar?: string;
  email: string;
  roles: UserRoles[];
  userName: string;
}

//? Statistic
export interface StatisticDto {
  name: string;
  value: number;
}

//? Media
export type TypeOfMedia = 'image' | 'video' | 'other';

export interface Media {
  type?: TypeOfMedia;
  url: string;
}

export interface FilesController {
  existingFiles: Media[];
  newFiles: File[];
}

export const initialStateFilesController: FilesController = {
  existingFiles: [],
  newFiles: [],
};

//? Thank You
export interface ThankYouDto {
  message: string;
  media?: Media;
}

//? Delivery
export interface Delivery {
  _id?: string;
  description: string;
  mainMedia?: Media;
  statistics?: StatisticDto[];
  thankYou: ThankYouDto;
  year: string | number;
}

export const initialStateDelivery: Delivery = {
  description: '',
  mainMedia: { type: 'image', url: '' },
  statistics: [],
  thankYou: {
    media: {
      url: '',
    },
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

//? Testimonial
export interface Testimonial {
  _id?: string;
  createdBy?: User;
  message: string;
  place?: string;
}

export const initialStateTestimonial: Testimonial = {
  message: '',
};

//? Place
export interface Place {
  _id?: string;
  deliveryDate: string;
  deliveryId: string;
  description: string;
  featured?: boolean;
  galleryMedia: Media[];
  mainMedia: Media;
  name: string;
  secondaryMedia: Media;
  statistics: StatisticDto[];
  testimonials: Testimonial[];
}

export const initialStatePlace: Place = {
  deliveryDate: '',
  deliveryId: '',
  description: '',
  featured: false,
  galleryMedia: [],
  mainMedia: { type: 'image', url: '' },
  name: '',
  secondaryMedia: { url: '' },
  statistics: [],
  testimonials: [],
};

export interface PlaceWithYear extends Place {
  deliveryYear: string;
}

export const initialStatePlaceWithYear: PlaceWithYear = {
  ...initialStatePlace,
  deliveryYear: '',
};
