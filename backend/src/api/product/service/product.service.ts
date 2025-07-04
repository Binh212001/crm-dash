import { ListBaseReqDto } from "@/api/base/dto/list-base.req.dto";
import { TagRepository } from "@/api/tag/tag.repository";
import { OffsetPaginatedDto } from "@/common/dto/offset-pagination/paginated.dto";
import { paginate } from "@/utils/offset-pagination";
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { In } from "typeorm";
import { CreateProductDto } from "../dto/create-product.dto";
import { ProductResponseDto } from "../dto/product-response";
import { UpdateProductDto } from "../dto/update-product.dto";
import { ProductRepository } from "../repository/product.repository";

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly tagRepository: TagRepository
  ) {}

  async create(dto: CreateProductDto) {
    const { tags = [], ...rest } = dto;
    const tagList =
      tags.length > 0
        ? await this.tagRepository.find({
            where: {
              id: In(tags),
            },
          })
        : [];
    const product = this.productRepository.create({
      ...rest,
      tags: tagList,
    });
    const prSave = await this.productRepository.save(product);

    const res = await this.productRepository.findOne({
      where: { id: product.id },
    });

    return plainToInstance(ProductResponseDto, res);
  }

  async findAll(dto: ListBaseReqDto) {
    const query = this.productRepository
      .createQueryBuilder("product")
      .leftJoinAndSelect("product.tags", "tags")
      .leftJoinAndSelect("product.category", "category")
      .orderBy("product.id", "DESC");

    const [base, metaDto] = await paginate(query, dto, {
      skipCount: false,
      takeAll: false,
    });

    return new OffsetPaginatedDto(
      plainToInstance(ProductResponseDto, base, {
        excludeExtraneousValues: true,
      }),
      metaDto
    );
  }

  async findOne(id: string) {
    const product = await this.productRepository.findOne({
      where: { id },
    });
    if (!product) {
      throw new NotFoundException("Product not found");
    }
    return plainToInstance(ProductResponseDto, product);
  }

  async update(id: string, dto: UpdateProductDto) {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException("Product not found");
    }
    Object.assign(product, dto);
    await this.productRepository.save(product);
    // Optionally update variants here if needed
    const updated = await this.productRepository.findOne({
      where: { id },
      relations: ["tags", "category"],
    });
    return plainToInstance(ProductResponseDto, updated);
  }

  async remove(id: string) {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException("Product not found");
    }
    await this.productRepository.remove(product);
    return { message: "Product removed", id };
  }
}
