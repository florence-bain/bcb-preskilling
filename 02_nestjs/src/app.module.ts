/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PriceController } from './price/price.controller';
import { PriceService } from './price/price.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  //module is a class annotated with the module decorator which provides metadata tha Nest uses to organise the application structure
  imports: [HttpModule, ConfigModule.forRoot()], //list of imported modules that export the providers which are requires in this module.
  controllers: [PriceController], //controllers always belong to a module (consumer)
  providers: [PriceService], // regsiter the service with Nest so it can perform the injection
})
export class AppModule {}
