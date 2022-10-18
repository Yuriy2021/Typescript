import { Id } from '../../types.js'

export class CRoom {


  constructor(
    private readonly provider: string,
    public readonly originalId: string,
    public placeId: Id,
    public name: string,
    public description: string,
    public image: string,
    public remoteness?: number,
    
    
    public bookedDates?: [],
    public price?: number,
    
  ) {}



  get id (): Id {
    return this.provider + '-' + this.originalId
  }


  public isProvidedBy(providerName: string): boolean {
    return this.provider === providerName
  }
}




export class FRoom {


  constructor(
    private readonly provider: string,
    public readonly originalId: string,
    public placeId: Id,
    public name: string,
    public description: string,
    public image: string,
    public remoteness: number,
    
    
    public bookedDates?: [],
    public price?: number,
    
  ) {}



  get id (): Id {
    return this.provider + '-' + this.originalId
  }


  public isProvidedBy(providerName: string): boolean {
    return this.provider === providerName
  }
}