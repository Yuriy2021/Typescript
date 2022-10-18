import { Provider } from '../../domain/provider.js'
import { SearchFilter } from '../../domain/search-filter.js'
import { HttpHelper } from '../../utils/http-helper.js'
import { CRoom } from '../../domain/room.js'
import { IRoomListResponse } from './responce.js'
import { dateToUnixStamp } from '../../../search.js'


export class FlatProvider implements Provider {

  public static provider = 'flat'

  private static apiUrl = 'http://localhost:3040'

  public find(filter: SearchFilter) {
    return HttpHelper.fetchAsJson<IRoomListResponse>(

      FlatProvider.apiUrl + '/?' +
      
      this.convertFilterToQueryString(filter)
    )
      .then((response) => {
        this.assertIsValidResponse(response)

        return this.convertRoomListResponse(response)
      })
  }


  public getByParams(
    checkInDate: Date, 
    checkOutDate: Date, 
    maxPrice?: number
  ) {
    return HttpHelper.fetchAsJson<IRoomListResponse>(

      `${FlatProvider.apiUrl}/?city='Санкт-Петербург'&checkInDate=${dateToUnixStamp(checkInDate)}&checkOutDate=${dateToUnixStamp(checkOutDate)}&priceLimit=${maxPrice}`

    )
      .then((response) => {

        this.assertIsValidResponse(response)

        return this.convertRoomResponse(response.items)
      })
  }


  private assertIsValidResponse(response: IRoomListResponse): void {
    if (response.errorMessage !== null) {
      throw new Error(response.errorMessage)
    }
  }



  private convertFilterToQueryString(filter: SearchFilter): string {
    return `checkInDate=${dateToUnixStamp(filter.checkInDate)}&checkOutDate=${dateToUnixStamp(filter.checkOutDate)}&priceLimit=${filter.maxPrice}`
  }


  private convertRoomListResponse(response: IRoomListResponse) : CRoom[] {
    return response.items.map(item => {
      return this.convertRoomResponse(item)
    })
  }


  private convertRoomResponse(item) {
    return new CRoom(
      FlatProvider.provider,
      String(item.placeId),
      item.title,
      item.details,
      item.photos,
      item.coordinates,
      item.bookedDates,
      item.priceLimit
    )
  }
}