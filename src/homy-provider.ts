import { Provider } from './provider.js'
import { SearchFilter } from './search-filter.js'
import { HttpHelper } from './http-helper.js'
import { CRoom } from './room.js'
import { IRoom, IRoomListResponse } from './response.js'
import { dateToUnixStamp } from './search.js'


export class HomyProvider implements Provider {

  public static provider = 'homy'

  private static apiUrl = 'http://localhost:3030'

  public find(filter: SearchFilter) {
    return HttpHelper.fetchAsJson<IRoomListResponse>(

      HomyProvider.apiUrl + '/places?' +
      
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

      `${HomyProvider.apiUrl}/places?checkInDate=${dateToUnixStamp(checkInDate)}&checkOutDate=${dateToUnixStamp(checkOutDate)}&coordinates=59.9386,30.3141&price=${maxPrice}`

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
    return `checkInDate=${dateToUnixStamp(filter.checkInDate)}&checkOutDate=${dateToUnixStamp(filter.checkOutDate)}&maxPrice=${filter.maxPrice}`
  }


  private convertRoomListResponse(response: IRoomListResponse) : CRoom[] {
    return response.items.map(item => {
      return this.convertRoomResponse(item)
    })
  }


  private convertRoomResponse(item ) {
    return new CRoom(
      HomyProvider.provider,
      String(item.placeId),
      item.name,
      item.description,
      item.image,
      item.remoteness,
      item.provider,
      item.bookedDates,
      item.price
    )
  }
}