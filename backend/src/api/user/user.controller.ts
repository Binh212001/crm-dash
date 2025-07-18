import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseInterceptors,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { ListUserDto } from "./dto/list-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import {
  BunnyUploadInterceptor,
  BunnyUploadRes,
} from "../bunny/bunny-file-interceptor";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UseInterceptors(new BunnyUploadInterceptor())
  async create(@Body() data: CreateUserDto, @Req() req: any) {
    const files: BunnyUploadRes[] = req.bunnyFile;
    return this.userService.create(data, files);
  }

  @Get()
  async findAll(@Query() dto: ListUserDto) {
    return this.userService.findAll(dto);
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return this.userService.findOne(id);
  }

  @Put(":id")
  async update(@Param("id") id: string, @Body() data: UpdateUserDto) {
    return this.userService.update(id, data);
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    await this.userService.remove(id);
    return { deleted: true };
  }
}
