import { Controller, Get, Post, Body } from '@nestjs/common';
import { FarmersService } from './farmers.service';

@Controller('farmers')
export class FarmersController {
  constructor(private readonly farmersService: FarmersService) {}

  @Get()
  findAll() {
    return this.farmersService.findAll();
  }

  @Post()
  create(@Body() body: any) {
    return this.farmersService.create(body);
  }
}
