import { DateHelper } from '../../../date-helper.js'
import { Id } from '../../../types.js'


export interface IRoomListResponse {
  errorMessage?: string
  items: IRoom[]
}



export interface IRoomResponse {
  errorMessage?: string
  item: IRoom
}



export interface IRoom {
  provider: string
  placeId: Id
  name: string
  description: string
  image: string
  remoteness: number
  bookedDates?: []
  price?: number
}