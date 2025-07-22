import { Injectable } from "@nestjs/common";
import { CustomerRepository } from "./customer.repository";
import { CreateCustomerDto } from "./dto/create-customer.dto";
import { UpdateCustomerDto } from "./dto/update-customer.dto";
import { CustomerResponseDto } from "./dto/customer-response.dto";
import { plainToInstance } from "class-transformer";
import { CustomerEntity } from "./entities/customer.entity";
import { paginate } from "@/utils/offset-pagination";
import { OffsetPaginatedDto } from "@/common/dto/offset-pagination/paginated.dto";
import { ListCustomerDto } from "./dto/list-customer.dto";
import { TopCustomerDto } from "./dto/top-customer.dto";

@Injectable()
export class CustomerService {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async create(data: CreateCustomerDto): Promise<CustomerResponseDto> {
    const customer = this.customerRepository.create(data);
    const savedCustomer = await this.customerRepository.save(customer);
    return plainToInstance(CustomerResponseDto, savedCustomer, {
      excludeExtraneousValues: true,
    });
  }

  async findAll(
    reqDto: ListCustomerDto
  ): Promise<OffsetPaginatedDto<CustomerResponseDto>> {
    const { q } = reqDto;
    const query = this.customerRepository
      .createQueryBuilder("customer")
      .orderBy("customer.id", "DESC");
    if (q) {
      query.andWhere("customer.name ILIKE :q", { q: `%${q}%` });
    }
    const [base, metaDto] = await paginate<CustomerEntity>(query, reqDto, {
      skipCount: false,
      takeAll: false,
    });
    return new OffsetPaginatedDto(
      plainToInstance(CustomerResponseDto, base),
      metaDto
    );
  }

  async findOne(id: string): Promise<CustomerResponseDto | null> {
    const customer = await this.customerRepository.findOne({ where: { id } });
    if (!customer) return null;
    return plainToInstance(CustomerResponseDto, customer, {
      excludeExtraneousValues: true,
    });
  }

  async update(
    id: string,
    data: UpdateCustomerDto
  ): Promise<CustomerResponseDto | null> {
    await this.customerRepository.update(id, data);
    const updatedCustomer = await this.customerRepository.findOne({
      where: { id },
    });
    if (!updatedCustomer) return null;
    return plainToInstance(CustomerResponseDto, updatedCustomer, {
      excludeExtraneousValues: true,
    });
  }

  async remove(id: string): Promise<void> {
    await this.customerRepository.delete(id);
  }

  async getTopCustomer(): Promise<TopCustomerDto[]> {
    // Lấy top 5 khách hàng có tổng số đơn hàng cao nhất (dựa vào trường totalOrder trong customer entity)
    const customers = await this.customerRepository
      .createQueryBuilder("customer")
      .orderBy("customer.totalOrder", "DESC")
      .limit(5)
      .getMany();

    // Trả về theo định dạng TopCustomerDto
    const customerRes: TopCustomerDto[] = customers.map((c) => ({
      customer: c.name,
      orderCount: c.totalOrder,
      revenue: Number(c.totalSpent) || 0,
    }));

    return customerRes;
  }
}
