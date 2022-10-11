export interface IUser {
    userName: string,
    avatarUrl: string
}

export interface ISearchFormData {
    city: string,
    checkInDate: Date,
    checkOutDate: Date,
    maxPrice: string| number | null
}

export interface IPlace {
    id: number;
  image: string;
  name: string;
  description: string;
  remoteness: number;
  bookedDates: number[];
  price: number;
}