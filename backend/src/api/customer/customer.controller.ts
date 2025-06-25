import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { ListCustomerDto } from './dto/list-customer.dto';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  async create(@Body() data: CreateCustomerDto) {
    return this.customerService.create(data);
  }

  @Get()
  async findAll(@Query() dto: ListCustomerDto) {
    return this.customerService.findAll(dto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.customerService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: UpdateCustomerDto) {
    return this.customerService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.customerService.remove(id);
    return { deleted: true };
  }
} 