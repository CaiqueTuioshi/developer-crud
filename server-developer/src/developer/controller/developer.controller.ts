import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  HttpCode,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import {
  DeveloperDTO,
  PagedDeveloperDTO,
  DeleteResultDTO,
} from '../dto/developer.dto';
import { DeveloperService } from '../service/developer.service';
import { DeveloperPageRequest } from '../interface/developer.interface';

@Controller('developers')
export class DeveloperController {
  constructor(private readonly developerService: DeveloperService) {}

  @Get()
  async findAll(): Promise<DeveloperDTO[]> {
    return this.developerService.findAll();
  }

  @Get('paged')
  async findAllPaged(
    @Query() query: DeveloperPageRequest,
  ): Promise<PagedDeveloperDTO> {
    return this.developerService.findAllPaged(query);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<DeveloperDTO> {
    return this.developerService.findById(id);
  }

  @HttpCode(201)
  @Post()
  async createDeveloper(
    @Body() developer: DeveloperDTO,
  ): Promise<DeveloperDTO> {
    return this.developerService.create(developer);
  }

  @Put(':id')
  async updateDeveloper(
    @Param('id') id: string,
    @Body() developer,
  ): Promise<DeveloperDTO> {
    return this.developerService.update(id, developer);
  }

  @HttpCode(204)
  @Delete(':id')
  async removeDeveloper(@Param('id') id: string): Promise<DeleteResultDTO> {
    return this.developerService.remove(id);
  }
}
