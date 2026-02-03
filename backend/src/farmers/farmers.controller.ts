import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
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

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.farmersService.update(+id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.farmersService.remove(+id);
  }
}
