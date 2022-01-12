/* eslint-disable prettier/prettier */
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { privateDecrypt } from 'crypto';
import { lastValueFrom, map } from 'rxjs';

@Injectable() //decorator that attaches metadate and declares that PriceService is a class. Inversion of control(IoC) delegate instantiation of dependancies to the container
export class PriceService {
  static API_ROOT = 'https://min-api.cryptocompare.com/data/pricemulti';

  constructor(
    private configService: ConfigService,
    private http: HttpService,
  ) {}

  async getPrice(
    from: string,
    to: string,
  ): Promise<{ priceValues: { [key: string]: number } }> {
    const priceValues = await this.request<{ [key: string]: number }>(
      PriceService.API_ROOT,
      {
        params: {
          apiKey: this.configService.get<string>('CRYPTOCOMPARE_API_KEY'),
          fsyms: from,
          tsyms: to,
        },
      },
    );
    // console.log('price-service', priceValues);
    return { priceValues };
  }

  private async request<T>(
    url: string,
    params: { [key: string]: any },
  ): Promise<T> {
    const request = this.http
      .get(url, params)
      .pipe(map((response) => response.data));

    return lastValueFrom(request);
  }
}
