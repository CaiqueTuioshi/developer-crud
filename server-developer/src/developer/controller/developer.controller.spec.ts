import { DeveloperController } from './developer.controller';
import { DeveloperService } from '../service/developer.service';
import { Developer } from '../schema/developer.schema';
import { Model } from 'mongoose';
import {
  DeveloperDTO,
  PagedDeveloperDTO,
  DeleteResultDTO,
} from '../dto/developer.dto';
import { DeveloperPageRequest } from '../interface/developer.interface';

describe('Developer Controller', () => {
  let developerController: DeveloperController;
  let developerService: DeveloperService;
  let model: Model<Developer>;

  beforeEach(async () => {
    developerService = new DeveloperService(model);
    developerController = new DeveloperController(developerService);
  });

  it('should be defined', () => {
    expect(developerController).toBeDefined();
    expect(developerService).toBeDefined();
  });

  it('shoud return an array of developer findAll()', async () => {
    const data: DeveloperDTO[] = [
      {
        _id: '123',
        name: 'Lucas Garicoix',
        gender: 'masculino',
        age: 28,
        hobby: 'futebol',
        birthdate: new Date('1991-08-28'),
      },
    ];

    jest
      .spyOn(developerService, 'findAll')
      .mockImplementation(() => Promise.resolve(data));

    expect(await developerController.findAll()).toBe(data);
    expect(developerService.findAll).toHaveBeenCalledTimes(1);
  });

  it('shoud return an array of developer findAllPaged()', async () => {
    const data: PagedDeveloperDTO = {
      content: [
        {
          _id: '123',
          name: 'Lucas Garicoix',
          gender: 'masculino',
          age: 28,
          hobby: 'futebol',
          birthdate: new Date('1991-08-28'),
        },
      ],
      totalElements: 1,
    };

    const query: DeveloperPageRequest = {
      _id: '321',
      name: 'Lucas Garicoix',
      gender: '',
      age: 28,
      hobby: '',
      bithdate: '',
      page: 0,
      pageSize: 10,
    };

    jest
      .spyOn(developerService, 'findAllPaged')
      .mockImplementation(() => Promise.resolve(data));

    expect(await developerController.findAllPaged(query)).toBe(data);
    expect(developerService.findAllPaged).toHaveBeenCalledTimes(1);
  });

  it('shoud return an object of developer findById()', async () => {
    const data: DeveloperDTO = {
      _id: '123',
      name: 'Lucas Garicoix',
      gender: 'masculino',
      age: 28,
      hobby: 'futebol',
      birthdate: new Date('1991-08-28'),
    };

    jest
      .spyOn(developerService, 'findById')
      .mockImplementation(() => Promise.resolve(data));

    expect(await developerController.findById(data._id)).toBe(data);
    expect(developerService.findById).toHaveBeenCalledTimes(1);
  });

  it('shoud create a developer createDeveloper()', async () => {
    const data: DeveloperDTO = {
      _id: '123',
      name: 'Lucas Seiti',
      gender: 'masculino',
      age: 29,
      hobby: 'games',
      birthdate: new Date('1991-08-28'),
    };

    jest
      .spyOn(developerService, 'create')
      .mockImplementation(() => Promise.resolve(data));

    expect(await developerController.createDeveloper(data)).toBe(data);
    expect(developerService.create).toHaveBeenCalledTimes(1);
  });

  it('shoud update a developer updateDeveloper()', async () => {
    const data: DeveloperDTO = {
      _id: '123',
      name: 'Lucas Seiti',
      gender: 'masculino',
      age: 35,
      hobby: 'futebol',
      birthdate: new Date('1991-08-28'),
    };

    jest
      .spyOn(developerService, 'update')
      .mockImplementation(() => Promise.resolve(data));

    expect(await developerController.updateDeveloper(data)).toBe(data);
    expect(developerService.update).toHaveBeenCalledTimes(1);
  });

  it('shoud remove a developer removeDeveloper()', async () => {
    const deleteResult: DeleteResultDTO = {
      ok: 1,
    };

    jest
      .spyOn(developerService, 'remove')
      .mockImplementation(() => Promise.resolve(deleteResult));

    expect(await developerController.removeDeveloper('321')).toBe(deleteResult);
    expect(developerService.remove).toHaveBeenCalledTimes(1);
  });
});
