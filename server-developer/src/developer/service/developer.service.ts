import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Developer } from '../schema/developer.schema';
import { Model } from 'mongoose';
import {
  DeveloperDTO,
  PagedDeveloperDTO,
  DeleteResultDTO,
} from '../dto/developer.dto';
import { DeveloperPageRequest } from '../interface/developer.interface';

@Injectable()
export class DeveloperService {
  constructor(
    @InjectModel(Developer.name) private developerModel: Model<Developer>,
  ) {}

  async findAll(): Promise<DeveloperDTO[]> {
    return this.developerModel.find().exec();
  }

  async findAllPaged(query: DeveloperPageRequest): Promise<PagedDeveloperDTO> {
    const { page, pageSize, ...search } = query;
    const offSet = +pageSize * +page;

    console.log({search})

    const totalElements = await this.developerModel
      .countDocuments({ ...search })
      .exec();

    if (totalElements === 0) {
      throw new HttpException(
        'Nenhum desenvolvedor encontrado.',
        HttpStatus.NOT_FOUND,
      );
    }

    const developers = await this.developerModel
      .find({ ...search })
      .skip(+offSet)
      .limit(+pageSize)
      .exec();

    if (totalElements > 0) {
      return {
        content: developers,
        totalElements: totalElements,
        totalPages: totalElements / +pageSize,
      };
    }
  }

  async findById(id: string): Promise<DeveloperDTO> {
    const developer = this.developerModel.findById(id).exec();
    if (developer) {
      return developer;
    }

    throw new HttpException(
      'Nenhum desenvolvedor encontrado.',
      HttpStatus.NOT_FOUND,
    );
  }

  async create(body: DeveloperDTO): Promise<DeveloperDTO> {
    try {
      return this.developerModel.create(body);
    } catch (error) {
      throw new HttpException(
        'Nenhum desenvolvedor encontrado.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(_id: string, developer: DeveloperDTO): Promise<DeveloperDTO> {
    try {
      return this.developerModel.updateOne({ _id }, developer);
    } catch (error) {
      throw new HttpException(
        'Nenhum desenvolvedor encontrado.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async remove(_id: string): Promise<DeleteResultDTO> {
    try {
      return this.developerModel.deleteOne({ _id });
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
