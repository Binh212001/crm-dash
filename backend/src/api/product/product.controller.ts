import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
  Query,
  UseInterceptors,
  Req,
} from "@nestjs/common";
import { ProductService } from "./service/product.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { ListBaseReqDto } from "../base/dto/list-base.req.dto";
import {
  BunnyUploadInterceptor,
  BunnyUploadRes,
} from "../bunny/bunny-file-interceptor";
import { ProductResponseDto } from "./dto/product-response";

@Controller("products")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseInterceptors(new BunnyUploadInterceptor())
  create(@Body() dto: CreateProductDto, @Req() req: any) {
    const files: BunnyUploadRes[] = req.bunnyFile;
    return this.productService.create(dto, files);
  }

  @Get()
  findAll(@Query() dto: ListBaseReqDto) {
    return this.productService.findAll(dto);
  }

  @Get("/top")
  getTopProduct(): Promise<ProductResponseDto[]> {
    return this.productService.getTopProduct();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.productService.findOne(id);
  }

  @Put(":id")
  @UseInterceptors(new BunnyUploadInterceptor())
  update(
    @Param("id") id: string,
    @Body() dto: UpdateProductDto,
    @Req() req: any
  ) {
    const files: BunnyUploadRes[] = req.bunnyFile;
    return this.productService.update(id, dto, files);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.productService.remove(id);
  }
}
