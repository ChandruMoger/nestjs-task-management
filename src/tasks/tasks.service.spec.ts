import { Test } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { Task } from './schema/task.schema';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TaskStatus } from './task.model';
import { NotFoundException } from '@nestjs/common';

const mockTask = () => ({
  find: jest.fn(),
  findById: jest.fn(),
});

const mockUser = {
  username: 'Ariel',
  id: 'someId',
  password: 'somePassword',
  tasks: [],
};

describe('TasksService', () => {
  let tasksService: TasksService;
  let tasksModel;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: getModelToken('Task'), useFactory: mockTask },
      ],
    }).compile();

    tasksService = module.get<TasksService>(TasksService);
    tasksModel = module.get<Model<Task>>(getModelToken('Task'));
  });

  describe('getTasks', () => {
    it('calls TasksRepository.getTasks and returns the result', async () => {
      tasksModel.find.mockResolvedValue('someValue');
      const result = await tasksService.getAllTasks(mockUser);
      expect(result).toEqual('someValue');
    });
  });

  describe('getTaskById', () => {
    it('calls TasksRepository.findOne and returns the result', async () => {
      const mockTask = {
        title: 'Test title',
        description: 'Test desc',
        id: 'someId',
        status: TaskStatus.OPEN,
      };

      tasksModel.findById.mockResolvedValue(mockTask);
      const result = await tasksService.getTaskById('someId');
      expect(result).toEqual(mockTask);
    });

    it('calls TasksRepository.findOne and handles an error', async () => {
      tasksModel.findById.mockResolvedValue(null);
      expect(tasksService.getTaskById('someId')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
