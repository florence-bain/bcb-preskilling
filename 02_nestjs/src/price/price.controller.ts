/* eslint-disable prettier/prettier */
import { Controller, Get, Query } from '@nestjs/common';
import { PriceService } from './price.service';

@Controller('price') //price is the path prefix (group a set of related routes)
export class PriceController {
  constructor(private readonly priceService: PriceService) {} //PriceService is injected through the class constructor. Allows us to both declare and initialize the priceService

  @Get() //endpoint- as no path is defined in the decorator the route will be GET/price - if we had GET('BTC') would be GET/price/BTC
  async get(
    @Query('from') from: string,
    @Query('to') to: string,
  ): Promise<{ priceValues: { [key: string]: number } }> {
    //look into Observable and our requirments
    // eslint-disable-next-line prefer-const
    const priceValues = await this.priceService.getPrice(from, to);
    return priceValues;
  }
}
